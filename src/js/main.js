import { Modal } from "bootstrap";

function createElement(tag = "div", classList, attrs) {
  const el = document.createElement(tag);
  if (classList) {
    el.classList.add(...classList);
  }
  if (attrs) {
    for (let name in attrs) {
      el.setAttribute(name, attrs[name]);
    }
  }
  return el;
}

function createCard(cardInfo, orderEventCb) {
  const cardWrap = createElement("div", [
    "col-md-6",
    "col-xl-4",
    "tariffs__card-body",
    "mt-2",
  ]);
  const body = createElement("div", [
    "tariffs__card",
    "card-tariff",
    "d-flex",
    "justify-content-between",
    "align-items-center",
    "flex-column",
  ]);
  const title = createElement("h6", [
    "card-tariff__title",
    "d-flex",
    "justify-content-between",
    "align-items-center",
    "text-uppercase",
    "fw-bold",
  ]);
  const titleLogo = createElement("img", ["card-tariff__title-icon", "me-1"], {
    "src": "img/tariffs/icon-card.svg",
    "alt": "BetVDS",
  });
  const table = createElement("table", ["card-tariff__table"]);

  const info = createElement("div", [
    "card-tariff__info",
    "text-center",
    "d-flex",
    "flex-column",
    "justify-content-between",
    "align-items-center",
  ]);
  const infoDate = createElement("span", ["card-tariff__info-date"]);
  const infoPrice = createElement("span", [
    "card-tariff__info-price",
    "d-blo",
    "fw-bold",
  ]);
  const orderButton = createElement(
    "button",
    [
      "card-tariff__button",
      "button",
      "d-flex",
      "justify-content-between",
      "align-items-center",
    ],
    { "data-bs-toggle": "modal", "data-bs-target": "#modal-payment" },
  );
  const orderButtonLogo = createElement(
    "img",
    ["card-tariff__button-icon", "me-1"],
    { "src": "img/tariffs/icon-btn-card.svg", "alt": "Buy" },
  );

  for (let cardDescr in cardInfo["descr"]) {
    const tableRow = createElement("tr", ["card-tariff__table-row"]);
    const tableCellInfo = createElement("td", [
      "card-tariff__table-cell",
      "card-tariff__table-info",
    ]);
    const tableCellValue = createElement("td", [
      "card-tariff__table-cell",
      "card-tariff__table-value",
      "fw-bold",
      "text-end",
    ]);
    tableCellInfo.textContent = cardInfo["descr"][cardDescr]["title"];
    tableCellValue.textContent = cardInfo["descr"][cardDescr]["value"];
    tableRow.append(tableCellInfo, tableCellValue);
    table.append(tableRow);
  }

  infoDate.textContent = `${cardInfo["price-info"]["days"]} днів`;
  infoPrice.textContent = `${cardInfo["price-info"]["price"]} грн`;

  orderButton.append(orderButtonLogo, "Замовити");
  orderButton.addEventListener("click", orderEventCb);
  info.append(infoDate, infoPrice);
  title.append(titleLogo, cardInfo["name"]);
  body.append(title, table, info, orderButton);
  cardWrap.append(body);

  return cardWrap;
}

function createOrder(event, orderName, price) {
  const modal = document.querySelector("#modal-payment");
  modal.querySelector(".popup__total-count").textContent = `${price} грн`;
  modal.querySelector("#order-name").value = orderName;
}

async function getInfoByServer(url, options = {}) {
  const response = await fetch(url, options);
  return await response.json();
}

const formCardsWrap = document.querySelector(".tariffs__card-body");
const cardsInfo = await getInfoByServer("data/cards.json");

cardsInfo.forEach((card) => {
  formCardsWrap.append(
    createCard(card, (e) =>
      createOrder(e, card["name"], card["price-info"]["price"]),
    ),
  );
});

const carousel = document.querySelector("#popup-carousel");
carousel.addEventListener("slid.bs.carousel", (e) => {
  const carousel = e.target;
  const activeRadio = carousel.querySelector(".active>input");
  activeRadio.checked = true;
});

function validateEmail(input) {
  const emailRegExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const constraint = new RegExp(emailRegExp);
  if (constraint.test(input.value)) {
    return true;
  }
  return false;
}

function validateMinMaxRange(input, min = 0, max = 5) {
  const range = {
    "min": min,
    "max": max,
  };
  if (input.hasAttribute("min") && input.hasAttribute("max")) {
    range.min = Number(input.getAttribute("min"));
    range.max = Number(input.getAttribute("max"));
  }

  if (input.value <= range.max && input.value >= range.min) {
    return true;
  }

  return false;
}

function validateRequired(input) {
  if (input.value) {
    return true;
  }

  return false;
}

const form = document.querySelector("#form-popup");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;
  const email = form.querySelector("#order-email");
  const count = form.querySelector("#order-count");
  const promo = form.querySelector("#order-promo");

  if (
    validateEmail(email) &&
    validateRequired(email) &&
    validateMinMaxRange(count) &&
    validateRequired(count) &&
    validateRequired(promo)
  ) {
    form.submit();
  }
});
