const allData = JSON.parse(data).data;
const doneList = document.querySelector(".doneList");
const milestonesList = document.querySelector(".milestones");

function loadMileStone() {
  const mileStones = document.querySelector(".milestones");

  mileStones.innerHTML = `${allData
    .map(function (milestone) {
      return `  <div class="milestone border-b" id="${milestone._id}">
        <div class="flex">
          <div class="checkbox" ><input type="checkbox" onclick="markMilestone(this, ${
            milestone._id
          })"/></div>
          <div onClick="openMileStone(this, ${milestone._id})">
            <p>
             ${milestone.name}
              <span><i class="fas fa-chevron-down"></i></span>
            </p>
          </div>
        </div>
        <div class="hidden_panel">
        ${milestone.modules
          .map(function (module) {
            return ` <div class="module border-b">
            <p>${module.name}</p>
          </div>`;
          })
          .join("")}
         
        </div>
      </div>`;
    })
    .join("")}`;
}

function openMileStone(mileStoneElement, id) {
  const currentElement = mileStoneElement.parentNode.nextElementSibling;
  const shownElement = document.querySelector(".show");
  const activeElement = document.querySelector(".active");

  if (activeElement && !mileStoneElement.classList.contains("active")) {
    activeElement.classList.remove("active");
  }

  mileStoneElement.classList.toggle("active");

  if (!currentElement.classList.contains("show") && shownElement) {
    shownElement.classList.remove("show");
  }

  currentElement.classList.toggle("show");

  showImage(id);
}

function showImage(id) {
  const mileStoneImg = document.querySelector(".milestoneImage");
  const title = document.querySelector(".title");
  const details = document.querySelector(".details");

  mileStoneImg.style.opacity = 0;
  mileStoneImg.src = allData[id].image;
  title.innerText = allData[id].name;
  details.innerText = allData[id].description;
}

const mileStoneImg = document.querySelector(".milestoneImage");
mileStoneImg.onload = function () {
  this.style.opacity = 1;
};

function markMilestone(checkbox, id) {
  const item = document.getElementById(id);

  if (checkbox.checked) {
    // mark as done
    milestonesList.removeChild(item);
    doneList.appendChild(item);
    item.classList.remove("milestone");
    item.classList.add("doneitem");

    // reload donelist
    reloadDoneList();
  } else {
    // back to main list
    doneList.removeChild(item);
    milestonesList.appendChild(item);
    item.classList.add("milestone");
    item.classList.remove("doneitem");

    // reload list
    reloadMilestone();
  }
}

function reloadMilestone() {
  const mileStoneItem = document.querySelectorAll(".milestone");
  const mileStoneArray = [...mileStoneItem];

  const sortedMilestoneArray = mileStoneArray.sort((item1, item2) => {
    return item1.id - item2.id;
  });

  sortedMilestoneArray.forEach((item) => {
    milestonesList.appendChild(item);
  });
}

function reloadDoneList() {
  const doneItem = document.querySelectorAll(".doneitem");
  const doneitemArray = [...doneItem];

  const sortedDoneItem = doneitemArray.sort((item1, item2) => {
    return item1.id - item2.id;
  });

  sortedDoneItem.forEach((item) => {
    doneList.appendChild(item);
  });
}

loadMileStone();
