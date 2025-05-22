let audio = document.getElementById("bgaudio");
let volume = document.getElementById("volume-slider");

audio.pause();

volume.addEventListener("change", function (e) {
  audio.volume = e.currentTarget.value / 100;
});

export function standardvolume() {
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
