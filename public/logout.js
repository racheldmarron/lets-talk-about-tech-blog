async function logoutFormHandler(event){
    event.preventDefault();

    const response = await fetch('/api/user/logout', {
        method: 'POST'
    });
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Oops! User has failed to logout')
    }
}

let logoutElement = document.querySelector('#logout');

if(logoutElement) {
    logoutElement.addEventListener('click', logoutFormHandler);
}