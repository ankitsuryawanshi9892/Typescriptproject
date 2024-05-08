"use strict";
const getUsername = document.querySelector('#user');
const formSubmit = document.querySelector('#form');
const main_container = document.querySelector('.main-container');
// reusable function
async function myCustomFetcher(url, options) {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`response was not ok - status: ${response.status}`);
    }
    ;
    const data = await response.json();
    // console.log(data)
    return data;
}
const showResultUI = (user) => {
    console.log(user);
    main_container.insertAdjacentHTML("beforeend", `<div class='card'>
    <img src ="${user.avatar_url}" alt = ${user.login}/>
    <hr/>
    <div class="card-footer">
        <img src = "${user.avatar_url}" alt=${user.login}/>
        <a href="${user.url}">Github</a>
    </div>
    </div>`);
};
function fetchUserData(url) {
    myCustomFetcher(url, {}).then((userInfo) => {
        for (const user of userInfo) {
            showResultUI(user);
        }
    });
}
fetchUserData('https://api.github.com/users');
// Search Functionality
formSubmit.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchTerm = getUsername.value.toLocaleLowerCase();
    try {
        const url = 'https://api.github.com/users';
        const allUserData = await myCustomFetcher(url, {});
        const matching = allUserData.filter((user) => {
            return user.login.toLocaleLowerCase().includes(searchTerm);
        });
        main_container.innerHTML = '';
        if (matching.length === 0) {
            main_container.insertAdjacentHTML('beforeend', '<p class= "empty-msg">No matching users found.</p>');
        }
        else {
            for (const singleUser of matching) {
                showResultUI(singleUser);
            }
        }
    }
    catch (error) {
    }
});
