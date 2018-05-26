chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.text && (msg.text == "send_orders")) {
    var x = document.getElementsByClassName("order");
    var csv = '"Order Placed","Total","Ship To","Order #","Items",\n';
    for (var i = 0; i < x.length; i++) {
      // Order Places, Total, Ship To, Order #
      var vals = x[i].querySelectorAll(".value");
      for (var j = 0; j < vals.length; j++) csv += '"' + vals[j].innerText + '",';
      csv += '"';

      // Items
      var items = x[i].querySelectorAll(".a-link-normal");
      var prices = x[i].querySelectorAll(".a-color-price");
      for (var j=0; j < prices.length; j++) {
        if (j) csv += "/";
        csv += items[(j*2)+3].innerText.replace('"','""') + " (" + prices[j].innerText + ")";
      }
      csv += '"\n';
    }
    sendResponse(csv);
  }
});
