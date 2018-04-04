"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mobx_1 = require("mobx");
// TODO connect it to user database on the backend
var UserStore = (function () {
    function UserStore() {
    }
    __decorate([
        mobx_1.observable
    ], UserStore.prototype, "userBookmarks", void 0);
    __decorate([
        mobx_1.observable
    ], UserStore.prototype, "userThemes", void 0);
    __decorate([
        mobx_1.observable
    ], UserStore.prototype, "userName", void 0);
    return UserStore;
}());
exports.UserStore = UserStore;
var userStore = new UserStore();
exports.default = userStore;
