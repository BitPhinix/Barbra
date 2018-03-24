import {observable} from "mobx";

export class ThresholdStore{
    @observable width: string;
}

var store = new ThresholdStore();

export default store