import { muteButton, loudButton } from "./svgInjector.js";

let audio = document.getElementById("bgaudio");
let volume = document.getElementById("volume-slider");
let buysound = document.getElementById("buysound");
let fxvolume = document.getElementById("volume-slider-effects");
let buttonfx = document.getElementById("buttonpresssound");
let mainbuttonfx = document.getElementById("mainclicksound");
let bugwalkfx = document.getElementById("bugwalksound");
let squishfx = document.getElementById("squishsound");
let zipperfx = document.getElementById("zippersound");

audio.pause();

// attention: volume, as in sound, may or may not be the same as the variable 'volume'
volume.addEventListener("input", (e) => {
  audio.volume = e.target.value / 100;
});

fxvolume.addEventListener("input", (e) => {
  buysound.volume = e.target.value / 100;
  mainbuttonfx.volume = e.target.value / 100;
  buttonfx.volume = e.target.value / 100;
  bugwalkfx.volume = e.target.value / 100;
  squishfx.volume = e.target.value / 100;
  zipperfx.volume = e.target.value / 100;
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

export function bugwalkfxsound() {
  bugwalkfx.currentTime = 0;
  bugwalkfx.play();
}

export function squishfxsound() {
  squishfx.currentTime = 0;
  squishfx.play();
}

export function zipperfxsound() {
  zipperfx.currentTime = 0;
  zipperfx.play();
}

export function standardvolume() {
  buttonfx.volume = 0.2;
  mainbuttonfx.volume = 0.2;
  buysound.volume = 0.2;
  bugwalkfx.volume = 0.2;
  squishfx.volume = 0.2;
  zipperfx.volume = 0.2;
  audio.volume = 0.2;
  audio.play();
}

export function unmuteMute() {
  if (!audio.paused) {
    audio.pause();
    muteButton();
  } else {
    audio.play();
    loudButton();
  }
}
