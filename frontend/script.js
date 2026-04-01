const formElement = document.getElementById("requestForm");

console.log(formElement.elements);

let POST_result = null;
let GET_result = null;

const usersBoxElement = document.querySelector(".users-box");

function createUser(className, textContent) {  
    let div = document.createElement("div");  
    div.className = className;  
    div.textContent = textContent;
    div.style.width = "500px";  
    div.style.height = "100px";  
    div.style.backgroundColor = "pink";  
    div.style.display = "flex";
    div.style.alignItems = "center";
    div.style.justifyContent = "center";
    return div;  
};


formElement.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!formElement.elements.agreement.checked){
        alert("Необходимо поставить галочку о подтверждении!");
        return null;
    };

    const formData = {
        surnameUser: formElement.elements.surnameUser.value,
        nameUser: formElement.elements.nameUser.value,
        isChangedSurnameBefore: formElement.elements.changedSurnameBefore.checked,
        patronymicUser: formElement.elements.patronymicUser.value,
        latinSurname: formElement.elements.latinSurnameUser.value,
        latinName: formElement.elements.latinNameUser.value,
        dayBirthday: parseInt(formElement.elements.day.value),
        monthBirthday: formElement.elements.month.value,
        yearBirthday: parseInt(formElement.elements.year.value),
        maritalStatus: formElement.elements.maritalStatus.value,
        education: formElement.elements.education.value,
        phoneNumber: formElement.elements.phone.value,
        email: formElement.elements.email.value,
    }


    const response = await fetch("http://localhost:8000/form", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

    if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
    }

    POST_result = await response.json();
    console.log("Данные с сервера POST:", POST_result);
    alert("Форма успешно отправлена!");


    const data = await fetch("http://localhost:8000/form", {
        method: "GET",
    });

    if (!data.ok) {
        throw new Error(`Ошибка: ${data.status}`);
    }

    GET_result = await data.json();
    console.log("Данные с сервера GET:", GET_result);

    usersBoxElement.innerHTML = ""; // чистка. Чтоб не дублировались данные


    GET_result.forEach((user) => {
        usersBoxElement.appendChild(createUser("user-data", user.nameUser + " " + user.surnameUser));
    });
});


const emailField = formElement.elements.email;
const emailError = document.getElementById("emailError");


emailField.addEventListener("blur", () => {
    if (!emailField.value.includes("@")){
        emailError.style.display = "block";
    } else {
        emailError.style.display = "none";
    };
});


const arrowElement = document.querySelector(".svg-icon-arrow");


arrowElement.addEventListener("click", () => {
    let toggle = usersBoxElement.classList.toggle("open");
    if (toggle){
        arrowElement.style.transform = "rotate(180deg)"
    }else{
        arrowElement.style.transform = "rotate(0deg)"
    }
});






// Данные с бэка
// users_data.users.forEach(user => {
//     addUser(user.name, user.email);
// });