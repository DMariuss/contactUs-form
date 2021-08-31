//********************************************************************************************************************************************* */
//*************************************************** checking form validity on submit ******************************************************* */

// functie pt validarea input-ului text
const isEmpty = (value) => value == null || value === "";
// functie pt validarea emailului
const isEmail = (value) =>
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    value
  );
// functie ce adauga clasa error si modifica textul erorii
const setError = (errorData) => {
  // 🢣 selectez parintele fiecarui input
  const formControl = errorData.input.parentElement;
  const errorElement = formControl.querySelector("small");

  // 🢣 adaug mesaj in element
  errorElement.innerHTML = errorData.message;
  // 🢣 adaug clasa error 🢣 o alta varianta era sa folosesc .classList 🢣 .add(), .remove(), .contains(), .toggle()
  formControl.className = "form-control error";

  return false;
};
// functie ce adauga clasa success
const setSuccess = (input) => {
  const formControl = input.parentElement;

  formControl.className = "form-control success";
  return true;
};

// functie pt preluarea inputurilor 🢣 am creat-o dupa, pt a evita duplicarea codului din reset...
const getInputs = () => {
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const subject = document.getElementById("subject");
  const textarea = document.getElementById("textarea");

  return { name, email, subject, textarea };
};

const checkFormValidity = () => {
  // const name = document.getElementById("name");
  // const email = document.getElementById("email");
  // const subject = document.getElementById("subject");
  // const textarea = document.getElementById("textarea");
  const { name, email, subject, textarea } = getInputs();

  let nameIsValid;
  let emailIsValid;
  let subjectIsValid;
  let textareaIsValid;

  if (isEmpty(name.value.trim())) {
    nameIsValid = setError({ input: name, message: "Name must not be blank!" });
  } else {
    nameIsValid = setSuccess(name);
  }

  if (isEmpty(email.value.trim())) {
    emailIsValid = setError({
      input: email,
      message: "Email must not be blank",
    });
  } else if (!isEmail(email.value.trim())) {
    emailIsValid = setError({ input: email, message: "Email is invalid!" });
  } else {
    emailIsValid = setSuccess(email);
  }

  if (isEmpty(subject.value.trim())) {
    subjectIsValid = setError({
      input: subject,
      message: "Subject must not be blank!",
    });
  } else {
    subjectIsValid = setSuccess(subject);
  }
  if (isEmpty(textarea.value.trim())) {
    textareaIsValid = setError({
      input: textarea,
      message: "Message must not be blank!",
    });
  } else {
    textareaIsValid = setSuccess(textarea);
  }

  const formIsValid =
    nameIsValid && emailIsValid && subjectIsValid && textareaIsValid;

  return formIsValid;
};

// functie pt a deschide/inchide modalul
const changeModal = (option) => {
  const backdrop = document.querySelector(".backdrop");
  const modal = document.querySelector(".modal");

  switch (option) {
    case "OPEN":
      backdrop.setAttribute("open", "");
      modal.removeAttribute("close");
      modal.setAttribute("open", "");
      break;
    case "CLOSE":
      backdrop.removeAttribute("open");
      modal.removeAttribute("open");
      modal.setAttribute("close", "");
      break;
    default:
      return;
  }
};

// functie pt resetarea formularului
const resetForm = () => {
  const inputs = getInputs();

  //parcurg obiectul cu inputuri
  for (let key in inputs) {
    // si resetez valoarea lor
    inputs[key].value = "";
    // inlatur clasa 'success' de pe div-ul parinte 'form-control'
    inputs[key].parentElement.classList.remove("success");
  }
};

const form = document.querySelector("#contact-form");

// 🢣 event listener pe formular
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const formIsValid = checkFormValidity();

  if (!formIsValid) {
    console.log("Form is not valid!");
    return;
  }

  changeModal("OPEN");
});

const modalButton = document.getElementById("modal-action");

modalButton.addEventListener("click", (event) => {
  changeModal("CLOSE");

  // pot redirectiona catre alta pagina

  resetForm();
});

const backdropModal = document.querySelector(".backdrop");

backdropModal.addEventListener("click", (event) => {
  changeModal("CLOSE");

  //resetez formularul
  resetForm();
});
