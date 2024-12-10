chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    const url = new URL(tab.url);
    const domain = url.hostname;

    chrome.storage.local.get([domain], (data) => {
      const volume = data[domain];
      if (volume !== undefined) {
        chrome.scripting.executeScript({
          target: { tabId },
          func: (volume) => {
            const videos = document.querySelectorAll("video, audio");
            videos.forEach((media) => (media.volume = volume / 100));
          },
          args: [volume],
        });
      }
    });
  }
});
