import Headers from "./headers.js";

let element;
let headers;

beforeEach(() => {
  element = document.createElement("div");
  element.className = "headers";
  element.innerHTML = `
    <div class="hit_counter">0</div>
    <div class="health_bar">
        <div class="point"></div>
        <div class="point"></div>
        <div class="point"></div>
        <div class="point"></div>
        <div class="point"></div>
    </div>`;
  document.body.appendChild(element);

  headers = new Headers(element);
});

test("Проверка создания экземляра со строковым типом element", () => {
  const headersStr = new Headers(".headers");
  expect(headersStr._element).toBe(element);
});

test("Проверка метода increaseHits", () => {
  expect(headers._element.textContent == 0).toBe(true);
  headers.increaseHits();
  expect(headers._element.textContent == 1).toBe(true);
});

test("Проверка метода reduceLives", () => {
  expect(
    element.querySelector(".point").classList.contains("point_active"),
  ).toBe(false);
  headers.reduceLives();
  expect(
    element.querySelector(".point").classList.contains("point_active"),
  ).toBe(true);
  headers.reduceLives();
});

test("Проверка метода loseNotification", () => {
  expect(
    element.querySelector(".hit_counter").textContent == "Вы проиграли",
  ).toBe(false);
  headers.loseNotification();
  expect(
    element.querySelector(".hit_counter").textContent == "Вы проиграли",
  ).toBe(true);
});
