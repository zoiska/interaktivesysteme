import { state } from "./config.js";

export function updateDisplay() {
  const display = document.querySelector("#currency");
  display.innerText = state.currencyCounter;
}

/* This function toggles a div over the ladybug, under the sidebars if one or both
  are open, else the backdrop is removed
  + all other windows opening
*/
export function toggleSidebarBackdrop(sidebarBackdrop) {
  if (
    state.optionsOpen === true ||
    state.shopOpen === true ||
    state.prestigeOpen === true ||
    state.customisationOpen === true ||
    state.statisticsOpen === true
  ) {
    sidebarBackdrop.classList.add("open");
  } else {
    sidebarBackdrop.classList.remove("open");
  }
}
