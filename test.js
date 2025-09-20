let Auth = require("./index")
let auth = new Auth("https://auth.austinsdk.me","0fd44bbcadde44fdfc255bf8a7dde89a","ba04fb6d7458fa28796b30a01399d0a88d38fcb94f2130c32c64d93112283364","https://austinsdk.me");

async function run(){
    // Example usage - you need a valid token to call getUserInfo
    console.log("Auth URL:", auth.getAuthUrl());
    
    // The following would need actual tokens from the OAuth flow:
    // const token = "your_access_token_here";
    // const userInfo = await auth.getUserInfo(token);
    // const projects = await auth.getProjects(token);
    // const verification = await auth.verify(token);
}

run().catch(console.error);