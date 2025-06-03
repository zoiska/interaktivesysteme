let audio = document.getElementById("bgaudio");
let volume = document.getElementById("volume-slider");
let buysound = document.getElementById("buysound");
let fxvolume = document.getElementById("volume-slider-effects");
let buttonfx = document.getElementById("buttonpresssound");
let mainbuttonfx = document.getElementById("mainclicksound");

audio.pause();

// attention: volume, as in sound, may or may not be the same as the variable 'volume'
volume.addEventListener("input", (e) => {
  audio.volume = e.target.value / 100;
});

fxvolume.addEventListener("input", (e) => {
  buysound.volume = e.target.value / 100;
  mainbuttonfx.volume = e.target.value / 100;
  buttonfx.volume = e.target.value / 100;
});

export function buysoundclick() {
  buysound.currentTime = 0;
  buysound.play();
}

export function mainbuttonclicksound() {
  mainbuttonfx.currentTime = 0;
  mainbuttonfx.play();
}

export function buttonclicksound() {
  buttonfx.currentTime = 0;
  buttonfx.play();
}

export function standardvolume() {
  buttonfx.volume = 0.2;
  mainbuttonfx.volume = 0.2;
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
