import * as BackDispatcher from "./backDispatcher";

console.log("Starting the crawler...");

window.onload = () => {
    let toQuery: string = document.body.innerText.trim();
    BackDispatcher.sendMessage("get_suggestion", toQuery);
};