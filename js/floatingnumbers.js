import { state } from "./config.js";
import { injectRuby } from "./svgInjector.js";

const floatingContainer = document.querySelector(".floating-numbers-container");

export function floatingNumbers(event) {
  const floaty = document.createElement("div");
  floaty.className = "floaty";
  floaty.innerHTML = `+${state.currencyPerClick}`;
  floaty.style.opacity = "1";
  floaty.style.position = "fixed";
  floaty.style.left = `calc(${event.clientX}px + ${Math.random() * 50 - 25}px)`;
  floaty.style.top = `calc(${event.clientY}px - 60px)`;
  floaty.style.transform = `translateY(-${Math.random() * 50 + 25}px) translateX(-50%)`;
  floaty.style.color = "white";
  floaty.style.zIndex = "1000";
  floaty.style.fontSize = "1.rem";
  floaty.style.fontWeight = "bold";

  floaty.style.pointerEvents = "none";
  floatingContainer.appendChild(floaty);

  setTimeout(() => {
    floaty.style.transition = "opacity 0.5s ease-in-out";
    floaty.style.opacity = "0";
  }, 300);

  floaty.addEventListener("transitionend", () => {
    floaty.remove();
  });
}

export function floatingRuby(event, newExtraCurrency) {
  const floatyContainer = document.createElement("div");
  floatyContainer.className = "floatyContainer";
  floatyContainer.style.display = "flex";
  floatyContainer.style.alignItems = "center";
  floatyContainer.style.gap = "0.5rem";
  floatyContainer.style.opacity = "1";
  floatyContainer.style.position = "fixed";
  floatyContainer.style.left = `${event.clientX}px`;
  floatyContainer.style.top = `calc(${event.clientY}px - 60px)`;
  floatyContainer.style.transform = `translateY(-${Math.random() * 50 + 25}px) translateX(-50%)`;
  floatyContainer.style.fontSize = "1rem";
  floatyContainer.style.pointerEvents = "none";

  const rubyAmount = document.createElement("span");
  rubyAmount.className = "rubyAmount";
  rubyAmount.textContent = `+${newExtraCurrency}`;
  rubyAmount.style.color = "white";
  rubyAmount.style.fontWeight = "bold";

  const floatyRuby = document.createElement("div");
  floatyRuby.className = "floatyRuby";
  floatyRuby.innerHTML = `${injectRuby()}`;
  floatyRuby.style.height = "1.5rem";
  floatyRuby.style.width = "1.5rem";

  floatyContainer.appendChild(rubyAmount);
  floatyContainer.appendChild(floatyRuby);

  floatingContainer.appendChild(floatyContainer);

  setTimeout(() => {
    floatyContainer.style.transition = "opacity 0.5s ease-in-out";
    floatyContainer.style.opacity = "0";
  }, 300);

  floatyRuby.addEventListener("transitionend", () => {
    floatyContainer.remove();
  });
}
