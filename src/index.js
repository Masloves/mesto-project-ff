import './pages/index.css';
import { createCard, likeCard, handleLikeCounter, deleteCard } from './components/card.js';
import { openModal, closeModal  } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getInitialUser, getInitialCards, userProfilePatch, cardPost, putCardLikes, deleteCardLikes, deleteCardFetch, updateAvatarPatch } from './components/api.js'

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
const cardsContainer = document.querySelector(".places__list");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditPopup = document.querySelector('.popup_type_edit');
const profileEditForm = profileEditPopup.querySelector(".popup__form");
const inputProfileName = profileEditPopup.querySelector(".popup__input_type_name");
const inputProfileDescription = profileEditPopup.querySelector(".popup__input_type_description");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");
const profileImagePopup = document.querySelector(".popup_type_avatar");

const newCardAddButton = document.querySelector(".profile__add-button");
const newCardAddPopup = document.querySelector(".popup_type_new-card");
const newCardAddForm = newCardAddPopup.querySelector(".popup__form");
const inputNameFormAddNewCard = newCardAddPopup.querySelector(".popup__input_type_card-name");
const inputUrlFormAddNewCard = newCardAddPopup.querySelector(".popup__input_type_url");

const popupsArray = document.querySelectorAll(".popup");

const popupImage = document.querySelector(".popup_type_image");
const popupImageElement = popupImage.querySelector(".popup__image");
const popupImageCaption = popupImage.querySelector(".popup__caption");

const avatarPopup = document.querySelector(".popup_type_avatar");
const profileImageForm = avatarPopup.querySelector(".popup__form");
const inputUrlFormAvatar = profileImageForm.querySelector(".popup__input_type_url");

let userId


function setSubmitButtonText(form, text) {
  const submitButton = form.querySelector(".popup__button");
  submitButton.textContent = text;
}

//Открытие модального окна изображения карточки
function handleImageClick(evt) {
  popupImageElement.alt = evt.target.alt;
  popupImageElement.src = evt.target.src;
  popupImageCaption.textContent = evt.target.alt;
  openModal(popupImage);
};

//Редактирование имени и информации о себе
function renderUser(user) {
  profileTitle.textContent = user.name;
  profileDescription.textContent = user.about;
}

function openProfileEditForm() {
  inputProfileName.value = profileTitle.textContent;
  inputProfileDescription.value = profileDescription.textContent;
  clearValidation(profileEditForm, validationConfig);
  openModal(profileEditPopup);
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  const user = {};
  user.name = inputProfileName.value;
  user.about = inputProfileDescription.value;
  setSubmitButtonText(profileEditForm, "Сохранение...");
  userProfilePatch(user)
    .then((user) => {
      renderUser(user);
      closeModal(profileEditPopup)
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setSubmitButtonText(profileEditForm, "Сохранить");
    });
};

profileEditButton.addEventListener("click", openProfileEditForm);
profileEditForm.addEventListener("submit", handleEditFormSubmit);

//Добавление и удаление карточки
function openNewCardAddForm() {
  newCardAddForm.reset();
  clearValidation(newCardAddForm, validationConfig);
  openModal(newCardAddPopup)
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const card = {};
  card.name = inputNameFormAddNewCard.value;
  card.link = inputUrlFormAddNewCard.value;
  setSubmitButtonText(newCardAddForm, "Сохранение...");
  cardPost(card)
    .then((card) => {
      cardsContainer.prepend(createCard(card, userId, handleImageClick, handleCardLike, handleDeleteCard));
      closeModal(newCardAddPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setSubmitButtonText(newCardAddForm, "Сохранить");
    });
};

function handleDeleteCard(element, cardId) {
  deleteCardFetch(cardId)
    .then(() => {
      deleteCard(element)
    })
    .catch((err) => {
      console.log(err);
    })
}

newCardAddButton.addEventListener("click", openNewCardAddForm);
newCardAddForm.addEventListener("submit", handleAddFormSubmit);


//Перебор массива с модалками и навешивание слушателя
//на каждый оверлей и кнопку закрытия 

popupsArray.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if(evt.target.classList.contains("popup__close")||
    evt.target.classList.contains("popup")) {
      closeModal(popup);
    }
  });
});


//Добавление и удаление лайка
function handleCardLike(likeButton, cardLikeCounter, cardId, cardLiked) {
  if (!cardLiked) {
    putCardLikes(cardId)
      .then((card) => {
        likeCard(likeButton);
        handleLikeCounter(cardLikeCounter, card.likes.length);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    deleteCardLikes(cardId)
      .then((card) => {
        likeCard(likeButton);
        handleLikeCounter(cardLikeCounter, card.likes.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

// Рендер и обновление аватара
function renderProfileImage(user) {
  profileImage.style = `background-image: url(${user.avatar})`;
}

function openProfileImageForm() {
    profileImageForm.reset();
    clearValidation(profileImageForm, validationConfig);
    openModal(profileImagePopup);
}

function submitProfileImageForm(evt) {
  evt.preventDefault();
  const user = {};
  user.avatar = inputUrlFormAvatar.value;
  setSubmitButtonText(profileImageForm, "Сохранение...");
  updateAvatarPatch(user)
    .then((user) => {
      renderProfileImage(user);
      closeModal(profileImagePopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setSubmitButtonText(profileImageForm, "Сохранить");
    });
}

profileImage.addEventListener("click", openProfileImageForm);

profileImagePopup.addEventListener("submit", submitProfileImageForm);

Promise.all([getInitialUser(), getInitialCards()])
  .then(([user, cards]) => {
    userId = user._id;
    renderUser(user);
    renderProfileImage(user);
    cards.forEach(card => cardsContainer.append(createCard(card, userId, handleImageClick, handleCardLike, handleDeleteCard)));
  })
  .catch((err) => {
    console.log(err);
  })
  
  enableValidation(validationConfig);