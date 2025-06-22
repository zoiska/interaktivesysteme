import { achievements, upgradeAchievements } from "../achievements.js";
import { state } from "./config.js";
import { saveGame } from "./storage.js";

export function checkAchievements() {
  achievements.forEach((ach) => {
    if (!ach.achieved && state.statistics.total_clicks >= ach.condition) {
      ach.achieved = true;
    }
  });
}

export function checkUpgradeAchievements() {
  upgradeAchievements.forEach((ach, idx) => {
    const upgradeKeys = Object.keys(state.boughtUpgrades);
    const upgradeKey = upgradeKeys[idx];
    if (!ach.achieved && state.boughtUpgrades[upgradeKey] >= ach.condition) {
      ach.achieved = true;
    }
  });
}

export function loadAchievements() {
  const gridContainerAchievement = document.querySelector(".gridContainerAchievements");
  gridContainerAchievement.innerHTML = "";

  [...achievements, ...upgradeAchievements]
    //.filter((ach) => ach.achieved)
    .forEach((element) => {
      const achievementItem = document.createElement("div");
      achievementItem.className = "achievementItem";
      achievementItem.innerHTML = `
                <span class="name">${element.name}</span>
                <span class="desc">${element.description}</span>
                <span class="achT">Achieved: ${element.achieved}</span>`;
      if (element.achieved === false) {
        achievementItem.style.filter = "brightness(0.4)";
      }
      gridContainerAchievement.appendChild(achievementItem);

      saveAchStats(element);
    });
}

function saveAchStats(element) {
  if (state.achievements[element.id] === 0 && element.achieved === true) {
    state.achievements[element.id] = 1;
    state.statistics.total_achievements_earned++;
    saveGame();
  }
}
