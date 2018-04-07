import "./sortBy.scss";
import * as React from "react";

import PagesStore from "../pages/store";

interface Props {
	defaultSelector: string;
	options: string[];
}

interface States{
    floatingClasses: string;
}

export enum Selectors{
	Topics = "Topics",
	Categories = "Categories",
	Groups = "Groups"
}

class SortBy extends React.Component<Props, States> {

    constructor(props: Props){
		super(props);

		this.state = {
			floatingClasses: "sortyBy-floating-con hidden"
		}
	}
	
	private renderSelectOptionsCon: () => JSX.Element = () => {
		return (
			<div className={this.state.floatingClasses} onClick={() => this.setFloatingConOpacity()} >
				<ul>
					{this.props.options.map((value: string) => {
						return (
							<li key={Math.random().toString()} onClick={(event) => PagesStore.selector = event.currentTarget.textContent} >
								<div>
									{value}
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		);
	}

	private setFloatingConOpacity = (visible?: boolean) =>{
		if(visible)
			this.setState({
				floatingClasses: "sortyBy-floating-con"
			});
		else
			this.setState({
				floatingClasses: "sortyBy-floating-con hidden"
			});
	}

	render() {
		return (
			<div className={"sortBy-con"}>
				{this.renderSelectOptionsCon()}
				<div className={"sortBy-con-generic"} >
					Sort by
				</div>

				<div className={"sortBy-con-selector"} onClick={() => this.setFloatingConOpacity(true)} >
					{PagesStore.selector}

					<div className={"sortBy-con-selector-border"} ></div>
				</div>
			</div>
		);
	}
}

export default SortBy;
