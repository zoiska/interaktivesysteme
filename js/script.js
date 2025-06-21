import { state } from "./config.js";
import { saveGame, loadSave, resetProgress } from "./storage.js";
import { loadUpgrades } from "./upgrade.js";
import { updateDisplay, toggleSidebarBackdrop } from "./ui.js";
import {
  injectCustomisation,
  injectLadybug,
  injectOptions,
  injectAchievements,
  injectShop,
  injectItems,
  transformClicker,
} from "./svgInjector.js";
import { updateCustomisation } from "./customisation.js";
import { standardvolume, unmuteMute, mainbuttonclicksound, buttonclicksound } from "./audio.js";
import { checkAchievements, checkUpgradeAchievements, loadAchievements } from "./achievement.js";

function init() {
  injectLadybug();
  injectOptions();
  injectAchievements();
  injectCustomisation();
  injectShop();
  injectItems();

  standardvolume();

  const clicker = document.querySelector("#clickableArea");
  const sidebarOptions = document.querySelector(".sidebarOptions");
  const sidebarShop = document.querySelector(".sidebarShop");
  const optionsToggle = document.querySelector(".optionsToggle");
  const shopToggle = document.querySelector(".shopToggle");
  const resetButton = document.querySelector(".resetButton");
  const sidebarBackdrop = document.querySelector(".sidebarBackdrop");
  const achievementsButton = document.querySelector(".achievementsButton");
  const achievementsWindow = document.querySelector(".achievementsWindow");
  const customisationButton = document.querySelector(".customisationButton");
  const customisationWindow = document.querySelector(".customisationWindow");
  const statisticsButton = document.querySelector(".statisticsButton");
  const statisticsWindow = document.querySelector(".statisticsWindow");
  const statsContainer = document.querySelector(".statsContainer");
  const unmuteMuteButton = document.querySelector(".unmuteMuteButton");
  const exportcsvbutton = document.querySelector(".exportcsv");
  const exportcsvPopup = document.querySelector(".exportcsvPopup");
  const resetPopup = document.querySelector(".resetPopup");
  const resetConfirmButton = document.querySelector(".resetConfirmButton");
  const closeExportPopup = document.querySelector(".closeExportPopup");
  const closeResetPopup = document.querySelector(".closeResetPopup");
  const exportcsvButton = document.querySelector(".exportcsvButton");

  clicker.addEventListener("click", () => {
    // plays a sound if bug is pressed
    mainbuttonclicksound();

    transformClicker();
    // the event listener for the ladybug click
    mainClickEvent();
  });

  clicker.addEventListener("mouseenter", () => {
    state.isHovering = true;
  });

  clicker.addEventListener("mouseleave", () => {
    state.isHovering = false;
  });

  document.addEventListener("keydown", (event) => {
    if (
      (event.key === "Enter" && !event.repeat && state.isHovering === true) || // allow clicking with enter
      (event.key === " " && !event.repeat && state.isHovering === true)
    ) {
      // allow clicking with spacebar
      clicker.animate(
        [{ transform: "scale(1)" }, { transform: "scale(1.1)" }, { transform: "scale(1)" }],
        {
          duration: 60,
        }
      );
      mainClickEvent();
    }
  });

  unmuteMuteButton.addEventListener("click", () => {
    // plays sound if clicked
    buttonclicksound();

    unmuteMute();
  });

  resetButton.addEventListener("click", () => {
    state.resetPopupOpen === false ? (state.resetPopupOpen = true) : (state.resetPopupOpen = false);
    state.optionsOpen = false;
    sidebarOptions.classList.remove("open");
    // plays sound if clicked
    buttonclicksound();

    // toggle reset csv popup
    resetPopup.classList.toggle("open");
  });

  resetConfirmButton.addEventListener("click", () => {
    // plays sound if clicked
    buttonclicksound();
    // reset button
    resetProgress();
    location.reload();
  });

  closeResetPopup.addEventListener("click", () => {
    // plays sound if clicked
    buttonclicksound();
    state.resetPopupOpen = false;
    resetPopup.classList.remove("open");
    toggleSidebarBackdrop(sidebarBackdrop);
  });

  optionsToggle.addEventListener("keydown", (event) => {
    // disable keyboard input for options button
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
    }
  });

  clickableAreaOptions.addEventListener("click", () => {
    // plays sound if clicked
    buttonclicksound();

    // event listener for options button
    state.optionsOpen === false ? (state.optionsOpen = true) : (state.optionsOpen = false);
    sidebarOptions.classList.toggle("open");
    toggleSidebarBackdrop(sidebarBackdrop);
  });

  achievementsButton.addEventListener("keydown", (event) => {
    // disable keyboard input for achievements button
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
    }
  });

  clickableAreaAchievements.addEventListener("click", () => {
    // plays sound if clicked
    buttonclicksound();

    // event listener for achievements button
    state.achievementsOpen === false
      ? (state.achievementsOpen = true)
      : (state.achievementsOpen = false);
    achievementsWindow.classList.toggle("open");
    toggleSidebarBackdrop(sidebarBackdrop);
  });

  customisationButton.addEventListener("keydown", (event) => {
    // disable keyboard input for customisation button
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
    }
  });

  customisationButton.addEventListener("click", () => {
    // plays sound if clicked
    buttonclicksound();

    // event listener for customisation button
    state.customisationOpen === false
      ? (state.customisationOpen = true)
      : state.customisationOpen === false;
    customisationWindow.classList.toggle("open");
    toggleSidebarBackdrop(sidebarBackdrop);
  });

  shopToggle.addEventListener("keydown", (event) => {
    // disable keyboard input for shop button
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
    }
  });

  clickableAreaShop.addEventListener("click", () => {
    // plays sound if clicked
    buttonclicksound();

    // event listener for shop button
    state.shopOpen === false ? (state.shopOpen = true) : (state.shopOpen = false);
    sidebarShop.classList.toggle("open");
    toggleSidebarBackdrop(sidebarBackdrop);
  });

  exportcsvbutton.addEventListener("click", () => {
    state.exportcsvPopupOpen === false
      ? (state.exportcsvPopupOpen = true)
      : (state.exportcsvPopupOpen = false);
    state.optionsOpen = false;
    sidebarOptions.classList.remove("open");
    // plays sound if clicked
    buttonclicksound();

    // toggle export csv popup
    exportcsvPopup.classList.toggle("open");
  });

  exportcsvButton.addEventListener("click", () => {
    // plays sound if clicked
    buttonclicksound();

    let csv = [];

    for (let key in state.statistics) {
      if (state.statistics.hasOwnProperty(key)) {
        csv.push(`${key}:${state.statistics[key]}`);
      }
    }
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.setAttribute("href", URL.createObjectURL(blob));
    link.setAttribute("download", "savegame.csv");
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log("export csv clicked");
    state.exportcsvPopupOpen = false;
    exportcsvPopup.classList.remove("open");
    toggleSidebarBackdrop(sidebarBackdrop);
  });

  closeExportPopup.addEventListener("click", () => {
    // plays sound if clicked
    buttonclicksound();
    state.exportcsvPopupOpen = false;
    exportcsvPopup.classList.remove("open");
    toggleSidebarBackdrop(sidebarBackdrop);
  });

  statisticsButton.addEventListener("click", () => {
    // plays sound if clicked
    buttonclicksound();

    state.statisticsOpen === false ? (state.statisticsOpen = true) : (state.statisticsOpen = false);
    statisticsWindow.classList.toggle("open");
    sidebarOptions.classList.remove("open");
    toggleSidebarBackdrop(sidebarBackdrop);

    statsContainer.innerHTML = `
    <dl>
    <dt>Total clicks: </dt>
    <dd>${state.statistics.total_clicks}</dd>
    <dt>Total currency: </dt>
    <dd>${state.statistics.total_currency}</dd>
    <dt>Total currency spent: </dt>
    <dd>${state.statistics.total_currency_spent}</dd>
    <dt>Total amount of upgrades bought: </dt>
    <dd>${state.statistics.total_upgrades_bought}</dd>
    </dl>`;
  });

  sidebarBackdrop.addEventListener("click", () => {
    // plays sound if backdrop clicked
    buttonclicksound();

    // if backdrop clicked, close everything
    state.shopOpen = false;
    state.optionsOpen = false;
    state.prestigeOpen = false;
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
    prestigeWindow.classList.remove("open");
    statisticsWindow.classList.remove("open");
    exportcsvPopup.classList.remove("open");
    resetPopup.classList.remove("open");
  });

  loadSave();
  loadUpgrades();
  updateCustomisation();
  updateDisplay();
  loadAchievements();

  checkAchievements();
  checkUpgradeAchievements();
  loadAchievements();
}

export function mainClickEvent() {
  state.currencyCounter += state.currencyPerClick;
  state.statistics.total_clicks++;
  state.statistics.total_currency += state.currencyPerClick;
  updateDisplay();
  checkAchievements(); // check achievements after click
  loadAchievements(); // load achievements after click
  saveGame(); //save game, this will have to move at some point
}

window.onload = init();
