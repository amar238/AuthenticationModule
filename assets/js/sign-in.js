function onClick(e) {
  e.preventDefault();
  grecaptcha.ready(function() {
    grecaptcha.execute('6LcoRYEpAAAAAGsame5vBlmyHlrcNJSJRNbc6n45', {action: 'submit'}).then(function(token) {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(email)) {
            showErrorAlert('Invalid email id', 'Check your email again!');
            throw new Error();
        }
        if (password === "") {
            showErrorAlert('Empty Passwords', 'Are you kidding?');
            throw new Error();
        }
        const userData = {
            email: email,
            password: password,
            recaptchaToken: token
        }
        fetch('/create-session',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => response.json())
        .then(data => {
            if(data.success){
                showSuccessAlert("Signed In!", data.message);
            }else{
                showErrorAlert('Sign In Failure', data.error);
                throw new Error();
            }
        }).catch((error) => {
            showErrorAlert('Sign In Failure', "Cheack your credientials and try again!");
            throw new Error();
        });
    }).catch((error) => {
        console.log(error);
    });
  });
}

function showSuccessAlert(title, message) {
    Swal.fire({
        title: title,
        text: message,
        icon: 'success',
        showConfirmButton: false,
        footer: '<a href="/" class="bg-green-500 text-white py-2 px-4 rounded">Proceed to Home</a>'
    });
}

function showErrorAlert(title, error) {
    Swal.fire({
        title: title,
        text: error,
        icon: 'error',
        confirmButtonText: 'OK',
    });
}
