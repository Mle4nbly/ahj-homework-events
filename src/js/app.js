import Field from "../components/field-widget/field.js";
import Headers from "../components/headers-widget/headers.js";

const headers = new Headers(".headers");
const field = new Field(
  ".field",
  headers.increaseHits,
  headers.reduceLives,
  headers.loseNotification,
);

