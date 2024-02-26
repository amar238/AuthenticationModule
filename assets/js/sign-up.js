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
            showErrorAlert('First Name','Input field should contain only alphabates!');
            throw new Error();
        }
        if(!regexName.test(lastName)){
            showErrorAlert('Last Name','Input field should contain only alphabates!');
            throw new Error();
        }
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!regexEmail.test(email)){
            showErrorAlert('Invalid email id','Check your email again!');
            throw new Error();
        }
        // check password and confirm password matches
        if(password===""){
            showErrorAlert('Empty Passwords','Are you kidding?');
            throw new Error();
        }
        if(password !== confirmPassword){
            showErrorAlert('Confirm Passwords','Check your passwords; they do not match!');
            throw new Error();
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
                showSuccessAlert("Signed Up!",data.message);
                window.location.href = '/sign-in'; // Redirect to success page
            } else {
                showErrorAlert('Sign Up Failure',data.error);
                throw new Error();
            }
        })
        .catch((error) => {
            console.log(error);
        });
    });
});

function showSuccessAlert(title,message) {
    Swal.fire({
      title: title,
      text: message,
      icon: 'success', 
      confirmButtonText: 'OK',
    });
}

function showErrorAlert(title,error) {
    Swal.fire({
      title: title,
      text: error,
      icon: 'error', 
      confirmButtonText: 'OK',
    });
}