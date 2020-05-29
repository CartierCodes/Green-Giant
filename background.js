let contextMenus = {};

contextMenus.webSearch = chrome.contextMenus.create(
        {"title": "Check Amazon for this page",
        "contexts" : ["page"] },
        function () { if (chrome.runtime.lastError) console.error(chrome.runtime.lastError.message); }
    );

chrome.contextMenus.onClicked.addListener(contextMenuHandler);

function contextMenuHandler(info, tab){
    if (info.menuItemId === contextMenus.webSearch){
        if (tab.url.includes("walmart")) {
            console.log("this is walmart's page");
            chrome.tabs.executeScript({
                file: "compareWalmart.js"
            });
        }
        else if (tab.url.includes("wayfair")) {
            console.log("this is wayfair's page");
            chrome.tabs.executeScript({
                file: "compareWayfair.js"
            });
        }
    }
}

// chrome.webRequest.onBeforeSendHeaders.addListener(
//     function(info) {
//         var headers = info.requestHeaders;
//         headers.forEach(function(header, i) {
//             if (header.name.toLocaleLowerCase() == 'user-agent') { 
//                 header.value = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.3';
//             }
//             if (header.name.toLocaleLowerCase() === 'access-control-allow-origin') {
//                 item.value = '*'
//             }
//         });  
//         return {requestHeaders: headers};
//     },
//     {
//         urls: [
//             "http://stackoverflow.com/*",
//             "http://127.0.0.1:6789/*",
//             "https://www.amazon.com/*"
//         ],
//         types: ["xmlhttprequest"]
//     },
//     ["blocking", "requestHeaders"]
// );