import { state } from "./config.js";

export function saveGame() {
  localStorage.setItem("savedCurrentCurrency", state.currencyCounter);
  localStorage.setItem("savedCurrencyPerClick", state.currencyPerClick);
  localStorage.setItem("savedExtraCurrency", state.extraCurrency);
  localStorage.setItem("savedBoughtUpgrades", JSON.stringify(state.boughtUpgrades));
  localStorage.setItem("savedStatistics", JSON.stringify(state.statistics));
  localStorage.setItem("savedBoughtHats", JSON.stringify(state.boughtHats));
}

export function loadSave() {
  let rawSavedCurrency = localStorage.getItem("savedCurrentCurrency");
  if (rawSavedCurrency !== null) {
    state.currencyCounter = Number(rawSavedCurrency);
  }

  let rawSavedExtraCurrency = localStorage.getItem("savedExtraCurrency");
  if (rawSavedExtraCurrency !== null) {
    state.extraCurrency = Number(rawSavedExtraCurrency);
  }

  let rawSavedCurrencyPerClick = localStorage.getItem("savedCurrencyPerClick");
  if (rawSavedCurrencyPerClick !== null) {
    state.currencyPerClick = Number(rawSavedCurrencyPerClick);
  } else {
    state.currencyPerClick = 1; // default click is always 1
  }

  //save bought upgrades
  const savedUpgrades = localStorage.getItem("savedBoughtUpgrades");
  const parsedUpgrades = JSON.parse(savedUpgrades);

  if (parsedUpgrades !== null) {
    for (let key in state.boughtUpgrades) {
      // magic 😮
      if (parsedUpgrades.hasOwnProperty(key)) {
        state.boughtUpgrades[key] = parsedUpgrades[key];
      }
    }
  }

  //save bought hats
  const savedBoughtHats = localStorage.getItem("savedBoughtHats");
  const parsedBoughtHats = JSON.parse(savedBoughtHats);

  if (parsedBoughtHats !== null) {
    for (let key in state.boughtHats) {
      if (parsedBoughtHats.hasOwnProperty(key)) {
        state.boughtHats[key] = parsedBoughtHats[key];
      }
    }
  }

  //save stats
  const savedStatistics = localStorage.getItem("savedStatistics");
  const parsedStatistics = JSON.parse(savedStatistics);

  if (parsedStatistics !== null) {
    for (let key in state.statistics) {
      if (parsedStatistics.hasOwnProperty(key)) {
        state.statistics[key] = parsedStatistics[key];
      }
    }
  }
}

export function resetProgress() {
  localStorage.clear(); // delet everything
}
