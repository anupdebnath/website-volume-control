chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "setVolume") {
    const volume = message.volume / 100;
    const videos = document.querySelectorAll("video");
    const audios = document.querySelectorAll("audio");

    videos.forEach((video) => (video.volume = volume));
    audios.forEach((audio) => (audio.volume = volume));
  }
});
