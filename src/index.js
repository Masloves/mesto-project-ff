import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, deleteCard, handleCardLike } from './components/card.js';
import { openModal, closeModal  } from './components/modal.js';


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

initialCards.map(card => createCard(card, deleteCard, handleImageClick, handleCardLike)).forEach(card => cardsContainer.append(card));

editButton.addEventListener("click", () => {
  editName.value = profileTitle.textContent;
  editDescription.value = profileDescription.textContent;
  openModal(editPopup);
});

editForm.addEventListener("submit", handleEditFormSubmit);

addButton.addEventListener("click", () => {
  openModal(addPopup)
});

addForm.addEventListener("submit", handleAddFormSubmit);
//==============================================================

const formElement = document.querySelector('.popup__form');
// const formInput = formElement.querySelector('.popup__input');
// const formError = formElement.querySelector(`.${formInput.id}-error`);

// formInput.addEventListener('input', function (evt) {
//   // Выведем в консоль значение свойства validity.valid поля ввода, 
//   // на котором слушаем событие input
//   console.log(evt.target.validity.valid);
// });

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement);
  }
};

// Вызовем функцию isValid на каждый ввод символа
// formInput.addEventListener('input', isValid);

const setEventListeners = (formElement) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement)
    });
  });
}; 

const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  console.log(formList)
  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', () => {
      evt.preventDefault();
    })
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement);
  });
};

// Вызовем функцию
enableValidation();
