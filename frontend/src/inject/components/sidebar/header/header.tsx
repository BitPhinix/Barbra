import "./header.css";
import * as React from "react";
import {observer} from "mobx-react";

@observer
export default class Header extends React.Component<{
    visible: boolean
}, {}> {

    render() {
        return(
            <div id={"injected-header"} className={this.props.visible ? "visible" : "hidden"}>
                <div id={"header-logo"}>
                    <div id={"svg-con"}>
                        <svg height={"24px"} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 32 37">
                            <path fill={"white"} d="M 3.76752 11.5576C 2.09619 10.5962 2.09619 8.18474 3.76752 7.2234L 12.5791 2.15499C 14.2457 1.19632 16.3256 2.39936 16.3256 4.32207L 16.3256 14.4589C 16.3256 16.3816 14.2457 17.5846 12.5791 16.626L 3.76752 11.5576Z"/>
                            <path fill={"white"} d="M 32.2325 23.3492C 33.9038 24.3105 33.9038 26.722 32.2325 27.6833L 16.3046 36.845C 14.638 37.8037 12.5581 36.6006 12.5581 34.6779L 12.5581 16.3545C 12.5581 14.4318 14.638 13.2288 16.3046 14.1875L 32.2325 23.3492Z"/>
                        </svg>
                    </div>
                    <div id={"span-con"}>
                        <span>
                        Barbra
                        </span>
                    </div>
                </div>

                <div id={"header-icon"}>
                    <svg width="30" height="32" viewBox="0 0 22 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                        <title>Bookmarks</title>
                        <g id="Canvas" transform="translate(78 -809)">
                            <g id="Group 4">
                                <g id="icon_ios_topcharts">
                                    <g id="Rectangle 205">
                                        <use xlinkHref="#path0_fill" transform="translate(-77.9445 809.106)" fill="#FFFFFF"/>
                                    </g>
                                    <g id="Rectangle 207">
                                        <use xlinkHref="#path1_fill" transform="translate(-71.625 812.837)" fill="#FFFFFF"/>
                                        <use xlinkHref="#path2_stroke" transform="translate(-71.625 812.837)" fill="#FFFFFF"/>
                                    </g>
                                    <g id="Rectangle 207">
                                        <use xlinkHref="#path1_fill" transform="translate(-71.625 817.29)" fill="#FFFFFF"/>
                                        <use xlinkHref="#path2_stroke" transform="translate(-71.625 817.29)" fill="#FFFFFF"/>
                                    </g>
                                    <g id="Rectangle 207.1">
                                        <use xlinkHref="#path1_fill" transform="translate(-71.625 821.743)" fill="#FFFFFF"/>
                                        <use xlinkHref="#path2_stroke" transform="translate(-71.625 821.743)" fill="#FFFFFF"/>
                                    </g>
                                </g>
                                <g id="icon_ios_heart_filled">
                                    <g id="For You">
                                        <use xlinkHref="#path3_fill" transform="translate(-70.2727 820.412)" fill="#FFFFFF"/>
                                    </g>
                                </g>
                                <g id="For You">
                                    <use xlinkHref="#path4_fill" transform="translate(-75.125 811.953)" fill="#FFFFFF"/>
                                </g>
                                <g id="For You">
                                    <use xlinkHref="#path5_fill" transform="translate(-75.125 816.372)" fill="#FFFFFF"/>
                                </g>
                                <g id="For You">
                                    <use xlinkHref="#path6_fill" transform="translate(-75.125 820.791)" fill="#FFFFFF"/>
                                </g>
                            </g>
                        </g>
                        <defs>
                            <path id="path0_fill" fillRule="evenodd" d="M 17.8889 0L 0 0L 0 18.0672L 17.8889 18.0672L 17.8889 0ZM 17.1112 0.7854L 0.777832 0.7854L 0.777832 17.2815L 17.1112 17.2815L 17.1112 0.7854Z"/>
                            <path id="path1_fill" fillRule="evenodd" d="M 0 0L 8.75 0L 8.75 0.814704L 0 0.814704L 0 0Z"/>
                            <path id="path2_stroke" d="M 0 0L 0 -0.125L -0.125 -0.125L -0.125 0L 0 0ZM 8.75 0L 8.875 0L 8.875 -0.125L 8.75 -0.125L 8.75 0ZM 8.75 0.814704L 8.75 0.939704L 8.875 0.939704L 8.875 0.814704L 8.75 0.814704ZM 0 0.814704L -0.125 0.814704L -0.125 0.939704L 0 0.939704L 0 0.814704ZM 0 0.125L 8.75 0.125L 8.75 -0.125L 0 -0.125L 0 0.125ZM 8.625 0L 8.625 0.814704L 8.875 0.814704L 8.875 0L 8.625 0ZM 8.75 0.689704L 0 0.689704L 0 0.939704L 8.75 0.939704L 8.75 0.689704ZM 0.125 0.814704L 0.125 0L -0.125 0L -0.125 0.814704L 0.125 0.814704Z"/>
                            <path id="path3_fill" fillRule="evenodd" d="M 6.68182 12.4983C 19.3819 3.96069 10.8232 -3.19992 6.68182 1.48202C 2.54049 -3.19992 -6.01827 3.96069 6.68182 12.4983Z"/>
                            <path id="path4_fill" fillRule="evenodd" d="M 0.875 1.76744C 2.53811 0.560097 1.41732 -0.452514 0.875 0.209578C 0.332683 -0.452514 -0.788106 0.560097 0.875 1.76744Z"/>
                            <path id="path5_fill" fillRule="evenodd" d="M 0.875 1.76744C 2.53811 0.560097 1.41732 -0.452514 0.875 0.209578C 0.332683 -0.452514 -0.788106 0.560097 0.875 1.76744Z"/>
                            <path id="path6_fill" fillRule="evenodd" d="M 0.875 1.76744C 2.53811 0.560097 1.41732 -0.452514 0.875 0.209578C 0.332683 -0.452514 -0.788106 0.560097 0.875 1.76744Z"/>
                        </defs>
                    </svg>



                </div>
            </div>
        );
    }
}