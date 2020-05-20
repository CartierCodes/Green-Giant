let contextMenus = {};

contextMenus.webSearch = chrome.contextMenus.create(
        {"title": "Check Amazon for this page",
        "contexts" : ["editable"] },
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