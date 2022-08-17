const activities = ["eat", "sleep", "pray", "walk"];

const app = {
  pageTitle: document.querySelector(".page-title"),
  total: document.querySelector(".activity-total"),
  tbody: document.querySelector("#activity-row"),
  resetButton: document.querySelector(".reset-button"),
  activityTotal: 0,
  activityCount: {},
  createAddButtons(buttonName) {
    let b = document.createElement("button");
    let textContent = document.createTextNode("Add");
    b.appendChild(textContent);
    b.setAttribute("class", "activity-add");
    b.dataset.id = buttonName;
    return b;
  },
  createRemoveButtons(buttonName) {
    let b = document.createElement("button");
    let textContent = document.createTextNode("Remove");
    b.appendChild(textContent);
    b.setAttribute("class", "activity-remove");
    b.dataset.id = buttonName;
    return b;
  },
  createRows(b) {
    for (let val of b) {
      let row = document.createElement("tr");
      row.setAttribute("id", val);
      this.tbody.appendChild(row);
      let columnKey = document.createElement("td");
      columnKey.textContent = val;
      row.appendChild(columnKey);
      let columnVal = document.createElement("td");
      columnVal.textContent = "";
      row.appendChild(columnVal);
      let columnAdd = document.createElement("td");
      let Addbutton = this.createAddButtons(val);
      columnAdd.appendChild(Addbutton);
      row.appendChild(columnAdd);
      let columnRemove = document.createElement("td");
      let removeButton = this.createRemoveButtons(val);
      columnRemove.appendChild(removeButton);
      row.appendChild(columnRemove);
    }
  },
  countTotal() {
    this.total.innerHTML = this.activityTotal;
  },
  addActivity(e) {
    let buttonId = e.target.dataset.id;
    this.activityCount[buttonId] = this.activityCount[buttonId] + 1 || 1;
    let rows = Array.from(this.tbody.childNodes);
    this.activityTotal += 1;
    rows.forEach((row) => {
      for (let key in this.activityCount) {
        if (key === row.id) {
          let countColumn = row.firstChild.nextSibling;
          countColumn.textContent = this.activityCount[key];
        }
      }
    });
    this.countTotal();
  },
  reset() {
    let rows = Array.from(this.tbody.childNodes);
    rows.forEach((row) => {
      let countColumn = row.firstChild.nextSibling;
      countColumn.textContent = "";
    });
    this.total.innerHTML = 0;
    this.activityCount = {};
  },
  init() {
    this.pageTitle.innerHTML = "Activity Tracker";
    this.createRows(activities);
    let button = document.querySelectorAll(".activity-add");
    this.total.innerHTML = 0;
    button.forEach((b) => {
      b.addEventListener("click", (e) => this.addActivity(e));
    });
    this.resetButton.addEventListener("click", () => this.reset());
  },
};

app.init();
