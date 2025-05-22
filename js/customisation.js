import { state } from "./config.js";

export function updateCustomisation() {
  const extraCurrency = document.querySelector("#extraCurrency");
  extraCurrency.innerHTML = `<img src="./emojisvg/coin_1FA99.svg">` + state.extraCurrency;
}
