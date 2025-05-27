let audio = document.getElementById("bgaudio");
let volume = document.getElementById("volume-slider");
let buysound = document.getElementById("buysound");

audio.pause();

volume.addEventListener("change", function (e,f) {
  audio.volume = e.currentTarget.value / 100;
  buysound.volume = f.currentTarget.value / 100;
});

export function standardvolume() {
    buysound.volume = 0.2;
    audio.volume = 0.2;
    audio.play();
}

export function unmuteMute() {
  if (!audio.paused) {
    audio.pause();
  } else {
    audio.play();
  }
}
