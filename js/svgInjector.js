import { ladybug_svg } from "../emojisvg/ladybug_svg.js";
import { options_svg } from "../emojisvg/options_svg.js";
import { prestige_svg } from "../emojisvg/prestige_svg.js";
import { customisation_svg } from "../emojisvg/customisation_svg.js";
import { shop_svg } from "../emojisvg/shop_svg.js";

export function injectLadybug() {
  const clickcontainer = document.querySelector("#clicker");
  clickcontainer.innerHTML = ladybug_svg;
}

export function injectOptions() {
  const optionscontainer = document.querySelector("#options-svg-container");
  optionscontainer.innerHTML = options_svg;
}

export function injectPrestige() {
  const prestigecontainer = document.querySelector("#prestige-svg-container");
  prestigecontainer.innerHTML = prestige_svg;
}

export function injectCustomisation() {
  const customisationcontainer = document.querySelector("#customisation-svg-container");
  customisationcontainer.innerHTML = customisation_svg;
}

export function injectShop() {
  const shopcontainer = document.querySelector("#shop-svg-container");
  shopcontainer.innerHTML = shop_svg;
}
