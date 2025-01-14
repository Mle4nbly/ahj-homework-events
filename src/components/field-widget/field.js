// import "./field.css"

export default class Field {
  constructor(element, hitHandler, missHandler, loseHandler) {
    if (typeof element === "string") {
      element = document.querySelector(element);
    }

    this._hitHandler = hitHandler;
    this._missHandler = missHandler;
    this._loseHandler = loseHandler;

    this.holeClick = this.holeClick.bind(this);

    this._element = element;
    this._holes;
    this._missesCounter = 0;

    this.renderField();
    this._element.addEventListener("click", this.holeClick);
  }

  holeClick(event) {
    if (event.target.classList.contains("hole_active")) {
      this.deactivateHole(this._holes.indexOf(event.target));

      this._hitHandler();
    }
  }

  activateHole(index) {
    if (!this._holes[index]) {
      throw new Error("Такого элемента нет в массиве");
    }

    this._holes[index].classList.add("hole_active");
  }

  deactivateHole(index) {
    if (!this._holes[index]) {
      throw new Error("Такого элемента нет в массиве");
    }

    this._holes[index].classList.remove("hole_active");
  }

  createInterval() {
    let index;
    let lastIndex;

    if (this._interval) {
      clearInterval(this._interval);
    }

    this._interval = setInterval(() => {
      do {
        index = Math.floor(Math.random() * 16);
      } while (index === lastIndex);

      if (
        (lastIndex || lastIndex === 0) &&
        this._holes[lastIndex].classList.contains("hole_active")
      ) {
        this.deactivateHole(lastIndex);

        this._missHandler();
        this._missesCounter++;

        if (this._missesCounter === 5) {
          this._loseHandler();

          this.clearInterval();
        }
      }

      this.activateHole(index);
      lastIndex = index;
    }, 1000);
  }

  renderField() {
    for (let index = 0; index <= 15; index++) {
      let hole = document.createElement("div");
      hole.className = "hole";
      this._element.appendChild(hole);
    }

    this._holes = Array.from(this._element.querySelectorAll(".hole"));
    this.createInterval();
  }

  clearInterval() {
    clearInterval(this._interval);
    this._element.removeEventListener("click", this.holeClick);
  }
}
