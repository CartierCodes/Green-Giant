// ------------------------------------ Variables --------------------------------------
let items = [{}];

// -------------------------------------- Code -----------------------------------------
let temp = [{}];
document.querySelectorAll(".product-title-link > span").forEach(function (e) {
    let properties = {};
    properties.amazonURL = "https://www.amazon.com/s?k=" + e.innerText; //https://cors-anywhere.herokuapp.com/
    properties.titleString = e.innerText;
    properties.titleArray = e.innerText.split(" ");
    properties.loaded = false;
    temp.push(properties);
});
items = temp.slice(1);

// for (let i = 0; i < 1; i++) { //items.length
//     setTimeout(function() { 
//         getAmazonResults(i);
//         calculateSimilarity(i);
//     }, 1000);

//     if (i === items.length - 1) console.log(items);
// }

getAmazonResults(0);
//calculateSimilarity(0);

console.log("completed");
//setTimeout(function() { console.log("1 second has passed"); }, 1000);
setTimeout(function() {
    calculateSimilarity(0);
    console.log(items);
}, 3000);

// ------------------------------------- Methods --------------------------------------
function calculateSimilarity(i) {
    //while (items[i].loaded === false) { setTimeout(function() { console.log("waiting"); }, 100); } // make wait shorter

    let highestPercentage = 0;
    for (let j = 0; j < items[i].amazonTitleArray.length; j++) {
        let totalWords = items[i].amazonTitleArray[j].length;
        let matches = 0;
        items[i].amazonTitleArray[j].forEach(function (word) {
            if (items[i].titleArray.includes(word)) {
                items[i].amazonTitleArray[j].splice(items[i].amazonTitleArray[j].indexOf(word), 1);
                matches++;
            }
        });
        if (matches/totalWords > highestPercentage) { highestPercentage = matches/totalWords; }
    }
    items[i].percentage = highestPercentage;
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



