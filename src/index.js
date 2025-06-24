import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createCard } from './components/card.js';
import { deleteCard } from './components/card.js';
import { handleImageClick } from './components/card.js';
import { openModal, closeModal  } from './components/modal.js';

const cardsContainer = document.querySelector(".places__list");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_new-card');
const popups = document.querySelectorAll('.popup');


initialCards.map(card => createCard(card, deleteCard, handleImageClick)).forEach(card => cardsContainer.append(card));

editButton.addEventListener('click', () => {
  openModal(editPopup);
});

addButton.addEventListener('click', () => {
  openModal(addPopup)
});

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if(evt.target.classList.contains("popup__close")||
    evt.target.classList.contains("popup")) {
      closeModal(popup);
    }
  });
});