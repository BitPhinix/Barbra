chrome.runtime.onMessageExternal.addListener(
    function(request, sender, sendResponse) {
        chrome.tabs.query({}, function(tabs) {
            var message = request;
            for (var i=0; i<tabs.length; ++i) {
                chrome.tabs.sendMessage(tabs[i].id, message);
            }
        });

    });

