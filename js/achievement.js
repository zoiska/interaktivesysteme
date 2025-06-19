export function loadAchievements() {
    const achievementsg = achievements;
    const gridContainerAchievement = document.querySelector(".gridContainerAchievements");

    achievementsg.forEach((element) => {
        const achievementItem = document.createElement("div");
        achievementItem.className = "achievementItem";
        achievementItem.innerHTML = `
              <span class="name">${element.name}</span>
              <span class="desc">${element.description}</span>
              <span class="achT">Achieved: ${element.achieved}</span>`;
              gridContainerAchievement.appendChild(achievementItem);
            });
};