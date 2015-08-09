// Download Amazon Orders

// TODO replace urlContains with urlMatches and switch to more specific regex
// TODO improve the urlRegex to be more specific
// TODO package up extension and upload
// TODO consider adding option page to specific filename and perhaps output format

// Display icon when on the Amazon orders page
chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: 'order-history' },
          })
        ],
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});

function downloadURI(uri, name) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  link.click();
}

function downloadOrders(orders) {
  downloadURI(
  	'data:text/csv;charset=utf-8;base64,' + window.btoa(orders), 
  	"amazon-orders.csv"
  );
}

var urlRegex = /^https?:\/\/(?:[^\.]+\.)?amazon\.com/;

chrome.pageAction.onClicked.addListener(function(tab) {
  if (urlRegex.test(tab.url)) {
    chrome.tabs.sendMessage(tab.id, { text: "send_orders" }, downloadOrders);
  }
});



