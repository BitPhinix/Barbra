Project submitted to the OpenCodes Hackathon 2018.

By Gabriel Birnbaum, Tammo Ronke, Eric Meier, Tornike Tsereteli

# Barbra

## Inspiration
Much of what we do at work and at school today is not learning itself, but rather searching for what we need to learn. Barbra will automate that process. We want to make learning more approachable so people can learn faster and each can enjoy its pleasure without the stress and barriers of not knowing where to go next.

Named after a great educator Gabriel had in high school, Barbra should have a role similar to that of a teacher: instruct, guide and inspire.

## What it does
Barbra makes suggestions of what you need to learn next based on what you're currently reading or writing; it filters keywords using sophisticated NLP techniques out of your conversations and web content and makes smart recommendations on how you could acquire deeper knowledge on extracted topics.

Concretely, Barbra is a chrome extension. It is a sidebar available throughout your browser which releases information in form of cards as you read a page or write into a chat platform like Slack. With Barbra knowledge comes to you and you do not even need to do anything.

## How we built it
Barbra is powered by a stark natural language algorithm designed in-house by Tornike, the computational linguist in the team. The algorithm was written in Python using the NLTK library. We also built the chrome extension in React.js using Typescript and Mobx. Our backend is powered by Go.

## How we generate suggestions
Generating suggestions is a difficult process due to the complexity of working with natural language. Research for recommendation systems shows that Collaborative Filtering (CF) and Content-Based Filtering (CBF) are widely used. Our specific application, however, does not consider the preferences and habits of other users to generate suggestions, because we specifically try to tailor our system to each user. Furthermore, our system doesn't suggest similar articles, which CFs and CBFs do, but instead it suggests articles, which are queried by multiple, extracted key-phrases in the content being read or written.

## Challenges we ran into
The algorithm is non-trivial due to the difficulty of extracting useful information in natural language. In addition, current research on the topic of building content-based recommendation systems makes use of Deep Learning approaches, however re-implementing such models are a rather timely task.

## What's next for Barbra
An extension to the recommendation system would be to implement a Deep Learning model, which learns from the content the user likes to read as well as the style of writing or other textual aspects (e.g. how mathematical articles are or how what kind (video/image) of embedded content is present within articles). We also plan to place it in the hands of people. For free.

## Conclusion
the things we don’t know about will always be greater than the things we do – so we need to reliably choose what we need to learn. That’s exactly why we are creating Barbra. She provides all the guidance and inspiration you need right at your fingertips.

## Built With
* react
* typescript
* mobx
* go
* python
* nltk
* gin
* rake-ntlk
