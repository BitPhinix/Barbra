import Backface from "./backface";
import * as BackDispatcher from "./inject/backDispatcher";

const client = new Backface("https://b6bce9e2.ngrok.io/");

if(client.loggedIn){
    BackDispatcher.addListener("get_login",  message => {
        if(!client.loggedIn)
            client.login(message["provider"], response => {
                let popup = open(response["url"], "Authenticate", 'height=800,width=600');
                chrome.runtime.onMessageExternal.addListener( (message) => {
                    if(message["error"])
                        throw Error(message["error"]);
                    client.setCookie(message["cookie"]);
                    client.getUser((response) => BackDispatcher.sendToAll("return_login", response))
                });
            });
    });
}

BackDispatcher.addListener("get_initial", () => {
    client.getUser((response) => BackDispatcher.sendToAll("return_initial", response))
});

BackDispatcher.addListener("get_logout", () => {
    client.logout();
});

BackDispatcher.addListener("get_suggestion", (toQuery) => {
    client.getSuggestion(toQuery, (response => {
        console.log("got suggs")
        BackDispatcher.sendToAll("return_suggestion", response);
    }));
});

BackDispatcher.addListener("get_login",  message => {
    client.login(message["provider"], response => {
        let popup = open(response["url"], "Authenticate", 'height=800,width=600');
        chrome.runtime.onMessageExternal.addListener( (message) => {
            if(message["error"])
                throw Error(message["error"]);
            client.setCookie(message["cookie"]);
            client.getUser((response) => BackDispatcher.sendToAll("return_login", response))
        });
    });
});

BackDispatcher.addListener("get_user",  () => {
    client.getUser((response) => BackDispatcher.sendToAll("return_user", response))
});