const formElement = document.querySelector('.form');
const formInput = formElement.querySelector('.form__input');

formInput.addEventListener('input', function (evt) {
  // Выведем в консоль значение свойства validity.valid поля ввода, 
  // на котором слушаем событие input
  console.log(evt.target.validity.valid);
}); 