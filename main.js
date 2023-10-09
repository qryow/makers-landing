const mainBtn = document.querySelector(".main_button");
const programmer_button = document.querySelector(".programmer_button");
const modal = document.querySelector(".modal");
const wrapper = document.querySelector(".wrapper");
const overlay = document.querySelector(".overlay");
const modalClose = document.querySelector(".modal_close_icon");
const defaultForm = document.querySelector(".discount_form");
const form = document.querySelector(".modal_form");
const programmerBtn = document.querySelector(".programmer_btn");

const openBtn = () => {
  modal.style.display = "flex";
  overlay.style.display = "block";
};

const closeBtn = () => {
  modal.style.display = "none";
  overlay.style.display = "none";
};

mainBtn.addEventListener("click", openBtn);
programmerBtn.addEventListener("click", openBtn);

modalClose.addEventListener("click", closeBtn);
overlay.addEventListener("click", closeBtn);

const URL_APP =
  "https://script.google.com/macros/s/AKfycbxTir6LsQhBtLAflQ9A_OFb4W0n6t6M4AIPjcCRMMF_YYsxgiDxTgNDv9_vbcTkyCbLlg/exec";

// находим форму в документе

// указываем адрес отправки формы (нужно только в начале примера)
form.action = URL_APP;
defaultForm.action = URL_APP;

// вспомогательная функция проверки заполненности формы
function isFilled(details) {
  const { name, phone } = details;
  if (!name) return false;
  if (!phone) return false;
  return true;
}

const sendSheet = async ev => {
  // отменяем действие по умолчанию
  ev.preventDefault();

  // получаем ссылки на элементы формы
  const name = document.querySelector("[name=name]");
  const phone = document.querySelector("[name=phone]");

  // собираем данные из элементов формы
  let details = {
    name: name.value.trim(),
    phone: phone.value.trim(),
  };

  // если поля не заполнены - прекращаем обработку
  if (!isFilled(details)) return;

  // подготавливаем данные для отправки
  let formBody = [];
  for (let property in details) {
    // кодируем названия и значения параметров
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  // склеиваем параметры в одну строку
  formBody = formBody.join("&");

  // выполняем отправку данных в Google Apps
  const result = await fetch(URL_APP, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    //cors: "no-cors", <- это неправильно
    mode: "cors", //<- оставим по умолчанию
    body: formBody,
  })
    .then(res => res.json())
    .catch(err => alert("Ошибка!"));
  // .then((res) => console.log(res));

  console.log(result);
  name.value = "";
  phone.value = "";
};

form.addEventListener("submit", sendSheet);

defaultForm.addEventListener("submit", sendSheet);
