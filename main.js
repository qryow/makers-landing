// Используем "const" для объявления переменных и "addEventListener" для прослушивания событий
const mainBtn = document.querySelector(".main_button");
const programmer_button = document.querySelector(".programmer_button");
const modal = document.querySelector(".modal");
const wrapper = document.querySelector(".wrapper");
const overlay = document.querySelector(".overlay");
const modalClose = document.querySelector(".modal_close_icon");
const defaultForm = document.querySelector(".discount_form");
const form = document.querySelector(".modal_form");
const programmerBtn = document.querySelector(".programmer_btn");
const modalButton = document.querySelector(".modal_button");

// Создаем функции для открытия и закрытия модального окна
const openModal = () => {
  modal.style.display = "flex";
  overlay.style.display = "block";
};

const closeModal = () => {
  modal.style.display = "none";
  overlay.style.display = "none";
};

// Назначаем обработчики событий
// mainBtn.addEventListener("click", openModal);
// programmerBtn.addEventListener("click", openModal);
// modalClose.addEventListener("click", closeModal);
// overlay.addEventListener("click", closeModal);

// Используем "const" для объявления URL_APP
const URL_APP =
  "https://script.google.com/macros/s/AKfycbxTir6LsQhBtLAflQ9A_OFb4W0n6t6M4AIPjcCRMMF_YYsxgiDxTgNDv9_vbcTkyCbLlg/exec";

// Обновляем атрибут "action" формы
// form.action = URL_APP;
defaultForm.action = URL_APP;

// Создаем функцию для проверки заполненности формы
function isFormFilled(details) {
  const { name, phone } = details;
  return name && phone;
}

// Создаем функцию для отправки данных
const sendData = async ev => {
  ev.preventDefault();
  const name = document.querySelector("[name=name]");
  const phone = document.querySelector("[name=phone]");
  const details = {
    name: name.value.trim(),
    phone: phone.value.trim(),
  };

  if (!isFormFilled(details)) return;

  const formBody = new URLSearchParams(details).toString();

  try {
    const response = await fetch(URL_APP, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      mode: "cors",
      body: formBody,
    });
    await response.json();
    // modalButton.innerText = "Diajukan";
  } catch (error) {
    console.error(error);
  }

  name.value = "";
  phone.value = "";
};

// Назначаем обработчики событий для отправки данных
defaultForm.addEventListener("submit", sendData);
