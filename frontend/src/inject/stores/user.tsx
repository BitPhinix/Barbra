import {observable} from "mobx";
import * as React from "react";
import InformationCard from "../components/informationCard/informationCard";

// TODO connect it to user database on the backend
export class UserStore {
    @observable userBookmarks: InformationCard[];
    @observable userThemes: string[];
    @observable userName: string;
    // 1.1 @observable userBlacklistedInformationCards: InformationCard[];
}

var userStore = new UserStore();

export default userStore