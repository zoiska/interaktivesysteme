import { ladybug_svg } from "../emojisvg/ladybug_svg.js";
import { options_svg } from "../emojisvg/options_svg.js";
import { achievements_svg } from "../emojisvg/achievements_svg.js";
import { customisation_svg } from "../emojisvg/customisation_svg.js";
import { shop_svg } from "../emojisvg/shop_svg.js";
import { splat_svg } from "../emojisvg/Splat-12--NicholasJudy456.js";
import { mainClickEvent } from "./script.js";
import { updateCustomisation } from "./customisation.js";
import { buttonclicksound, zipperfxsound } from "./audio.js";
import { state } from "./config.js";
import { updateDisplay } from "./ui.js";

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
    console.log(state.boughtHats[element.id]);
    const bought = state.boughtHats[element.id];
    item.innerHTML = svgString;
    gridContainer.appendChild(item);
    c++;
    item.addEventListener("click", () => {
      if (bought) {
        zipperfxsound();
        updateCustomisation();
        const container = document.querySelector("#hat-container");
        container.innerHTML = svgString;
        const container1 = document.querySelector("#hat-container #emoji");
        container1.style.transform = `translate(${position1}%, ${position2}%)`;
        container1.addEventListener("click", mainClickEvent);
      } else {
        state.extraCurrency < cost ? buttonclicksound : (state.extraCurrency -= cost);
        state.boughtHats[element.id] = true;
        zipperfxsound();
        updateCustomisation();
        const container = document.querySelector("#hat-container");
        container.innerHTML = svgString;
        const container1 = document.querySelector("#hat-container #emoji");
        container1.style.transform = `translate(${position1}%, ${position2}%)`;
        container1.addEventListener("click", mainClickEvent);
      }
      updateDisplay();
    });
  });
}

export function transformClicker() {
  const clickable = document.querySelector("#clickableArea");
  const clickable1 = document.querySelector("#clickableAreaHat");

  clickable.addEventListener("pointerdown", () => {
    clickable.style.transform = "scale(1.1)";
    clickable1.style.transform = "scale(1.1)";
  });

  clickable.addEventListener("pointerup", () => {
    clickable.style.transform = "scale(1)";
    clickable1.style.transform = "scale(1)";
  });

  clickable.addEventListener("pointerleave", () => {
    clickable.style.transform = "scale(1)";
    clickable1.style.transform = "scale(1)";
  });

  clickable1.addEventListener("pointerdown", () => {
    clickable.style.transform = "scale(1.1)";
    clickable1.style.transform = "scale(1.1)";
  });

  clickable1.addEventListener("pointerup", () => {
    clickable.style.transform = "scale(1)";
    clickable1.style.transform = "scale(1)";
  });

  clickable1.addEventListener("pointerleave", () => {
    clickable.style.transform = "scale(1)";
    clickable1.style.transform = "scale(1)";
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
