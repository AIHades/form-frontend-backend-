const formElement = document.getElementById("requestForm");

console.log(formElement.elements);


formElement.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!formElement.elements.agreement.checked){
        alert("Необходимо поставить галочку о подтверждении!");
        return null;
    };

    const formData = {
        surnameUser: formElement.elements.surnameUser.value,
        nameUser: formElement.elements.nameUser.value,
        isChangedSurnameBefore: formElement.elements.changedSurnameBefore.value,
        patronymicUser: formElement.elements.patronymicUser.value,
        latinSurname: formElement.elements.latinSurnameUser.value,
        latinName: formElement.elements.latinNameUser.value,
        dayBirthday: formElement.elements.day.value,
        monthBirthday: formElement.elements.month.value,
        yearBirthday: formElement.elements.year.value,
        maritalStatus: formElement.elements.maritalStatus.value,
        education: formElement.elements.education.value,
        phoneNumber: formElement.elements.phone.value,
        email: formElement.elements.email.value,
    }

    console.log(formData);
});


const emailField = formElement.elements.email;
const emailError = document.getElementById('emailError');


emailField.addEventListener('blur', () => {
    if (!emailField.value.includes('@')){
        emailError.style.display = 'block';
    } else {
        emailError.style.display = 'none';
    };
});