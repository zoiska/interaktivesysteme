import { ladybug_svg } from "../emojisvg/ladybug_svg.js";
import { options_svg } from "../emojisvg/options_svg.js";
import { achievements_svg } from "../emojisvg/achievements_svg.js";
import { customisation_svg } from "../emojisvg/customisation_svg.js";
import { mute_svg } from "../emojisvg/mute1F507.js";
import { loud_svg } from "../emojisvg/loud1F50A.js";
import { shop_svg } from "../emojisvg/shop_svg.js";
import { splat_svg } from "../emojisvg/Splat-12--NicholasJudy456.js";
import { ruby_svg } from "../emojisvg/ruby_E04F.js";
import { prohibited_svg } from "../emojisvg/prohibited_1F6AB.js";
import { mainClickEvent } from "./script.js";
import { updateCustomisation } from "./customisation.js";
import { buttonclicksound, zipperfxsound } from "./audio.js";
import { state } from "./config.js";
import { updateDisplay } from "./ui.js";
import { saveGame } from "./storage.js";

export function muteButton() {
  const muteButtonContianer = document.querySelector(".unmuteMuteButton");
  muteButtonContianer.innerHTML = mute_svg;
}

export function loudButton() {
  const loudButtonContainer = document.querySelector(".unmuteMuteButton");
  loudButtonContainer.innerHTML = loud_svg;
}

export function injectLadybug() {
  const clickcontainer = document.querySelector("#clicker");
  clickcontainer.innerHTML = ladybug_svg;
}

export function injectOptions() {
  const optionscontainer = document.querySelector("#options-svg-container");
  optionscontainer.innerHTML = options_svg;
}

export function injectAchievements() {
  const achievementscontainer = document.querySelector("#achievements-svg-container");
  achievementscontainer.innerHTML = achievements_svg;
}

export function injectCustomisation() {
  const customisationcontainer = document.querySelector("#customisation-svg-container");
  customisationcontainer.innerHTML = customisation_svg;
}

export function injectShop() {
  const shopcontainer = document.querySelector("#shop-svg-container");
  shopcontainer.innerHTML = shop_svg;
}

export function injectRuby() {
  return ruby_svg;
}

export function injectItems() {
  const items = customisations;
  let c = 1;
  const gridContainer = document.querySelector(".gridContainer");
  items.forEach((element) => {
    const item = document.createElement("div");
    item.className = "gridItem";
    item.id = `item${c}`;
    const svgString = Object.values(element)[0];
    const cost = Object.values(element)[1];
    const position1 = Object.values(element)[2];
    const position2 = Object.values(element)[3];

    item.innerHTML = svgString;
    if (state.boughtHats[element.id] === true) {
      item.style.backgroundColor = "rgba(144,238,144,0.5)";
    }
    gridContainer.appendChild(item);
    c++;
    item.addEventListener("click", () => {
      const bought = state.boughtHats[element.id];
      if (bought === true) {
        item.style.backgroundColor = "rgba(144,238,144,0.5)";
        item.style.zIndex = 1;
        zipperfxsound();
        updateCustomisation();
        const container = document.querySelector("#hat-container");
        container.innerHTML = svgString;
        const container1 = document.querySelector("#hat-container #emoji");
        container1.style.transform = `translate(${position1}%, ${position2}%)`;
        container1.addEventListener("click", mainClickEvent);
      } else {
        if (state.extraCurrency < cost) {
          buttonclicksound();
          return;
        } else {
          item.style.zIndex = 1;
          state.extraCurrency -= cost;
          state.statistics.total_rubys_spent += cost;
          state.boughtHats[element.id] = true;
          state.statistics.total_hats_bought++;
          zipperfxsound();
          updateCustomisation();
          const container = document.querySelector("#hat-container");
          container.innerHTML = svgString;
          const container1 = document.querySelector("#hat-container #emoji");
          container1.style.transform = `translate(${position1}%, ${position2}%)`;
          container1.addEventListener("click", mainClickEvent);
          item.style.backgroundColor = "rgba(144,238,144,0.5)";
          saveGame();
        }
      }
      updateDisplay();
    });
  });
}

export function injectSplat(area, x, y) {
  const splat = document.createElement("div");
  splat.className = "splat";
  splat.innerHTML = splat_svg;
  splat.style.position = "fixed";
  splat.style.left = `${x}px`;
  splat.style.top = `${y}px`;
  splat.style.transform = `rotate(${Math.random() * 360}deg)`;

  setTimeout(() => {
    splat.style.pointerEvents = "none";
    splat.classList.remove("show");
    splat.classList.add("fade-out");
    splat.addEventListener("transitionend", () => {
      splat.remove();
    });
  }, 3000);
  area.appendChild(splat);
}

export function injectProhibited() {
  const prohibitedContainer = document.querySelector("#item12");
  prohibitedContainer.innerHTML = prohibited_svg;
}
