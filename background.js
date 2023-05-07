chrome.contextMenus.create({
    id: "1", 
    title: "Additional Information", 
    contexts: ["selection"]
})
chrome.contextMenus.create({ 
    id : "2", 
    title : "Idle", 
})
chrome.contextMenus.onClicked.addListener((info, tab) => {
      // Send a message to the content script
      chrome.contextMenus.update("2", {
        title: "Processing..."
      }); 
      chrome.tabs.sendMessage(tab.id, {greeting: "GET_PROMPT", is_resp: false}, async function(back) {
          const prompt = back.farewell; 
          const key = await chrome.storage.sync.get("key");
          console.log(key.key);
          const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              "Authorization":  "Bearer " + key.key 
            },
            body: JSON.stringify({
              model: 'gpt-3.5-turbo',
              messages: [{"role" : "user", "content" : prompt}],
              max_tokens: 2048
            })
          });
          const bs_j = await response.json()
          try { 
            const resp_val = bs_j.choices[0].message.content;
            chrome.tabs.sendMessage(tab.id, {greeting: resp_val, is_resp: true, control: "SUCCESS"});
            console.log(resp_val);
          } 
          catch (err) { 
            console.log(bs_j);
            chrome.tabs.sendMessage(tab.id, {greeting: "Completion not generated", is_resp: false, control: "EMSG"})
          }
          chrome.contextMenus.update("2", {
            title: "Complete!"
        });
      });
  });