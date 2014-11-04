chrome.app.runtime.onLaunched.addListener(function() {
    chrome.power.requestKeepAwake('display');
    chrome.app.window.create('index.html', {
        'id': 'mainWindow',
        'state': 'fullscreen',
        'bounds': {
            'width': 1920,
            'height': 1080
        }
    });
});
