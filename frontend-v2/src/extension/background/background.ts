import * as Browserium from "../../utils/Browserium";
import * as Dummy from "./dummy";



export enum Msg{
    recentSuggestions = "recentSuggestions"
}

export 

// VARIABLES
const backceiver: Browserium.Backceiver = new Browserium.Backceiver("background");
let suggestions: { [identifier: string]: any } = {} // any is CardData
let recentSuggestions: string[] = [];



// QUEUE
let queue: { [index: string]: string[] } = {};
let addRequestToQueue = (request: string, sender: string) => {
    if(!queue[request])
            queue[request] = [];

    queue[request].push(sender)
}



// LISTENERS



// REQUESTS
let requestRecentSuggestions = () => {
    
}



// CHECKS



// UPDATE
let updateRecentSuggestions = () => {
    //sends the new recentSugessstinos array to the backend
}



// INIT
