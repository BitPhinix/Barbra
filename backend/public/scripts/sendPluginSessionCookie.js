chrome.runtime.sendMessage(pluginId, {cookie: document.cookie},
    function(response) {
        if (!response.success)
            handleError(url);
});