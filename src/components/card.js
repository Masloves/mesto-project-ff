
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
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardLikeCounter = cardElement.querySelector('.card__like-counter')

  cardImage.setAttribute("src", card.link);
  cardImage.setAttribute("alt", card.name);
  cardTitle.textContent = card.name;

  handleLikeCounter(cardLikeCounter, card.likes.length);

  if (userId != card.owner._id) {
    deleteButton.remove();
  }

  let cardLiked = card.likes.some((like) => {
    return like._id === userId;
  });


  if (cardLiked) {
    likeCard(likeButton);
  }
  

  likeButton.addEventListener("click", function () {
    cardLiked = likeButton.classList.contains("card__like-button_is-active");
    handleCardLike(likeButton, cardLikeCounter, card._id, cardLiked)
  });
  
  cardImage.addEventListener("click", handleImageClick);

  deleteButton.addEventListener("click", () => {
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
