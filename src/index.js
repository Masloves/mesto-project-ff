import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, deleteCard, handleCardLike } from './components/card.js';
import { openModal, closeModal  } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';

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

const addButton = document.querySelector(".profile__add-button");
const addPopup = document.querySelector(".popup_type_new-card");
const addForm = addPopup.querySelector(".popup__form");
const addName = addPopup.querySelector(".popup__input_type_card-name");
const addUrl = addPopup.querySelector(".popup__input_type_url");

const popups = document.querySelectorAll(".popup");

const popupImage = document.querySelector(".popup_type_image");
const popupImageElement = popupImage.querySelector(".popup__image");
const popupCaption = popupImage.querySelector(".popup__caption");

//Открытие модального окна изображения карточки

function handleImageClick(evt) {
  popupImageElement.alt = evt.target.alt;
  popupImageElement.src = evt.target.src;
  popupCaption.textContent = evt.target.alt;

  openModal(popupImage);
};

//Редактирование имени и информации о себе

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = editName.value;
  profileDescription.textContent = editDescription.value;
  closeModal(editPopup);
};

//Добавление карточки

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const card = {};
  card.name = addName.value;
  card.link = addUrl.value;
  cardsContainer.prepend(createCard(card, deleteCard, handleImageClick, handleCardLike));
  addForm.reset();
  closeModal(addPopup);
};

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

editButton.addEventListener("click", () => {
  editName.value = profileTitle.textContent;
  editDescription.value = profileDescription.textContent;
  clearValidation(editForm, validationConfig);
  openModal(editPopup);
});

editForm.addEventListener("submit", handleEditFormSubmit);

addButton.addEventListener("click", () => {
  addForm.reset();
  clearValidation(addForm, validationConfig);
  openModal(addPopup)
});

addForm.addEventListener("submit", handleAddFormSubmit);

initialCards.map(card => createCard(card, deleteCard, handleImageClick, handleCardLike)).forEach(card => cardsContainer.append(card));

enableValidation(validationConfig);
