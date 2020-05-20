let contextMenus = {};

contextMenus.webSearch = chrome.contextMenus.create(
    {"title": "Search for this **SOMETHING**"},
    function () { if (chrome.runtime.lastError) console.error(chrome.runtime.lastError.message); }
);

chrome.contextMenus.onClicked.addListener(contextMenuHandler);

function contextMenuHandler(info, tab) {
    if (info.menuItemID === contextMenus.webSearch) {
        if (tab.url.includes("amazon")) console.log("successeeeseseesse");
        console.log("clicked on the webSearch thingy");
        chrome.tabs.executeScript({
            file: "webSearch.js"
        });
    }
}