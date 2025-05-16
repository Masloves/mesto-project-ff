const cardsContainer = document.querySelector(".places__list");

function createCard({ name, link, alt }, deleteCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.setAttribute("src", link);
  cardImage.setAttribute("alt", alt);

  cardElement.querySelector(".card__title").textContent = name;

  function deleteCard(evt) {
    const card = evt.currentTarget.closest(".card")
    card.remove();
  };

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCard);
  
  return cardElement;
};

initialCards.map(createCard).forEach(card => cardsContainer.append(card));