// validate recaptcha and submit userdata to server
function onClick(e) {
    e.preventDefault();
    grecaptcha.ready(function () {
        grecaptcha.execute('6LcoRYEpAAAAAGsame5vBlmyHlrcNJSJRNbc6n45', { action: 'submit' }).then(function (token) {
            //Gather data and validate it
            const firstName = document.getElementById('first-name').value;
            const lastName = document.getElementById('last-name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            // client side validation for firstName, lastName and Email
            const regexName = /^[a-zA-Z]+$/;
            if (!regexName.test(firstName)) {
                showErrorAlert('First Name', 'Input field should contain only alphabates!');
                throw new Error();
            }
            if (!regexName.test(lastName)) {
                showErrorAlert('Last Name', 'Input field should contain only alphabates!');
                throw new Error();
            }
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexEmail.test(email)) {
                showErrorAlert('Invalid email id', 'Check your email again!');
                throw new Error();
            }
            // check password and confirm password matches
            if (password === "") {
                showErrorAlert('Empty Passwords', 'Are you kidding?');
                throw new Error();
            }
            if (password !== confirmPassword) {
                showErrorAlert('Confirm Passwords', 'Check your passwords; they do not match!');
                throw new Error();
            }
            // create userdata object
            const userData = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                confirmPassword: confirmPassword,
                recaptchaToken: token
            };
            // Send the input data + recaptcha token to the server using an HTTP request
            fetch('/create-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // window.location.href = '/sign-in'; // Redirect to success page
                    showSuccessAlert("Signed Up!", data.message);
                } else {
                    showErrorAlert('Sign Up Failure', data.error);
                    throw new Error();
                }
            })
            .catch((error) => {
                console.log(error);
            });
        })
        .catch((error) => {
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
        footer: '<a href="/sign-in" class="bg-green-500 text-white py-2 px-4 rounded">Sign In</a>'
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


