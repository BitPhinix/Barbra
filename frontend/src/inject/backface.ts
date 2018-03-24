

export default class Backface{

    public serverDomain: string = "";
    public cookie?: string;

    constructor(serverDomain:string, session?: string){
        if(session) //&& this.checkSession(session))
            this.cookie = session;
        if(!serverDomain)
            throw Error("Backface: No domain!");
        this.serverDomain = serverDomain;
    }

    public getUser(callback: (response: JSON) => any){
        if(!this.cookie)
            throw Error("Backface: No cookie created!");
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                callback(JSON.parse(xhttp.response));
            }
        };
        xhttp.open("GET", this.serverDomain + "api/v1/user", true);
        xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        xhttp.withCredentials = true;
        xhttp.setRequestHeader("cookie", "");
        xhttp.send();
    }

    public login(provider: Providers, callback: (response: JSON) => any){
        if(this.cookie)
            throw Error("Backface: Already logged in!");

        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                callback(JSON.parse(xhttp.response));
            }
        };
        xhttp.open("GET", this.serverDomain + "api/v1/oauth/login?provider=" + provider as string + "&ext_id=" + chrome.runtime.id, true);
        xhttp.send();
    }

    public getSuggestions(){
        if(!this.cookie)
            throw Error("Backface: No cookie created!");

    }
}

export enum Providers{
    Google = "google",
    Facebook = "facebook"
}