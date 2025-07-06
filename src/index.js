import './pages/index.css';
import { createCard, likeCard, handleLikeCounter, deleteCard } from './components/card.js';
import { openModal, closeModal  } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getInitialUser, getInitialCards, UserProfilePatch, CardPost, putCardLikes, deleteCardLikes, deleteCardFetch, updateAvatarPatch } from './components/api.js'

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
const cardsContainer = document.querySelector(".places__list");

const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector('.popup_type_edit');
const editForm = editPopup.querySelector(".popup__form");
const editName = editPopup.querySelector(".popup__input_type_name");
const editDescription = editPopup.querySelector(".popup__input_type_description");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");
const profileImagePopup = document.querySelector(".popup_type_avatar");

const addButton = document.querySelector(".profile__add-button");
const addPopup = document.querySelector(".popup_type_new-card");
const addForm = addPopup.querySelector(".popup__form");
const addName = addPopup.querySelector(".popup__input_type_card-name");
const addUrl = addPopup.querySelector(".popup__input_type_url");

const popups = document.querySelectorAll(".popup");

const popupImage = document.querySelector(".popup_type_image");
const popupImageElement = popupImage.querySelector(".popup__image");
const popupCaption = popupImage.querySelector(".popup__caption");

const avatarPopup = document.querySelector(".popup_type_avatar");
const profileImageForm = avatarPopup.querySelector(".popup__form");
const url = profileImageForm.querySelector(".popup__input_type_url");

let userId


function renderButton(form, text) {
  const submitButton = form.querySelector(".popup__button");
  submitButton.textContent = text;
}

//Открытие модального окна изображения карточки
function handleImageClick(evt) {
  popupImageElement.alt = evt.target.alt;
  popupImageElement.src = evt.target.src;
  popupCaption.textContent = evt.target.alt;
  openModal(popupImage);
};

//Редактирование имени и информации о себе
function renderUser(user) {
  profileTitle.textContent = user.name;
  profileDescription.textContent = user.about;
}

function openEditForm() {
  editName.value = profileTitle.textContent;
  editDescription.value = profileDescription.textContent;
  clearValidation(editForm, validationConfig);
  openModal(editPopup);
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  const user = {};
  user.name = editName.value;
  user.about = editDescription.value;
  renderButton(editForm, "Сохранение...");
  UserProfilePatch(user)
    .then((user) => {
      renderUser(user);
      closeModal(editPopup)
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
        renderButton(editForm, "Сохранить");
      });
};

editButton.addEventListener("click", openEditForm);
editForm.addEventListener("submit", handleEditFormSubmit);

//Добавление и удаление карточки
function openAddForm() {
  addForm.reset();
  clearValidation(addForm, validationConfig);
  openModal(addPopup)
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const card = {};
  card.name = addName.value;
  card.link = addUrl.value;
  renderButton(addForm, "Сохранение...");
  CardPost(card)
    .then((card) => {
      cardsContainer.prepend(createCard(card, userId, handleImageClick, handleCardLike, handleDeleteCard));
      closeModal(addPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderButton(addForm, "Сохранить");
    });
};

function handleDeleteCard(element, cardId) {
  deleteCardFetch(cardId)
    .then(() => {
      deleteCard(element)
    })
}

addButton.addEventListener("click", openAddForm);
addForm.addEventListener("submit", handleAddFormSubmit);


//Перебор массива с модалками и навешивание слушателя
//на каждый оверлей и кнопку закрытия 

popups.forEach((popup) => {
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

function submitForm(evt) {
  evt.preventDefault();
  const user = {};
  user.avatar = url.value;
  renderButton(profileImageForm, "Сохранение...");
  updateAvatarPatch(user)
    .then((user) => {
      renderProfileImage(user);
      closeModal(profileImagePopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
        renderButton(profileImageForm, "Сохранить");
    });
}

profileImage.addEventListener("click", openProfileImageForm);

profileImagePopup.addEventListener("submit", submitForm);

Promise.all([getInitialUser(), getInitialCards()])
  .then(([user, cards]) => {
    userId = user._id;
    renderUser(user);
    renderProfileImage(user);
    cards.forEach(card => cardsContainer.append(createCard(card, userId, handleImageClick, handleCardLike, handleDeleteCard)));
})

enableValidation(validationConfig);