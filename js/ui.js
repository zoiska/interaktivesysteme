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
    if (state.boughtHats[customisations[i].id] === true) {
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
    state.achievementsOpen === true ||
    state.customisationOpen === true ||
    state.statisticsOpen === true
  ) {
    sidebarBackdrop.classList.add("open");
  } else {
    sidebarBackdrop.classList.remove("open");
  }
}

export function closeItAll(
  buttonclicksound,
  sidebarOptions,
  optionsToggle,
  sidebarShop,
  shopToggle,
  sidebarBackdrop,
  customisationWindow,
  achievementsWindow,
  statisticsWindow,
  exportcsvPopup,
  resetPopup
) {
  // plays sound if backdrop clicked or esc pressed
  buttonclicksound();

  // close eeeveeeeryyyythiiiinng
  state.shopOpen = false;
  state.optionsOpen = false;
  state.achievementsOpen = false;
  state.customisationOpen = false;
  state.statisticsOpen = false;
  state.exportcsvPopupOpen = false;
  state.resetPopupOpen = false;
  sidebarOptions.classList.remove("open");
  optionsToggle.classList.remove("open");
  sidebarShop.classList.remove("open");
  shopToggle.classList.remove("open");
  sidebarBackdrop.classList.remove("open");
  customisationWindow.classList.remove("open");
  achievementsWindow.classList.remove("open");
  statisticsWindow.classList.remove("open");
  exportcsvPopup.classList.remove("open");
  resetPopup.classList.remove("open");
}
