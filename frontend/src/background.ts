import Backface from "./backface";
import * as BackDispatcher from "./inject/backDispatcher";

const client = new Backface("https://53bb3c51.ngrok.io/");

BackDispatcher.addListener("get_initial", () => {
    console.log("Called get_initial");
    if(client.loggedIn){
        console.log("Init: logged in");
        client.getUser((response) => BackDispatcher.sendToAll("return_initial", response));
    }
});

BackDispatcher.addListener("get_suggestion", (toQuery) => {
    console.log("Called get_suggestion");
    client.getSuggestion(toQuery, (response => {
        BackDispatcher.sendToAll("return_suggestion", response);
    }));
});

BackDispatcher.addListener("get_login",  message => {
    if(client.loggedIn)
        throw console.log("Login: logged in");
    console.log("Called get_login");
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
    console.log("Called get_user");
    client.getUser((response) => BackDispatcher.sendToAll("return_user", response));
});


BackDispatcher.addListener("get_logout", () => {
    console.log("Called get_logout");
    client.logout();
});