const cardsContainer = document.querySelector(".places__list");

function createCard({name, link}, deleteCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.setAttribute("src", link);
  cardImage.setAttribute("alt", name);

  cardElement.querySelector(".card__title").textContent = name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCard);

  return cardElement;
};

function deleteCard(evt) {
  const card = evt.currentTarget.closest(".card")
  card.remove();
};

initialCards.map(card => createCard(card, deleteCard)).forEach(card => cardsContainer.append(card));