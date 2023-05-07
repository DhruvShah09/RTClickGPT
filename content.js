chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    let text;
    text = document.getSelection().toString().trim();
    console.log(text);
    sendResponse({farewell: text}) 
    if(message.is_resp){ 
        console.log(message.greeting)
        navigator.clipboard.writeText(message.greeting).then(() => {
            console.log("Success")
        }, () => {
            console.log("Fail")
        })
    } else { 
        if (message.control == "EMSG") { 
            console.log("Request Error. Check your API Key")
        }
    }
})  