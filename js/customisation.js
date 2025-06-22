import { state } from "./config.js";
import { injectRuby } from "./svgInjector.js";

export function updateCustomisation() {
  const rubycontainer = document.querySelector("#extraCurrency");
  rubycontainer.innerHTML = injectRuby();
  const extraCurrencyText = document.createElement("span");
  extraCurrencyText.className = "extraCurrencyText";
  extraCurrencyText.textContent = ` ${state.extraCurrency}`;
  extraCurrencyText.style.fontSize = "2rem";
  extraCurrencyText.style.fontWeight = "bold";
  extraCurrencyText.style.color = "#3ae616";
  extraCurrencyText.style.textAlign = "center";

  rubycontainer.appendChild(extraCurrencyText);
}

export function transformClicker() {
  const clickable = document.querySelector("#clickableArea");
  const clickable1 = document.querySelector("#clickableAreaHat");

  clickable.addEventListener("pointerdown", () => {
    clickable.style.transform = "scale(1.1)";
    clickable1.style.transform = "scale(1.1)";
  });

  clickable.addEventListener("pointerup", () => {
    clickable.style.transform = "scale(1)";
    clickable1.style.transform = "scale(1)";
  });

  clickable.addEventListener("pointerleave", () => {
    clickable.style.transform = "scale(1)";
    clickable1.style.transform = "scale(1)";
  });

  clickable1.addEventListener("pointerdown", () => {
    clickable.style.transform = "scale(1.1)";
    clickable1.style.transform = "scale(1.1)";
  });

  clickable1.addEventListener("pointerup", () => {
    clickable.style.transform = "scale(1)";
    clickable1.style.transform = "scale(1)";
  });

  clickable1.addEventListener("pointerleave", () => {
    clickable.style.transform = "scale(1)";
    clickable1.style.transform = "scale(1)";
  });
}
