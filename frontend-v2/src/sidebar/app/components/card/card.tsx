import "./card.scss";
import * as React from "react";

import PagesStore from "../pages/store";
import Pages from "../pages/pages";

export interface Props {
	identifier: string;
	category: string;
	tags: string[];

	bookmarked: boolean;
	provider: string;
	icon: JSX.Element;

	body: CardBody;
}

interface States{
	deleteIcon: JSX.Element;
	likeIcon: JSX.Element;
}

interface CardBody{
	headline: string;
	image: JSX.Element;
	content: string;
}

class Card extends React.Component<Props, States> {

	private bookmarked: boolean = this.props.bookmarked;

	constructor(props: Props){
		super(props);

		this.state = {
			deleteIcon: 
				null,
			likeIcon:
				null
		};
	}

	componentDidMount(){
		this.handleBookmark(true);
	}

	private handleBookmark = (init?: boolean) => {
		if(!init)
			this.bookmarked = !this.bookmarked;
		//If got bookmarked then dont show delete icon
		if(this.bookmarked){
			this.setState({
				deleteIcon: 
					null,
				likeIcon:
					<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 51.997 51.997">
						<path d="M51.911,16.242C51.152,7.888,45.239,1.827,37.839,1.827c-4.93,0-9.444,2.653-11.984,6.905   c-2.517-4.307-6.846-6.906-11.697-6.906c-7.399,0-13.313,6.061-14.071,14.415c-0.06,0.369-0.306,2.311,0.442,5.478   c1.078,4.568,3.568,8.723,7.199,12.013l18.115,16.439l18.426-16.438c3.631-3.291,6.121-7.445,7.199-12.014   C52.216,18.553,51.97,16.611,51.911,16.242z M49.521,21.261c-0.984,4.172-3.265,7.973-6.59,10.985L25.855,47.481L9.072,32.25   c-3.331-3.018-5.611-6.818-6.596-10.99c-0.708-2.997-0.417-4.69-0.416-4.701l0.015-0.101C2.725,9.139,7.806,3.826,14.158,3.826   c4.687,0,8.813,2.88,10.771,7.515l0.921,2.183l0.921-2.183c1.927-4.564,6.271-7.514,11.069-7.514   c6.351,0,11.433,5.313,12.096,12.727C49.938,16.57,50.229,18.264,49.521,21.261z" fill="#D80027"/>
						
						<path className={"like-hover"} d="M51.911,16.242C51.152,7.888,45.239,1.827,37.839,1.827c-4.93,0-9.444,2.653-11.984,6.905  c-2.517-4.307-6.846-6.906-11.697-6.906c-7.399,0-13.313,6.061-14.071,14.415c-0.06,0.369-0.306,2.311,0.442,5.478  c1.078,4.568,3.568,8.723,7.199,12.013l18.115,16.439l18.426-16.438c3.631-3.291,6.121-7.445,7.199-12.014  C52.216,18.553,51.97,16.611,51.911,16.242z" fill="#D80027"/>
					</svg>
			});
		}else{
			this.setState({
				deleteIcon: 
					<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 512 512">
						<path d="M394.667,42.667h-57.408l-6.613-13.184C321.557,11.285,303.275,0,282.944,0h-53.909    c-20.331,0-38.592,11.285-47.701,29.483l-6.592,13.184h-57.408C87.915,42.667,64,66.603,64,96v21.333    C64,123.221,68.779,128,74.667,128h362.667c5.888,0,10.667-4.779,10.667-10.667V96C448,66.603,424.085,42.667,394.667,42.667z     M426.667,106.667H85.333V96c0-17.643,14.357-32,32-32h64c4.032,0,7.723-2.283,9.536-5.888l9.557-19.093    c5.44-10.901,16.405-17.685,28.629-17.685h53.909c12.203,0,23.168,6.784,28.629,17.685l9.536,19.093    c1.813,3.605,5.504,5.888,9.536,5.888h64c17.643,0,32,14.357,32,32V106.667z" fill="#D80027"/>
						<path d="M416,106.667H96c-5.888,0-10.667,4.779-10.667,10.667v320C85.333,478.507,118.827,512,160,512h192    c41.173,0,74.667-33.493,74.667-74.667v-320C426.667,111.445,421.888,106.667,416,106.667z M405.333,437.333    c0,29.397-23.915,53.333-53.333,53.333H160c-29.419,0-53.333-23.936-53.333-53.333V128h298.667V437.333z" fill="#D80027"/>
						<path d="M160,170.667c-5.888,0-10.667,4.779-10.667,10.667v256c0,5.888,4.779,10.667,10.667,10.667s10.667-4.779,10.667-10.667    v-256C170.667,175.445,165.888,170.667,160,170.667z" fill="#D80027"/>
						<path d="M224,170.667c-5.888,0-10.667,4.779-10.667,10.667v256c0,5.888,4.779,10.667,10.667,10.667s10.667-4.779,10.667-10.667    v-256C234.667,175.445,229.888,170.667,224,170.667z" fill="#D80027"/>
						<path d="M288,170.667c-5.888,0-10.667,4.779-10.667,10.667v256c0,5.888,4.779,10.667,10.667,10.667s10.667-4.779,10.667-10.667    v-256C298.667,175.445,293.888,170.667,288,170.667z" fill="#D80027"/>
						<path d="M352,170.667c-5.888,0-10.667,4.779-10.667,10.667v256c0,5.888,4.779,10.667,10.667,10.667    c5.888,0,10.667-4.779,10.667-10.667v-256C362.667,175.445,357.888,170.667,352,170.667z" fill="#D80027"/>
						
						<path className={"delete-hover"} d="M394.667,53.333h-64l-9.536-19.072c-7.232-14.464-22.016-23.595-38.165-23.595h-53.931    c-16.171,0-30.933,9.131-38.165,23.595l-9.536,19.072h-64C93.76,53.333,74.667,72.427,74.667,96v21.333h362.667V96    C437.333,72.427,418.24,53.333,394.667,53.333z" fill="transparent"/>
						<path className={"delete-hover"} d="M394.667,42.667h-57.408l-6.613-13.184C321.557,11.285,303.275,0,282.944,0h-53.909    c-20.331,0-38.592,11.285-47.701,29.483l-6.592,13.184h-57.408C87.915,42.667,64,66.603,64,96v21.333    C64,123.221,68.779,128,74.667,128h362.667c5.888,0,10.667-4.779,10.667-10.667V96C448,66.603,424.085,42.667,394.667,42.667z     M426.667,106.667H85.333V96c0-17.643,14.357-32,32-32h64c4.032,0,7.723-2.283,9.536-5.888l9.557-19.093    c5.44-10.901,16.405-17.685,28.629-17.685h53.909c12.203,0,23.168,6.784,28.629,17.685l9.536,19.093    c1.813,3.605,5.504,5.888,9.536,5.888h64c17.643,0,32,14.357,32,32V106.667z" fill="transparent"/>
						<path className={"delete-hover"} d="M416,149.333H96c-5.888,0-10.667,4.779-10.667,10.667v277.333C85.333,478.507,118.827,512,160,512h192    c41.173,0,74.667-33.493,74.667-74.667V160C426.667,154.112,421.888,149.333,416,149.333z M170.667,437.333    c0,5.888-4.779,10.667-10.667,10.667s-10.667-4.779-10.667-10.667v-256c0-5.888,4.779-10.667,10.667-10.667    s10.667,4.779,10.667,10.667V437.333z M234.667,437.333c0,5.888-4.779,10.667-10.667,10.667s-10.667-4.779-10.667-10.667v-256    c0-5.888,4.779-10.667,10.667-10.667s10.667,4.779,10.667,10.667V437.333z M298.667,437.333c0,5.888-4.779,10.667-10.667,10.667    s-10.667-4.779-10.667-10.667v-256c0-5.888,4.779-10.667,10.667-10.667s10.667,4.779,10.667,10.667V437.333z M362.667,437.333    c0,5.888-4.779,10.667-10.667,10.667c-5.888,0-10.667-4.779-10.667-10.667v-256c0-5.888,4.779-10.667,10.667-10.667    c5.888,0,10.667,4.779,10.667,10.667V437.333z" fill="transparent"/>
					</svg>,
				likeIcon:
					<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 51.997 51.997">
						<path d="M51.911,16.242C51.152,7.888,45.239,1.827,37.839,1.827c-4.93,0-9.444,2.653-11.984,6.905   c-2.517-4.307-6.846-6.906-11.697-6.906c-7.399,0-13.313,6.061-14.071,14.415c-0.06,0.369-0.306,2.311,0.442,5.478   c1.078,4.568,3.568,8.723,7.199,12.013l18.115,16.439l18.426-16.438c3.631-3.291,6.121-7.445,7.199-12.014   C52.216,18.553,51.97,16.611,51.911,16.242z M49.521,21.261c-0.984,4.172-3.265,7.973-6.59,10.985L25.855,47.481L9.072,32.25   c-3.331-3.018-5.611-6.818-6.596-10.99c-0.708-2.997-0.417-4.69-0.416-4.701l0.015-0.101C2.725,9.139,7.806,3.826,14.158,3.826   c4.687,0,8.813,2.88,10.771,7.515l0.921,2.183l0.921-2.183c1.927-4.564,6.271-7.514,11.069-7.514   c6.351,0,11.433,5.313,12.096,12.727C49.938,16.57,50.229,18.264,49.521,21.261z" fill="#D80027"/>
						
						<path className={"like-hover"} d="M51.911,16.242C51.152,7.888,45.239,1.827,37.839,1.827c-4.93,0-9.444,2.653-11.984,6.905  c-2.517-4.307-6.846-6.906-11.697-6.906c-7.399,0-13.313,6.061-14.071,14.415c-0.06,0.369-0.306,2.311,0.442,5.478  c1.078,4.568,3.568,8.723,7.199,12.013l18.115,16.439l18.426-16.438c3.631-3.291,6.121-7.445,7.199-12.014  C52.216,18.553,51.97,16.611,51.911,16.242z" fill="transparent"/>
					</svg>
			});
		}
			
	}

	render() {
		return (
			<div key={"card-body-head-" + this.props.body.headline} className={"card"}>

				<div className={"card-title"}>
					{this.props.provider}
				</div>

				<div className={"card-icon"}>
					{this.props.icon}
				</div>

				<div className={"card-body"}>
					<div className={"card-body-head"}>
						<div className={"card-body-head-title"} >
							{this.props.body.headline}
						</div>
						<div className={"card-body-head-like"}
							onClick={() => { 
								this.handleBookmark();
								if(!this.bookmarked)
									PagesStore.removeBookmark(this.props.tags, this.props.category, this.props.identifier);	
							}} >
							{this.state.likeIcon}
						</div>
						<div className={"card-body-head-delete"} 
							onClick={() => {
								if(!this.bookmarked)
									PagesStore.removeRecent(this.props.identifier)}
							} >
							{this.state.deleteIcon}
						</div>
					</div>
					<div className={"card-body-content"} >
						{this.props.body.content}
					</div>
				</div>
			</div>
		);
	}
}

export default Card;
