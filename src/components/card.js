import { putCardLikes, deleteCardLikes } from './api.js'

function createCard(
  card,
  userId,
  deleteCard,
  handleImageClick,
  handleCardLike
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardLikeCounter = cardElement.querySelector('.card__like-counter')

  cardImage.setAttribute("src", card.link);
  cardImage.setAttribute("alt", card.name);
  cardTitle.textContent = card.name;

  let numberOfLikes = card.likes.some(like => like._id === userId);

  if (numberOfLikes) {
    handleCardLike(likeButton);
  }

  deleteButton.addEventListener("click", deleteCard);
  
  // likeButton.addEventListener("click", handleCardLike);
  likeButton.addEventListener("click", () => {
    numberOfLikes = likeButton.classList.contains("card__like-button_is-active");
    handleCardLike(likeButton, cardLikeCounter, card._id, numberOfLikes)
  });
  
  cardImage.addEventListener("click", handleImageClick);

  hendleLikeCounter(cardLikeCounter, card.likes.length);

  return cardElement;
};

function deleteCard(evt) {
  const card = evt.currentTarget.closest(".card")
  card.remove();
};

function hendleLikeCounter(element, value) {
  element.textContent = value;
}

// function handleCardLike (evt) {
//   evt.target.classList.toggle("card__like-button_is-active");
// };

function handleCardLike(likeButton, cardLikeCounter, cardId, numberOfLikes) {
  if (!numberOfLikes) {
    putCardLikes(cardId)
      .then((card) => {
        likeCard(likeButton);
        hendleLikeCounter(cardLikeCounter, card.likes.length);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    deleteCardLikes(cardId)
      .then((card) => {
        likeCard(likeButton);
        hendleLikeCounter(cardLikeCounter, card.likes.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function likeCard(element) {
  element.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCard, handleCardLike };