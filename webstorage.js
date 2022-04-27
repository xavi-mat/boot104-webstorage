'use strict';
/**
 * Web Storage exercise
 * by xavimat
 * 2022-04-27
 */

// Default users list in localStorage when empty
if (!localStorage.users) {
    localStorage.users = '{}';
}

// Constants ///////////////////////////////////////////////////////////////////
const submitBtn = document.querySelector('#saveData');
const usersContainer = document.querySelector('#users-container');
const errorBox = document.querySelector('#error-box');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');

// Variables ///////////////////////////////////////////////////////////////////
let inn = '';

// Functions ///////////////////////////////////////////////////////////////////
const getUsers = () => JSON.parse(localStorage.users);
const saveUsers = (users) => localStorage.users = JSON.stringify(users);

const saveFormData = (e) => {

    e.preventDefault();

    // Check validity
    let errors = '';
    errorBox.innerHTML = '';
    errors += nameInput.checkValidity() ? '' : '<li>Need a name.</li>'
    errors += emailInput.checkValidity() ? '' : '<li>Need a valid email.</li>'
    errors += messageInput.checkValidity() ? '' : '<li>Need a message.</li>'

    if (!errors) {  // Valid input
        // Save storage
        const users = getUsers();
        users[emailInput.value] = {
            name:nameInput.value,
            email:emailInput.value,
            message:messageInput.value
        };
        saveUsers(users);

        // Empty form
        document.querySelector('#user-form').reset();

        // Put users
        showUsersList();

    } else {  // Invalid input
        errors = `<ul class="error">${errors}</ul>`;
        errorBox.innerHTML = errors;
    }
};

const showUsersList = () => {
    // Show users on DOM
    let inn = '';
    const users = getUsers()
    for (const userKey in users) {
        const user = users[userKey];
        inn += '<li>';
        inn += `<strong>${user.name}</strong>: ${user.email}<br>${user.message} `;
        inn += `<button onclick="deleteUser('${userKey}')">Delete</button>`;
        inn += '</li>';
    }
    // Empty list warning:
    inn = !inn ? 'Empty users list' : `<ul>${inn}</ul>`;

    usersContainer.innerHTML = inn;
};

const deleteAllUsers = () => {
    localStorage.users = '{}';
    showUsersList();
};

const deleteUser = (userKey) => {
    const users = getUsers();
    delete users[userKey];
    saveUsers(users);
    showUsersList();
};


// Listeners ///////////////////////////////////////////////////////////////////
submitBtn.addEventListener('click', saveFormData);


// Init ////////////////////////////////////////////////////////////////////////
showUsersList();
