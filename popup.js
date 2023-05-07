document.addEventListener("DOMContentLoaded", function () {
   document.getElementById("submitButton").addEventListener("click", function(){
       var input = document.getElementById('keyInput').value;
       chrome.storage.sync.set({key: input});
   })
});
