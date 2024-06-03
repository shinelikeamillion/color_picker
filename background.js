// Listen for a click on the camera icon. On that click, take a screenshot.
chrome.action.onClicked.addListener(function () {
  capture();
});

// chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
//   if (message.type === "position") {
//     // const screenshotUrl = await chrome.tabs.captureVisibleTab();
//     sendResponse({
//       // url: screenshotUrl,
//     });
//     s;
//   }
// });

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
