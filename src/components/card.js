import { openModal } from './modal.js';


const popupImage = document.querySelector('.popup_type_image');
const popupImageElement = popupImage.querySelector('.popup__image');
const popupCaption = popupImage.querySelector('.popup__caption');

function createCard(
  card,
  deleteCard,
  handleImageClick
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.setAttribute("src", card.link);
  cardImage.setAttribute("alt", card.name);
  cardElement.querySelector(".card__title").textContent = card.name;

  deleteButton.addEventListener("click", deleteCard);
  
  cardImage.addEventListener("click", handleImageClick);

  return cardElement;
};

function deleteCard(evt) {
  const card = evt.currentTarget.closest(".card")
  card.remove();
};

function handleImageClick(evt) {
  const cardTitle = evt.target.alt;
  popupImageElement.src = evt.target.src;
  popupCaption.textContent = cardTitle;

  openModal(popupImage);
};

export { createCard, deleteCard, handleImageClick };