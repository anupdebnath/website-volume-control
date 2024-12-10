// Listen for tab updates and inject the content script
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
    const url = new URL(tab.url);
    const domain = url.hostname;

    // Fetch the saved volume for the domain
    chrome.storage.local.get([domain], (data) => {
      const volume = data[domain] || 100; // Default to 100%
      chrome.scripting.executeScript({
        target: { tabId },
        func: (volume) => {
          const applyVolume = () => {
            const mediaElements = document.querySelectorAll("video, audio");
            mediaElements.forEach((media) => (media.volume = volume));
          };
          applyVolume();

          // Observe new media elements dynamically added
          const observer = new MutationObserver(() => applyVolume());
          observer.observe(document.body, {
            childList: true,
            subtree: true,
          });
        },
        args: [volume / 100], // Normalize volume (0 to 1)
      });
    });
  }
});
