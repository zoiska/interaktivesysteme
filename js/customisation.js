import { state } from "./config.js";

export function updateCustomisation() {
  const extraCurrency = document.querySelector("#extraCurrency");
  extraCurrency.innerHTML = `<img src="./emojisvg/ruby_E04F.svg">` + state.extraCurrency;
}
