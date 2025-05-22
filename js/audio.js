let audio = document.getElementById("bgaudio");

let volume = document.getElementById('volume-slider');

volume.addEventListener("change", function(e) {
    audio.volume = e.currentTarget.value / 100;
})

export function standardvolume(){
    audio.volume = 0.1;
}

export function unmuteMute(){
    audio.muted = !audio.muted;
}