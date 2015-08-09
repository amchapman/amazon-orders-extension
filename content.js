chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.text && (msg.text == "send_orders")) {
    var x = document.getElementsByClassName("order");
    var csv = '"Order Placed","Total","Ship To","Order #","Items",\n';
    var vals, itemViews, prices;
    for (i = 0; i < x.length; i++) { 
    	vals = x[i].querySelectorAll(".value");
    	itemViews = x[i].querySelectorAll(".item-view-left-col-inner");
    	prices = x[i].querySelectorAll(".a-color-price");

    	for (j = 0; j < vals.length; j++) { 
	    	csv += '"' + vals[j].innerText + '",';
    	}

		// Item titles
		csv += '"';
    	for (j = 0; j < itemViews.length; j++) { 
    		if (j>0) csv += "/";
    		csv += itemViews[j].childNodes[1].childNodes[1].title;
    		if (j<prices.length) csv += " (" + prices[j].innerText + ")";
    	}

		// New Line
    	csv += '"\n';
	}
    sendResponse(csv);
  }
});