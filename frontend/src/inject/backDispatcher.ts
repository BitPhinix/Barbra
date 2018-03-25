import * as React from "react";

export const sendMessage = (type: string, message?: any) => {
    chrome.runtime.sendMessage(chrome.runtime.id, {
        type: type,
        message: message
    });
};

export const addListener = (type: string, callback: (message: any) => any) => {
    chrome.runtime.onMessage.addListener(function (message) {
        if(message["type"] == type)
            callback(message["message"])
    });
};

export const sendToAll = (type: string, message?: any) => {
    chrome.tabs.query({}, function(tabs) {
        tabs.map( (value => {
            chrome.tabs.sendMessage(value.id, {type: type, message: message});
        }))
    });
};