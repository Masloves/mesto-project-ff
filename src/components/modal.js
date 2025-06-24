function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeByEsc);

  console.log('open');
};

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEsc);

  console.log('close');
};

function closeByEsc(evt) {
  const popupIsOpen = document.querySelector(".popup_is-opened");
  if (evt.key === 'Escape') {
    closeModal(popupIsOpen);
  }
};

export { openModal, closeModal };
