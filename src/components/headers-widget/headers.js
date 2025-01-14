// import "./headers.css"

export default class Headers {
  constructor(element) {
    if (typeof element === "string") {
      element = document.querySelector(element);
    }

    this.reduceLives = this.reduceLives.bind(this);
    this.increaseHits = this.increaseHits.bind(this);
    this.loseNotification = this.loseNotification.bind(this);

    this._element = element;
  }

  increaseHits() {
    this._element.querySelector(".hit_counter").textContent =
      Number(this._element.querySelector(".hit_counter").textContent) + 1;
  }

  reduceLives() {
    for (const point of this._element.querySelectorAll(".point")) {
      if (point.className == "point") {
        point.classList.add("point_active");

        break;
      }
    }
  }

  loseNotification() {
    this._element.querySelector(".hit_counter").textContent = "Вы проиграли";
  }
}
