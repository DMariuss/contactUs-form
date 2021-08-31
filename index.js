//********************************************************************************************************************************************* */
//*************************************************** checking form validity on submit ******************************************************* */
const form = document.querySelector("#contact-form");

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
  // 🢣 adaug clasa error
  formControl.className = "form-control error";

  return false;
};
// functie ce adauga clasa success
const setSuccess = (input) => {
  const formControl = input.parentElement;

  formControl.className = "form-control success";
  return true;
};

const checkFormValidity = () => {
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const subject = document.getElementById("subject");
  const textarea = document.getElementById("textarea");

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

// 🢣 event listener pe formular
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const formIsValid = checkFormValidity();

  if (!formIsValid) {
    console.log("Form is not valid!");
  }

  const backdrop = document.querySelector(".backdrop");
  const modal = document.querySelector(".modal");
  backdrop.setAttribute("show", "");
  modal.removeAttribute("hide");
  modal.setAttribute("show", "");
});

const modalButton = document.getElementById("modal-action");

modalButton.addEventListener("click", (event) => {
  const backdrop = document.querySelector(".backdrop");
  const modal = document.querySelector(".modal");

  backdrop.removeAttribute("show");
  modal.removeAttribute("show");
  modal.setAttribute("hide", "");
});
