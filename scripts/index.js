// @todo: Темплейт карточки
// @todo: DOM узлы
// @todo: Функция создания карточки
// @todo: Функция удаления карточки
// @todo: Вывести карточки на страницу

const placesList = document.querySelector(".places__list");

function addCard({ name, link, alt }) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.setAttribute("src", link);
  cardImage.setAttribute("alt", alt);

  cardElement.querySelector(".card__title").textContent = name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCard);

  return cardElement;
};

function deleteCard() {
  const cards = this.parentElement;
  cards.remove();
};

initialCards.map(addCard).forEach(card => placesList.append(card));