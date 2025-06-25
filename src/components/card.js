function createCard(
  card,
  deleteCard,
  handleImageClick,
  hendleCardLike
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.setAttribute("src", card.link);
  cardImage.setAttribute("alt", card.name);
  cardTitle.textContent = card.name;

  deleteButton.addEventListener("click", deleteCard);
  
  likeButton.addEventListener("click", hendleCardLike);
  
  cardImage.addEventListener("click", handleImageClick);

  return cardElement;
};

function deleteCard(evt) {
  const card = evt.currentTarget.closest(".card")
  card.remove();
};

function hendleCardLike (evt) {
  evt.target.classList.toggle("card__like-button_is-active");
};

export { createCard, deleteCard, hendleCardLike };