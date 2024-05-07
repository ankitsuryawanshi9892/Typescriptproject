const getUsername = document.querySelector('#user') as HTMLInputElement
const formSubmit = document.querySelector('.form') as HTMLFormElement;
const main_container = document.querySelector('.main-container') as HTMLElement;

// definition of contract of an object
interface UserData {
    id:number;
    login:string;
    avatar:string;
    url:string;
}