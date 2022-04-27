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
const infoBox = document.querySelector('#info-box');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');

// Variables ///////////////////////////////////////////////////////////////////
let inn = '';

// Functions ///////////////////////////////////////////////////////////////////
const getUsers = () => JSON.parse(localStorage.users);
const saveUsers = (users) => localStorage.users = JSON.stringify(users);
const reportInfo = (msg, kind) => {
    infoBox.innerHTML = `<div class="info ${kind}">${msg}</div>`;
};
const reportSuccess = (msg) => { reportInfo(msg, 'success'); };
const reportError = (msg) => { reportInfo(msg, 'error'); };

const saveFormData = (e) => {

    e.preventDefault();
    infoBox.innerHTML = '';

    // Check validity
    let errors = '';
    errors += nameInput.checkValidity() ? '' : '<li>Need a name.</li>';
    errors += emailInput.checkValidity() ? '' : '<li>Need a valid email.</li>';
    errors += messageInput.checkValidity() ? '' : '<li>Need a message.</li>';

    if (!errors) {  // Valid input

        // I wanna use object initialization with shorthand property names,
        //  just beacuse
        const name = nameInput;
        const email = emailInput;
        const message = messageInput;

        // Save storage
        const users = getUsers();
        users[email] = { name, email, message };
        saveUsers(users);

        // Empty form
        document.querySelector('#user-form').reset();

        // Put users
        showUsersList();

        // Success info
        reportSuccess(`User successfully saved.`);

    } else {  // Invalid input
        reportError(`<ul>${errors}</ul>`);
    }
};

const showUsersList = () => {
    // Show users on DOM
    let inn = '';
    const users = getUsers()
    for (const userKey in users) {

        // OLD VERSION:
        // const user = users[userKey];
        // inn += '<li>';
        // inn += `<strong>${user.name}</strong>: ${user.email}<br>${user.message} `;
        // inn += `<button onclick="deleteUser('${userKey}')">Delete</button>`;
        // inn += '</li>';

        // Using destructuring, just because
        const { name, email, message } = users[userKey];
        inn += '<li>';
        inn += `<strong>${name}</strong>: ${email}<br>${message} `;
        inn += `<button onclick="deleteUser('${userKey}')">Delete User</button>`;
        inn += '</li>';
    }
    // Empty list warning:
    inn = !inn ? 'Empty users list' : `<ul>${inn}</ul>`;

    usersContainer.innerHTML = inn;
};

const deleteAllUsers = () => {
    localStorage.users = '{}';
    showUsersList();
    reportSuccess('All users successfully deleted.')
};

const deleteUser = (userKey) => {
    const users = getUsers();
    delete users[userKey];
    saveUsers(users);
    showUsersList();
    reportSuccess(`User ${userKey} successfully deleted.`);
};


// Listeners ///////////////////////////////////////////////////////////////////
submitBtn.addEventListener('click', saveFormData);


// Init ////////////////////////////////////////////////////////////////////////
showUsersList();
