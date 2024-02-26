document.addEventListener('DOMContentLoaded', function () {
    // Get reference to the Sign Up button
    const signUpButton = document.getElementById('signUpButton');
    // Add click event listener to the Sign Up button
    signUpButton.addEventListener('click', function () {
        // Gather input data from form fields
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        // client side validation
        const regexName = /^[a-zA-Z]+$/;
        if(!regexName.test(firstName)){
            throw new Error('First Name should contain only alphabates');
        }
        if(!regexName.test(lastName)){
            throw new Error('Last Name should contain only alphabates');
        }
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!regexEmail.test(email)){
            throw new Error('Invalid email id');
        }
        // check password and confirm password matches
        if(password !== confirmPassword){
            throw new Error('Password does not matches');
        }
        // Construct an object with the input data
        const userData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        };
        // Send the input data to the server using an HTTP request
        fetch('/create-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => response.json())
        .then( data=> {
            if (data.success) {
                window.location.href = '/sign-in'; // Redirect to success page
            } else {
                throw new Error(data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});