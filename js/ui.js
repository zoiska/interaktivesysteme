import { state } from "./config.js";
import { calculateCost } from "./upgrade.js";

export function updateDisplay() {
  const display = document.querySelector("#currency");
  display.innerText = state.currencyCounter;

  document.querySelectorAll(".shopButton").forEach((button, i) => {
    const upgrade = upgrade_definitions[i];
    const cost = calculateCost(upgrade);
    if (state.currencyCounter < cost) {
      button.classList.add("costly");
    } else {
      button.classList.remove("costly");
    }
  });

  document.querySelectorAll(".gridItem").forEach((item, i) => {
    const cost = customisations[i].cost;
    if (state.extraCurrency < cost) {
      item.classList.add("costly");
    } else {
      item.classList.remove("costly");
    }
  });
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
