from gensim.models.doc2vec import Doc2Vec, TaggedDocument
from sklearn.metrics.pairwise import cosine_similarity
from nltk.tag.stanford import CoreNLPNERTagger
from nltk.tokenize import casual_tokenize
from nltk.tokenize import word_tokenize
from difflib import SequenceMatcher
from html.parser import HTMLParser
from stackapi import StackAPI
from collections import Counter
from urllib.parse import quote
from nltk.corpus import stopwords
from nltk.tag import pos_tag
from rake_nltk import Rake
from pathlib import Path
from lxml import html
import numpy as np
import collections
import wikipedia
import requests
import argparse
import urllib3
import gensim
import random
import json
import nltk
import time
import os
import re


class MLStripper(HTMLParser):
    def __init__(self):
        self.reset()
        self.strict = False
        self.convert_charrefs= True
        self.fed = []
    def handle_data(self, d):
        self.fed.append(d)
    def get_data(self):
        return ''.join(self.fed)


class Recommender(object):
    def __init__(self):  # TODO do nothing?
        self.indexes_not_found = 0
        self.val = None

    def read_text_file(self, file):
        """
        Reads a file line by line and concatenates each line into a single string, which is then filtered for irrelevant
        characters.
        :param file: String, file name or absolute path
        :return: String, whole text in a document
        """
        text_string = ''
        with open(file, 'r', encoding='latin-1') as f:  # 'utf-8' codec can't decode byte 0x92 in position 2: invalid start byte
            reader = f.readlines()
            for line in reader:
                text_string = text_string + line + ' '
        # TODO Remove special characters
        return text_string

    def pos_tag_phrase_pairs(self, phrase_pairs_with_score):
        """
        Tokenizes the phrase and adds a pos tag to each token. Scores are discarded.
        :param phrase_pairs_with_score: List, list of phrase tuples with respective tf-idf scores
        :return: List, list of phrase list of tuples of word and pos tag pairs
        """
        tagged_text = []
        for pair in phrase_pairs_with_score:
            phrase = pair[1]
            tokens = word_tokenize(phrase)
            tags = pos_tag(tokens)
            tagged_text.append((pair[0], tags))

        return tagged_text

    def filter_nouns(self, tagged_phrase_pairs):
        """
        Filters everything but nouns out of a list in the tag phrase pair format.
        :param tagged_phrase_pairs: List, list of tagged phrase tuples with respective tf-idf scores
        :return: List, list of tagged, noun phrase tuples with respective tf-idf scores
        """
        tagged_noun_phrase_pairs = []
        nouns_list = ['NN', 'NNS', 'NNP', 'NNPS']  # Noun types to keep
        for pair in tagged_phrase_pairs:
            word_noun_pair = pair[1]
            new_word_noun_pair = []
            for noun_word in word_noun_pair:
                if noun_word[1] in nouns_list:
                    new_word_noun_pair.append(noun_word)
            tagged_noun_phrase_pairs.append((pair[0], new_word_noun_pair))
        return tagged_noun_phrase_pairs

    def tuple_list_to_string_list(self, alist):  # TODO set up rules?
        """
        Combine the noun list in each tuple in a list to a string.
        Rules for which nouns to use? Database of noun keywords?
        :param alist: List, list of tagged, noun phrase tuples with respective tf-idf scores
        :return: List, list of string, noun tuples with respective tf-idf scores
        """
        out_alist = []
        for pair in alist:
            string_nouns = ''
            nouns = pair[1]
            new_phrase = []
            count = 0
            for noun in nouns:
                string_nouns = string_nouns + noun[0]  # noun[0] gets the noun word, disregarding the pos tag
                count += 1
                if count != len(nouns):  # Add a space between nouns for all non-last nouns
                    string_nouns = string_nouns + ' '
            out_alist.append((pair[0], string_nouns))
        return out_alist

    def list_to_string(self, lst):
        str = ''
        for word in lst:
            str += word + ' '
        return str

    def tokenize_phrases(self, phrases_list):
        ret_list = []
        for phrase in phrases_list:
            phrase_tokenized = casual_tokenize(phrase[1])
            ret_list.append([phrase[0], phrase_tokenized])
        return ret_list

    def get_sublist_index_in_list(self, sublist, l):  #TODO comment what happens in the search
        """
        Finds the starting and ending indexes of a sublist in a list.
        :param sublist: List, the sublist to be foud in list
        :param l: List, the list to look for sublist in
        :return: Tuple, a tuple of indexes representing starting and end index; or None if sublist index not found
        """
        results=[]
        sll=len(sublist)
        for ind in (i for i,e in enumerate(l) if e==sublist[0]):
            if l[ind:ind+sll]==sublist:
                results.append((ind,ind+sll-1))
        if results == []:
            self.indexes_not_found += 1
            return None
        ret = results[0]
        return ret

    def get_surrounding_n_tokens(self, text_as_tokens, indexes, n):
        """
        Returns a list of the surrouding words of a keyphrase in original text.
        Indexes should have the following format: [(x,y)]
        :param text_as_tokens: List, a lit of the tokenized text
        :param indexes: Tuple, a tuple of integers representing starting and ending indexes
        :param n: Integer, number of steps to take and words to collect in each direction from the starting and ending indexes
        :return: List, a concatenated list of tokens surrounding the original keyphrase
        """
        surr_tokens = text_as_tokens[indexes[0]-n: indexes[0]] + text_as_tokens[indexes[1]:indexes[1]+n]
        whole_context = text_as_tokens[indexes[0]-n: indexes[1]+n]
        return surr_tokens, whole_context

    def get_all_surrounding_tokens(self, all_phrases_tokenized, article_text_tokenized):
        # TODO instead of surrounding n tokens get surrounding context including phrases and get cosine similarity
        surrounding_list = []
        context_list = []
        for phrases_tokenized in all_phrases_tokenized:
            indexes = self.get_sublist_index_in_list(phrases_tokenized[1], article_text_tokenized)
            if indexes == None:
                continue
            surrounding_tokens, context_tokens = rec.get_surrounding_n_tokens(article_text_tokenized, indexes, 20)
            surrounding_list.append(phrases_tokenized + [surrounding_tokens])
            context_list.append(phrases_tokenized + [context_tokens])
        return surrounding_list, context_list

    def calc_character_similarity(self, a, b):
        """
        Measures the similarity of two strings and returns a score.
        :param a: String, comparing string a
        :param b: String, comparing string b
        :return: Float, a float in range (0.0 no similarity;:1.0 identical), representing the similarity between a and b
        """
        measure = SequenceMatcher(None, a, b).ratio()
        return measure

    def map_sim_to_suggestions(self, original_string_keyphrase, suggestions):
        """
        Creates a dictionary mapping of suggestions with their respective similarity scores to the original keyphrase.
        :param original_string_keyphrase: String,
        :param suggestions: List, a list of strings to compare to the original keyphrase
        :return: List, list of similarity scores
        """
        sims = []  # a list of all similarity scores
        mapped_to_sim_tokens = {}  # mapped dictionary; key = suggestion, value = similarity score

        for suggestion in suggestions:
            sim = self.calc_similarity(suggestion, original_string_keyphrase)
            sims.append(sim)
            mapped_to_sim_tokens[suggestion] = sim

        return sims, mapped_to_sim_tokens

    def get_similar_suggestions(self, suggestions, original_tokens):  # TODO add counter to prioritize similarity
        ret = []
        suggestions_tokens = []
        for suggestion in suggestions:
            suggestions_tokens.append(casual_tokenize(suggestion))

        for token in original_tokens:
            for suggestion in suggestions_tokens:
                if token in suggestion:
                    if not suggestion in ret:
                        ret.append(suggestion)

        # out = self.order_list_by_similarity(original_tokens, ret)
        return ret

    def get_wiki_url_and_content_by_keyphrase(self, phrase):
        wiki_page = wikipedia.page(phrase)
        return wiki_page.url, wiki_page.summary, wiki_page.categories

    def search_wiki(self, phrase, results=10):
        wiki_search = wikipedia.search(phrase, results)
        return wiki_search

    def surr_tok_list_to_string(self, lst):
        text = ''
        for item in lst[1]:
            text += item + ' '
        return text

    def get_category_from_categories(self, phrases_list):
        lst = []
        bad_words = ['articles', 'links', 'containing']
        for phrase in phrases_list:
            phrase_words = phrase.split()
            for word in phrase_words:
                if word not in bad_words and word not in stopwords.words("english"):
                    lst.append(word)
            lst.append('.')

        text = self.list_to_string(lst)
        rec = Rake()
        rec.extract_keywords_from_text(text)
        cat = rec.get_ranked_phrases()
        return cat

    def get_shortest_in_list(self, phrases_list, title_phrase):
        prev = phrases_list[0]
        for phrase in phrases_list:
            for sub_phrase in phrase.split(' '):
                # print('sub phrase: ', sub_phrase.lower(), '| title phrase: ', title_phrase.lower().split(' '))
                if sub_phrase.lower() in title_phrase.lower().split(' ') and len(str(phrase)) < len(str(prev)):
                    prev = phrase
        return prev

    def get_wiki_urls_top_n_phrases(self, string_phrases, surrounding_tokens_list, n):
        # TODO get proper categories
        keyp_url_content_mapping = []
        for i in range(n):
            phrase = string_phrases[i][1]
            surrounding_tokens = surrounding_tokens_list[i][2]
            try:
                url, content, categories = self.get_wiki_url_and_content_by_keyphrase(phrase)
                shortest = self.get_shortest_in_list(categories, phrase)
                keyp_url_content_mapping.append([string_phrases[i][1], url, content, shortest])
            except Exception:
                try:
                    url, content, categories = self.get_wiki_url_and_content_by_keyphrase(phrase[:len(phrase.split(' '))/2])
                    shortest = self.get_shortest_in_list(categories, phrase[:len(phrase.split(' '))/2])
                    keyp_url_content_mapping.append([string_phrases[i][1], url, content, shortest])
                except Exception:
                    pass
                pass

        return keyp_url_content_mapping

    def get_content_from_url(self, url):
        return requests.get(url).content

    def write_suggestions_to_json(self, mapping):
        root = []

        for item in mapping:
            root_list = {}

            root_list["article_url"] = item[1]
            root_list["content"] = quote(str(item[2]))
            root_list["title"] = quote(str(self.list_to_string(item[1].split('/')[-1].split('_'))))
            root_list["topic"] = quote(str(item[3]))

            root.append(root_list)

        return root

    def train_doc2vec_model(self, train_text, test_text):
        tagged_data = [TaggedDocument(words=word_tokenize(_d.lower()),
                                      tags=str(i)) for i, _d in enumerate(train_text)]

        max_epochs = 10
        vec_size = 20
        alpha = 0.025

        model = Doc2Vec(size=vec_size,
                        alpha=alpha,
                        min_alpha=0.025,
                        min_count=1,
                        dm =1)
        model.build_vocab(tagged_data)

        for epoch in range(max_epochs):
            print('iteration {0}'.format(epoch))
            model.train(tagged_data,
                        total_examples=model.corpus_count,
                        epochs=model.iter)
            # decrease the learning rate
            model.alpha -= 0.0002
            # fix the learning rate, no decay
            model.min_alpha = model.alpha

        test_data = word_tokenize(test_text.lower())
        v1 = model.infer_vector(test_data)
        print("V1_infer", v1)

        similar_doc = model.docvecs.most_similar('1')
        print(similar_doc)

    def strip_tags(self, html):
        s = MLStripper()
        s.feed(html)
        return s.get_data()

    def get_n_listed_medium_posts(self, phrase_list, n):
        root = []

        c = 0
        all_pages = []
        for phrase in phrase_list:
            if c > n:
                break
            root_url = 'https://medium.com/search?q='
            first = '%20'.join(phrase[1].split(' '))
            url = root_url + first
            href = 'href="'
            quotation = '"'

            page = requests.get(url)
            webpage = html.fromstring(str(page.content))
            webpages = webpage.xpath('//a/@href')

            phrase_pages = []
            # Filter out bad or repeating links
            for p in webpages:
                if '/@' in p and p.split('/')[-1][0] != '@' and p not in phrase_pages and 'responses' not in p:
                    phrase_pages.append(p)

            if phrase_pages != []:
                for p in phrase_pages:
                    all_pages.append([phrase[1], phrase_pages])

                    root_dict = {}
                    content = str(requests.get(p).content)
                    print(p)
                    content.replace('<.*>', '')
                    title_start = re.search('<title>')
                    # search_end = re.search('graf--title">', content).end()
                    # content = content[search_end:]
                    # graf_search_end = re.search('graf-after--figure">', content).end()
                    # content = content[graf_search_end:]
                    print(content)

                    words = p.split('source=search_post')[0].split('-')
                    words = words[:len(words)-1]
                    title = ''
                    for word in words:
                        title += word + ' '

                    root_dict["article_url"] = p
                    root_dict["content"] = quote(str(content))  # TODO find text in content
                    root_dict["title"] = quote(str(title))
                    root.append(root_dict)
                    # print(p)
                    # print(content)

                    c += 1
        return root

    def run(self, text, val):
        """
        TODO Improvements:
        1. casual_tokenize can't handle 'words-with-hyphens-like-this' & reduces coverage
        """

        # Remove new lines and turn to lower case
        # TODO what if only wanting to read first x lines, but that should only be for purposes of ML
        self.val = val

        text = re.sub('\n', ' ', text).lower()

        # Extract keyphrases using Rake
        # TODO also possible to extract keywords from sentence
        rake = Rake()
        if val == 'article':
            rake.extract_keywords_from_text(text)
        elif val == 'social':
            rake.extract_keywords_from_sentences(text)
        all_phrases = rake.get_ranked_phrases_with_scores()
        word_freq_dist = rake.get_word_frequency_distribution()

        # Tokenize text
        article_text_tokenized = casual_tokenize(text)

        # Tokenize phrases
        all_phrases_tokenized = self.tokenize_phrases(all_phrases)

        # Tag all phrases and remove all but noun words
        all_phrases_tagged = self.pos_tag_phrase_pairs(all_phrases)
        all_phrases_tagged_nouns = self.filter_nouns(all_phrases_tagged)

        # Convert list of tagged nouns back to a string phrase
        string_phrases_nouns = self.tuple_list_to_string_list(all_phrases_tagged_nouns)

        # Get the indexes from the non-filtered suggested phrases in the original text
        all_surrounding_tokens, all_context_tokens = self.get_all_surrounding_tokens(all_phrases_tokenized, article_text_tokenized)

        # Get wikipedia urls for top 5 phrases
        mapping_list = self.get_wiki_urls_top_n_phrases(string_phrases_nouns, all_surrounding_tokens, 5)

        # Return mapping to console
        wiki_mapping = self.write_suggestions_to_json(mapping_list)
        print(json.dumps(wiki_mapping))

        # Get page links on medium by phrase
        # medium_mapping = self.get_n_listed_medium_posts(string_phrases_nouns, 2)
        # print(medium_mapping)

        # TODO get from other webpages

if __name__ == '__main__':
    PATH = str(Path(__file__).resolve().parents[0])
    ARTICLES = '/'.join([PATH, 'articles'])

    parser = argparse.ArgumentParser("Choose which kind of text document is passed to the recommender.")
    parser.add_argument('--article_text', type=str, default=None)
    parser.add_argument('--social_text', type=str, default=None)
    args = parser.parse_args()

    rec = Recommender()
    # for file in os.listdir(ARTICLES):
    #     original_text = rec.read_text_file(ARTICLES + '/' + file)
    #     rec.run(original_text, val='article')

    if args.article_text:
        rec.run(args.article_text, val='article')
    if args.social_text:
        rec.run(args.social_text, val='social')


    # # Compare similarity of context to suggested article body
    # dictionary = gensim.corpora.Dictionary([article_text_tokenized])  # TODO this should be suggested article body
    #
    # corpus = [dictionary.doc2bow(article_text_tokenized)]
    # tf_idf = gensim.models.TfidfModel(corpus)
    # work_dir = path+'\\sim_workdir\\'
    # if not os.path.exists(work_dir):  # Create directory
    #     os.makedirs(work_dir)
    # sims = gensim.similarities.Similarity(work_dir, tf_idf[corpus],
    #                                       num_features=len(dictionary))
    #
    # print(all_context_tokens[0][1])
    # query_doc_bow = [dictionary.doc2bow(all_context_tokens[0][1])]
    # query_doc_tf_idf = tf_idf[query_doc_bow]
    # print(query_doc_tf_idf)
    # print(sims[query_doc_tf_idf])