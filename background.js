let contextMenus = {};

contextMenus.createWebSearch =
    chrome.contextMenus.create(
        {"title": "Search for this **SOMETHING**"},
        function () {
            if (chrome.runtime.lastError) {
               console.error(chrome.runtime.lastError.message);
            }
});

chrome.contextMenus.onClicked.addListener(contextMenuHandler);

function contextMenuHandler(info, tab) {
    if (info.menuItemID===contextMenus.createWebSearch) {
        console.log("clicked on the webSearch thingy");
    }
}