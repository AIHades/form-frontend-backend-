const formElement = document.getElementById("requestForm");

console.log(formElement.elements);

const usersBoxElement = document.querySelector(".users-box");
const searchUserElement = document.getElementById("userSearch")


function createUser(className, user) {  
    let div = document.createElement("div");  
    div.className = className;  
    div.dataset.user = JSON.stringify(user);
    div.innerHTML = `
        <div class="user-avatar"><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><title>Assign-user-solid SVG Icon</title><circle cx="17.99" cy="10.36" r="6.81" fill="currentColor" class="clr-i-solid clr-i-solid-path-1"/><path fill="currentColor" d="M12 26.65a2.8 2.8 0 0 1 4.85-1.8L20.71 29l6.84-7.63A16.81 16.81 0 0 0 18 18.55A16.13 16.13 0 0 0 5.5 24a1 1 0 0 0-.2.61V30a2 2 0 0 0 1.94 2h8.57l-3.07-3.3a2.81 2.81 0 0 1-.74-2.05" class="clr-i-solid clr-i-solid-path-2"/><path fill="currentColor" d="M28.76 32a2 2 0 0 0 1.94-2v-3.76L25.57 32Z" class="clr-i-solid clr-i-solid-path-3"/><path fill="currentColor" d="M33.77 18.62a1 1 0 0 0-1.42.08l-11.62 13l-5.2-5.59a1 1 0 0 0-1.41-.11a1 1 0 0 0 0 1.42l6.68 7.2L33.84 20a1 1 0 0 0-.07-1.38" class="clr-i-solid clr-i-solid-path-4"/><path fill="none" d="M0 0h36v36H0z"/></svg></div>
        <div class="user-info">
            <div class="user-name">${user.surnameUser} ${user.nameUser}</div>
        </div>
    `;

    return div;  
};


const show_users = (users) => {
    usersBoxElement.querySelectorAll(".user-data").forEach(value => value.remove());

    users.forEach((user) => {
        usersBoxElement.appendChild(createUser("user-data", user));
    });
};


const get_users_data = async () => {
    const data = await fetch("http://localhost:8000/form");
    const GET_all_users = await data.json();
    show_users(GET_all_users);
};


const get_user_search = async (query) => {
    const search = await fetch(
        `http://localhost:8000/form/search?queryName=${encodeURIComponent(query)}`
    );
    const result = await search.json();
    show_users(result);
};


searchUserElement.addEventListener("input", async (event) => {
    const value = event.target.value;

    if (value.length > 0) {
        await get_user_search(value);
    } else {
        await get_users_data();
    }
});


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

    const POST_result = await response.json();
    console.log("Данные с сервера POST:", POST_result);
    alert("Форма успешно отправлена!");

    await get_users_data();
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


const modalContent = document.getElementById("modal-content");

usersBoxElement.addEventListener("click", (event) => {
    const userElement = event.target.closest('.user-data');

    if (!userElement) return;

    const user = JSON.parse(userElement.dataset.user);

    document.getElementById('my-modal').classList.add('open');

    modalContent.innerHTML = `
        <h2>${user.surnameUser} ${user.nameUser} ${user.patronymicUser}</h2>
        <h3>${user.latinSurname} ${user.latinName}</h3>
        <p>Менялась ли фамилия: ${user.isChangedSurnameBefore}</p>
        <p>Дата рождения: ${user.dayBirthday} ${user.monthBirthday} ${user.yearBirthday}</p>
        <p>Семейное положение: ${user.maritalStatus}</p>
        <p>Образование: ${user.education}</p>
        <p>Телефон: ${user.phoneNumber}</p>
        <p>Email: ${user.email}</p>
    `;
});


document.getElementById('close-my-modal-btn').addEventListener('click', () => {
    document.getElementById('my-modal').classList.remove('open');
});


document.querySelector('#my-modal .modal__box').addEventListener('click', () => {
    EventTarget._isClickWithinModal =true;
});


document.getElementById('my-modal').addEventListener('click', (event) => {
    if (event._isClickWithinModal) return;
    event.currentTarget.classList.remove('open');
});


document.addEventListener("DOMContentLoaded", get_users_data);