import Field from "./field.js";

let element;
let field;
let hitHandler;
let missHandler;
let loseHandler;

beforeEach(() => {
  element = document.createElement("div");
  element.className = "field";
  document.body.appendChild(element);

  hitHandler = jest.fn();
  missHandler = jest.fn();
  loseHandler = jest.fn();
  field = new Field(element, hitHandler, missHandler, loseHandler);
});

afterEach(() => {
  field.clearInterval();
});

test("Проверка создания экземляра со строковым типом element", () => {
  const fieldStr = new Field(".field", hitHandler, missHandler, loseHandler);

  expect(fieldStr._element).toBe(element);
});

test("Проверка создания holes в renderField", () => {
  expect(element.querySelectorAll(".hole").length).toBe(16);
  expect(field._holes.length).toBe(16);
});

test("Проверка метода activateHole", () => {
  expect(field._holes[0].classList.contains("hole_active")).toBe(false);
  field.activateHole(0);
  expect(field._holes[0].classList.contains("hole_active")).toBe(true);
});

test("Проверка метода deacivateHole", () => {
  field.activateHole(0);
  expect(field._holes[0].classList.contains("hole_active")).toBe(true);

  field.deactivateHole(0);
  expect(field._holes[0].classList.contains("hole_active")).toBe(false);
});

test("Проверка срабатывания hitHandler", () => {
  field.activateHole(0);
  const event = new MouseEvent("click", {
    bubbles: true,
    cancelable: true,
    view: window,
  });

  field._holes[1].dispatchEvent(event);
  field._holes[0].dispatchEvent(event);

  expect(field._holes[0].classList.contains("hole_active")).toBe(false);
  expect(hitHandler).toHaveBeenCalled();
});

test("Проверка срабатывания missHandler и loseHandler", () => {
  jest.useFakeTimers();
  field.createInterval();

  for (let index = 0; index < 6; index++) {
    jest.advanceTimersByTime(1000);
  }

  expect(missHandler).toHaveBeenCalledTimes(5);
  expect(loseHandler).toHaveBeenCalled();
  jest.useRealTimers();
});

test("Проверка метода activateHole с несуществующей hole в аргументе", () => {
  expect(() => {
    field.activateHole(17);
  }).toThrow(Error);
});

test("Проверка метода deactivateHole с несуществующей hole в аргументе", () => {
  expect(() => {
    field.deactivateHole(17);
  }).toThrow(Error);
});
