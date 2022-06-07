async function loginFormHandler(event){
    event.preventDefault();
    const name = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({
            name,
            password
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Oops! Your login has failed')
    }
}

document.querySelector('#login-form').addEventListener('submit', loginFormHandler);