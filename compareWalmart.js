// ------------------------------------ Variables --------------------------------------
let items = [{}];

// -------------------------------------- Code -----------------------------------------
let temp = [{}];
document.querySelectorAll(".product-title-link > span").forEach(function (e) {
    let properties = {};
    properties.amazonURL = "https://cors-anywhere.herokuapp.com/amazon.com/s?k=" + e.innerText;
    properties.titleString = e.innerText;
    properties.titleArray = e.innerText.split(" ");
    properties.loaded = false;
    temp.push(properties);
});
items = temp.slice(1);

for (let i = 0; i < items.length; i++) {
    getAmazonResults(i);
    calculateSimilarity(i);
}

setInterval(function() { console.log(items); }, 3000);

// ------------------------------------- Methods --------------------------------------
function calculateSimilarity(i) {
    while (items[i].loaded === false) { setTimeout(function() { console.log("waiting"); }, 100); } // make wait shorter

    let totalWords = items[i].amazonTitleArray.length;
    let matches = 0;
    while (items[i].amazonTitleArray.length > 0) {
        if (items[i].titleArray.includes(items[i].amazonTitleArray[0])) {
            
        }
    }
    
}

function getAmazonResults(i) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", items[i].amazonURL);
    xhr.responseType = "document";
    
    xhr.onload = function () {
      if (xhr.readyState === xhr.DONE && xhr.status === 200) {
        let doc = xhr.response;
        let returnArray = [];

        doc.querySelectorAll(".a-size-base-plus").forEach(function (e) { returnArray.push(e.innerText); });

        items[i].amazonTitleStrings = returnArray;
        items[i].amazonTitleArray = returnArray.map(a => a.split(" "));
        items[i].loaded = true;
      }
    };
    xhr.send();
}



