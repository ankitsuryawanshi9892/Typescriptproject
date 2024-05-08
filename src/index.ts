const getUsername = document.querySelector('#user') as HTMLInputElement
const formSubmit = document.querySelector('#form') as HTMLFormElement;
const main_container = document.querySelector('.main-container') as HTMLElement;

// definition of contract of an object
interface UserData {
    id:number;
    login:string;
    avatar_url:string;
    url:string;
}

// reusable function

async function myCustomFetcher<T>(url:string,options?:RequestInit):Promise<T>{
    const response = await fetch(url,options);
    if(!response.ok){
        throw new Error(`response was not ok - status: ${response.status}`)
    };
    const data = await response.json()
    // console.log(data)
    return data
}

const showResultUI = (user:UserData) =>{
    console.log(user)
    main_container.insertAdjacentHTML("beforeend",`<div class='card'>
    <img src ="${user.avatar_url}" alt = ${user.login}/>
    <hr/>
    <div class="card-footer">
        <img src = "${user.avatar_url}" alt=${user.login}/>
        <a href="${user.url}">Github</a>
    </div>
    </div>`)
}

function fetchUserData(url:string){
    myCustomFetcher<UserData[]>(url,{}).then((userInfo)=>{
        for(const user of userInfo){
            showResultUI(user);
        }
    })
}
fetchUserData('https://api.github.com/users');


// Search Functionality
formSubmit.addEventListener('submit',async (e)=>{
    e.preventDefault();
    const searchTerm = getUsername.value.toLocaleLowerCase();
    try{
        const url = 'https://api.github.com/users';
        const allUserData = await myCustomFetcher<UserData[]>(url,{})
        const matching = allUserData.filter((user)=>{
            return user.login.toLocaleLowerCase().includes(searchTerm);

        })

        main_container.innerHTML = '';

        if(matching.length===0){
            main_container.insertAdjacentHTML(
                'beforeend',
                '<p class= "empty-msg">No matching users found.</p>'
            );
        }else{
            for(const singleUser of matching){
                showResultUI(singleUser);
            }
        }
    }catch(error){

    }
})

