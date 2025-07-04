import { state } from "./config.js";
import { saveGame } from "./storage.js";
import { updateDisplay } from "./ui.js";
import { buysoundclick, buttonclicksound } from "./audio.js";
import { checkUpgradeAchievements, loadAchievements } from "./achievement.js";

/* This function loads bought upgrades from upgrade_definitions.json and dynamically
  adds them as buttons into the shop sidebar and hooks them up with purchase logic */
export function loadUpgrades() {
  const upgrades = upgrade_definitions;
  const sidebar = document.querySelector(".sidebarShop");

  upgrades.forEach((element) => {
    const shopButton = document.createElement("button");
    let cost = calculateCost(element);

    shopButton.className = "shopButton";
    shopButton.innerHTML = `
      <span class="name">${element.name}</span>
      <span class="desc">${element.description}</span>
      <span class="coin"><img src="./emojisvg/coin_1FA99.svg"></span>
      <span class="cost">${cost}</span>
      <span class="levelT">Level:</span>
      <span class="level">${state.boughtUpgrades[element.id]}</span>
      <span class="finger"><img src="./emojisvg/fingerpushing_E10C.svg"></span>
      <span class="fpc">${element.fpc}</span>`;

    shopButton.addEventListener("click", () => {
      // checks if user has enough currency
      if (state.currencyCounter >= cost) {
        // subtracts currency, adds upgrade level
        state.currencyCounter -= cost;
        state.currencyPerClick += element.fpc;
        state.boughtUpgrades[element.id]++;
        state.statistics.total_upgrades_bought++;
        state.statistics.total_currency_spent += cost;

        console.log(element.id + " clicked");

        checkUpgradeAchievements();
        loadAchievements();

        // localStorage behaves in a way i dont understand, saving and "reloading" is necessary after every change
        // may cause z-fighting style flickering, too bad!
        saveGame();
        updateDisplay();

        // if upgrade could be afforded, play a buy sound
        buysoundclick();

        cost = calculateCost(element);
        shopButton.querySelector(".cost").textContent = cost;
        shopButton.querySelector(".level").textContent = state.boughtUpgrades[element.id];
      } else {
        // if upgrade could not be afforded, play a button press sound
        buttonclicksound();
      }
    });

    sidebar.appendChild(shopButton);
  });
}

export function calculateCost(element) {
  return (
    element.base_cost *
    Math.round((state.boughtUpgrades[element.id] + 1) ** element.price_multiplier)
  );
}
