//file for progressive enhancement form

console.log('hello world');

const form = document.getElementById('form');
const username = document.getElementById('voornaam');
const email = document.getElementById('email');
const password = document.getElementById('password');

form.addEventListener('submit', e => {
	e.preventDefault();
	
	checkInputs();
});

function checkInputs() {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    if(usernameValue === ""){
        setErrorFor(username, 'Voornaam moet worden ingevuld');
    }else {
        setSuccessFor(username);
    }
    if(emailValue === ""){
        setErrorFor(email, 'Email moet worden ingevuld');
    }else if (!isEmail(emailValue)) {
        setErrorFor(email, 'Email is niet valid')
    }else{
        setSuccessFor(email);
    }

    if(passwordValue === ""){
        setErrorFor(password, 'Wachtwoord moet worden ingevuld');
    }else {
        setSuccessFor(password);
    }


}