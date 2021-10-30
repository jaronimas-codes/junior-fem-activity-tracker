// Selectors

const dailyBtn = document.querySelector(".user__daily");
const weeklyBtn = document.querySelector(".user__weekly");
const monthlyBtn = document.querySelector(".user__monthly");
const activeContainer = document.querySelector(".user__duration");
const cardContainer = document.querySelector(".card__container");

let infoArray = [];

// CALL GLOBAL FETCH TO INITIALISE RENDERING
globalFetch();

// GET THE DATA FROM JSON FILE
async function globalFetch() {
  const res = await fetch("data.json");
  const data = await res.json();
  // CALL RENDER FUNCTION
  infoArray = data;
  renderData(infoArray);
}

function renderData(fetchedInfo) {
  fetchedInfo.forEach((item) => {
    createNewElement(
      item,
      "Last week",
      item.timeframes.weekly.current,
      item.timeframes.weekly.previous
    );
  });
}

function createNewElement(item, lastTime, current, previous) {
  const template = document.querySelector(".card-template");
  const templateClone = template.content.cloneNode(true);
  const card = templateClone.querySelector(".card");
  const cardClass = item.title.toLowerCase();
  card.classList.add(`card__${cardClass}`);
  const activity = templateClone.querySelector(".card__activity");
  activity.innerText = item.title;
  const currentHours = templateClone.querySelector(".card__hours");
  const previousHours = templateClone.querySelector(".card__last");
  currentHours.innerText = `${current}Hrs`;
  previousHours.innerText = `${lastTime} - ${previous}Hrs`;

  cardContainer.appendChild(templateClone);
}

activeContainer.addEventListener("click", (e) => {
  const parentElementAllChildren = e.target.closest(".user__duration").children;
  Array.from(parentElementAllChildren).forEach((children) =>
    children.classList.remove("active")
  );
  e.target.classList.add("active");

  if (e.target.matches(".user__daily")) {
    infoArray.forEach((item) => {
      createNewElement(
        item,
        "Yesterday",
        item.timeframes.daily.current,
        item.timeframes.daily.previous
      );
    });
  }

  if (e.target.matches(".user__weekly")) {
    infoArray.forEach((item) => {
      createNewElement(
        item,
        "Last week",
        item.timeframes.weekly.current,
        item.timeframes.weekly.previous
      );
    });
  }

  if (e.target.matches(".user__monthly")) {
    infoArray.forEach((item) => {
      createNewElement(
        item,
        "Last month",
        item.timeframes.monthly.current,
        item.timeframes.monthly.previous
      );
    });
  }
});
