
chrome.action.onClicked.addListener(function () {
  capture();
});

function capture() {
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    await chrome.tabs
      .captureVisibleTab({ format: "jpeg", quality: 100 })
      .then((screenshotUrl) =>
        chrome.tabs.query({active:true, currentWindow: true}, async function (tabs) {
           await chrome.tabs.sendMessage(
            tabs[0].id,
            { type: 'color_picker', image: screenshotUrl }
          )
        })
      );
  });
}
