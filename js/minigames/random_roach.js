import { cockroach_svg } from "../../emojisvg/cockroach_svg.js";
import { bugwalkfxsound, squishfxsound } from "../audio.js";
import { state } from "../config.js";
import { updateCustomisation } from "../customisation.js";
import { saveGame } from "../storage.js";
import { injectSplat } from "../svgInjector.js";
import { floatingRuby } from "../floatingnumbers.js";

function makeRoach() {
  const area = document.querySelector(".roach_area");

  const roach = document.createElement("div");
  roach.className = "roach";
  roach.innerHTML = cockroach_svg;

  area.appendChild(roach);

  requestAnimationFrame(() => {
    roach.classList.add("show");
    // plays sound if spawned
    bugwalkfxsound();
  });

  roach.addEventListener("click", (event) => {
    roach.style.pointerEvents = "none";
    const roachRect = roach.getBoundingClientRect();
    const x = roachRect.left;
    const y = roachRect.top;

    injectSplat(area, x, y);
    roach.classList.remove("show");
    roach.classList.add("fade-out");
    roach.addEventListener("transitionend", () => {
      roach.remove();
    });
    let newExtraCurrency = Math.floor(Math.random() * 5) + 1;
    state.extraCurrency += newExtraCurrency;
    state.statistics.total_rubys_collected += newExtraCurrency;

    state.statistics.total_roaches_caught++;

    floatingRuby(event, newExtraCurrency);
    updateCustomisation();
    saveGame();
    // plays sound if clicked
    squishfxsound();
    document.getElementById("bugwalksound").pause();
  });

  setTimeout(() => {
    roach.style.pointerEvents = "none";
    state.statistics.total_roaches_missed++;
    roach.classList.remove("show");
    roach.classList.add("fade-out");
    roach.addEventListener("transitionend", () => {
      roach.remove();
    });
  }, 5000);

  const offsetX = Math.floor((Math.random() * window.innerWidth) / 2);
  const offsetY = Math.floor((Math.random() * window.innerHeight) / 2);

  const amplitudeX1 = Math.floor(Math.random() * 100) + 50;
  const amplitudeX2 = Math.floor(Math.random() * 100) + 50;

  const amplitudeY1 = Math.floor(Math.random() * 100) + 50;
  const amplitudeY2 = Math.floor(Math.random() * 100) + 50;

  const frequencyX1 = Math.random() * 2 + 0.1;
  const frequencyX2 = Math.random() * 2 + 0.1;

  const frequencyY1 = Math.random() * 2 + 0.1;
  const frequencyY2 = Math.random() * 2 + 0.1;

  const phaseX1 = Math.random() * 2 * Math.PI;
  const phaseX2 = Math.random() * 2 * Math.PI;
  const phaseY1 = Math.random() * 2 * Math.PI;
  const phaseY2 = Math.random() * 2 * Math.PI;

  let prevX = 0;
  let prevY = 0;

  function animateRoach() {
    const time = Date.now() / 1000; // seconds

    const x =
      offsetX +
      amplitudeX1 * Math.sin(frequencyX1 * time + phaseX1) +
      amplitudeX2 * Math.sin(frequencyX2 * time + phaseX2);

    const y =
      offsetY +
      amplitudeY1 * Math.sin(frequencyY1 * time + phaseY1) +
      amplitudeY2 * Math.sin(frequencyY2 * time + phaseY2);

    const angle = Math.atan2(x - prevX, y - prevY) * (180 / Math.PI);

    roach.style.transform = `translate(${x}px, ${y}px)` + `rotate(${angle}deg)`;

    prevX = x;
    prevY = y;

    requestAnimationFrame(animateRoach);
  }

  animateRoach();
}

(function loop() {
  var rand = Math.round(Math.random() * (2 * 10000) + 5 * 10000);
  setTimeout(() => {
    makeRoach();
    loop();
  }, rand);
})();
