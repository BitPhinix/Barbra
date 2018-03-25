export default class Backface{

    public serverDomain: string = "";
    private cookie?: string;
    public loggedIn: boolean;

    constructor(serverDomain:string){
        chrome.storage.sync.get(items => {
            if(items["barbra-session"]){
                this.cookie = items["barbra-session"];
                this.loggedIn = true;
                console.log("Found session!");
            }
        });
        if(!serverDomain)
            throw console.error("No domain!");
        this.serverDomain = serverDomain;
    }

    public setCookie(session: string){
        this.loggedIn = true;
        chrome.storage.sync.set({"barbra-session": session});
        console.log("Saved session!");
    }

    public logout(){
        this.loggedIn = false;
        chrome.storage.sync.set({"barbra-session": null});
        console.log("Logged out!");
    }

    public getUser(callback: (response: any) => any){
        if(!this.loggedIn)
            throw console.log("Not logged in!");
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                callback(JSON.parse(xhttp.response));
            }
        };
        xhttp.open("GET", this.serverDomain + "api/v1/user", true);
        xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        xhttp.withCredentials = true;
        xhttp.setRequestHeader("cookie", this.cookie);
        xhttp.send();
    }

    public getSuggestion(toQuery: string, callback: (response: {topic:string, title: string, content: string, article_url:string, id:string}[]) => any){
        if(!this.loggedIn)
            throw console.log("Not logged in!");
        console.log("Submitting query string!")
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                callback(JSON.parse(xhttp.response));
            }
        };
        xhttp.open("GET", this.serverDomain + "api/v1/suggestion?query=" + toQuery, true);
        xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        xhttp.withCredentials = true;
        xhttp.setRequestHeader("cookie", this.cookie);
        xhttp.send();
    }

    public login(provider: string, callback: (response: any) => any){
        if(this.loggedIn)
            throw console.warn("Already logged in!");

        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                callback(JSON.parse(xhttp.response));
            }
        };
        xhttp.open("GET", this.serverDomain + "api/v1/oauth/login?provider=" + provider + "&ext_id=" + chrome.runtime.id, true);
        xhttp.send();
    }
}