
function createCard(
  card,
  userId,
  handleImageClick,
  handleCardLike,
  handleDeleteCard,
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardLikeCounter = cardElement.querySelector('.card__like-counter')

  cardImage.setAttribute("src", card.link);
  cardImage.setAttribute("alt", card.name);
  cardTitle.textContent = card.name;

  handleLikeCounter(cardLikeCounter, card.likes.length);

  if (userId != card.owner._id) {
    cardDeleteButton.remove();
  }

  let cardLiked = card.likes.some((like) => {
    return like._id === userId;
  });


  if (cardLiked) {
    likeCard(cardLikeButton);
  }
  

  cardLikeButton.addEventListener("click", function () {
    cardLiked = cardLikeButton.classList.contains("card__like-button_is-active");
    handleCardLike(cardLikeButton, cardLikeCounter, card._id, cardLiked)
  });
  
  cardImage.addEventListener("click", handleImageClick);

  cardDeleteButton.addEventListener("click", () => {
    handleDeleteCard(cardElement, card._id)
  })

  return cardElement;
};


function handleLikeCounter(element, value) {
  element.textContent = value;
}

function likeCard(element) {
  element.classList.toggle("card__like-button_is-active");
}

function deleteCard (element) {
  element.remove();
}

export { createCard, likeCard, handleLikeCounter, deleteCard };
