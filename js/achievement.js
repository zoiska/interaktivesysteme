import { achievements, upgradeAchievements } from "../achievements.js";
import { state } from "./config.js";

export function checkAchievements() {
    achievements.forEach((ach) => {
        // Beispiel: prüfe auf total_clicks, du kannst das für andere Bedingungen anpassen
        if (!ach.achieved && state.statistics.total_clicks >= ach.condition) {
            ach.achieved = true;
        }
    });
}

export function checkUpgradeAchievements() {
    upgradeAchievements.forEach((ach, idx) => {
        // Die Reihenfolge in upgradeAchievements muss der Reihenfolge in upgrade_definitions.js entsprechen!
        const upgradeKeys = Object.keys(state.boughtUpgrades);
        const upgradeKey = upgradeKeys[idx];
        if (!ach.achieved && state.boughtUpgrades[upgradeKey] >= ach.condition) {
            ach.achieved = true;
        }
    });
}

export function loadAchievements() {
    const gridContainerAchievement = document.querySelector(".gridContainerAchievements");
    gridContainerAchievement.innerHTML = ""; // clear before rendering

    [...achievements, ...upgradeAchievements]
        .filter((ach) => ach.achieved)
        .forEach((element) => {
            const achievementItem = document.createElement("div");
            achievementItem.className = "achievementItem";
            achievementItem.innerHTML = `
                <span class="name">${element.name}</span>
                <span class="desc">${element.description}</span>
                <span class="achT">Achieved: ${element.achieved}</span>`;
            gridContainerAchievement.appendChild(achievementItem);
        });
}