chrome.runtime.sendMessage(pluginId, {message: pluginMessage},
    function(response) {
        if (!response.success)
            handleError(url);
});