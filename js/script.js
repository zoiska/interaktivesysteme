import { state } from "./config.js";
import { saveGame, loadSave, resetProgress } from "./storage.js";
import { loadUpgrades } from "./upgrade.js";
import { updateDisplay, toggleSidebarBackdrop } from "./ui.js";
import {
  injectCustomisation,
  injectLadybug,
  injectOptions,
  injectPrestige,
  injectShop,
} from "./svgInjector.js";
import {standardvolume, unmuteMute} from "./audio.js";

function init() {
  injectLadybug();
  injectOptions();
  injectPrestige();
  injectCustomisation();
  injectShop();
  standardvolume();

  const clicker = document.querySelector("#clickableArea");
  const sidebarOptions = document.querySelector(".sidebarOptions");
  const sidebarShop = document.querySelector(".sidebarShop");
  const optionsToggle = document.querySelector(".optionsToggle");
  const shopToggle = document.querySelector(".shopToggle");
  const resetButton = document.querySelector(".resetButton");
  const sidebarBackdrop = document.querySelector(".sidebarBackdrop");
  const prestigeButton = document.querySelector(".prestigeButton");
  const prestigeWindow = document.querySelector(".prestigeWindow");
  const customisationButton = document.querySelector(".customisationButton");
  const customisationWindow = document.querySelector(".customisationWindow");
  const statisticsButton = document.querySelector(".statisticsButton");
  const statisticsWindow = document.querySelector(".statisticsWindow");
  const statsContainer = document.querySelector(".statsContainer");
  const unmuteMuteButton = document.querySelector(".unmuteMuteButton");

  clicker.addEventListener("click", () => {
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
    unmuteMute();
  });

  resetButton.addEventListener("click", () => {
    // reset button
    resetProgress();
    location.reload();
  });

  optionsToggle.addEventListener("keydown", (event) => {
    // disable keyboard input for options button
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
    }
  });

  clickableAreaOptions.addEventListener("click", () => {
    // event listener for options button
    state.optionsOpen === false ? (state.optionsOpen = true) : (state.optionsOpen = false);
    sidebarOptions.classList.toggle("open");
    toggleSidebarBackdrop(sidebarBackdrop);
  });

  prestigeButton.addEventListener("keydown", (event) => {
    // disable keyboard input for prestige button
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
    }
  });

  clickableAreaPrestige.addEventListener("click", () => {
    // event listener for prestige button
    state.prestigeOpen === false ? (state.prestigeOpen = true) : (state.prestigeOpen = false);
    prestigeWindow.classList.toggle("open");
    toggleSidebarBackdrop(sidebarBackdrop);
  });

  customisationButton.addEventListener("keydown", (event) => {
    // disable keyboard input for customisation button
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
    }
  });

  customisationButton.addEventListener("click", () => {
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
    // event listener for shop button
    state.shopOpen === false ? (state.shopOpen = true) : (state.shopOpen = false);
    sidebarShop.classList.toggle("open");
    toggleSidebarBackdrop(sidebarBackdrop);
  });

  statisticsButton.addEventListener("click", () => {
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
    // if backdrop clicked, close everything
    state.shopOpen = false;
    state.optionsOpen = false;
    state.prestigeOpen = false;
    state.customisationOpen = false;
    state.statisticsOpen = false;
    sidebarOptions.classList.remove("open");
    optionsToggle.classList.remove("open");
    sidebarShop.classList.remove("open");
    shopToggle.classList.remove("open");
    sidebarBackdrop.classList.remove("open");
    customisationWindow.classList.remove("open");
    prestigeWindow.classList.remove("open");
    statisticsWindow.classList.remove("open");
  });

  loadSave();
  loadUpgrades();

  updateDisplay();
}

function mainClickEvent() {
  state.currencyCounter += state.currencyPerClick;
  state.statistics.total_clicks++;
  state.statistics.total_currency += state.currencyPerClick;
  updateDisplay();
  saveGame(); //save game, this will have to move at some point
}

window.onload = init();
