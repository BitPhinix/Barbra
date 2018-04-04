"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mobx_1 = require("mobx");
var React = require("react");
var SidebarStore = (function () {
    function SidebarStore() {
        this.visible = false;
        this.showHeader = false;
        this.state = [];
        // ThemesList
        this.isThemesListSelected = false;
    }
    SidebarStore.prototype.loadLoadingPage = function () {
        this.state = [
            <div id="injected-spinner-con">
                <div id="injected-spinner">
                    <div className="bounce1"></div>
                    <div className="bounce2"></div>
                    <div className="bounce3"></div>
                </div>
            </div>
        ];
    };
    __decorate([
        mobx_1.observable
    ], SidebarStore.prototype, "visible", void 0);
    __decorate([
        mobx_1.observable
    ], SidebarStore.prototype, "showHeader", void 0);
    __decorate([
        mobx_1.observable
    ], SidebarStore.prototype, "state", void 0);
    __decorate([
        mobx_1.observable
    ], SidebarStore.prototype, "isThemesListSelected", void 0);
    __decorate([
        mobx_1.observable
    ], SidebarStore.prototype, "themesListSelectedTheme", void 0);
    return SidebarStore;
}());
exports.SidebarStore = SidebarStore;
var store = new SidebarStore();
exports.default = store;
