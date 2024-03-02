// gather data n send it to server manage response
function onClick(e) {
  e.preventDefault();
  const password = document.getElementById("new-password").value;
  const confirmPassword = document.getElementById("confirm-new-password").value;
  console.log(password);
  // check password and confirm password matches
  if (password === "") {
    showErrorAlert("Empty Passwords", "Are you kidding?");
    throw new Error();
  }
  if (password !== confirmPassword) {
    showErrorAlert(
      "Confirm Passwords",
      "Check your passwords; they do not match!"
    );
    throw new Error();
  }

  fetch("/change-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password: password }),
  })
    .then((response) => response.json())
    .then(async (data) => {
      if (data.success) {
        showSuccessAlert("Password Reset Successful", data.message);
      } else {
        showErrorAlert("Password Reset Failure", data.error);
        throw new Error();
      }
    })
    .catch((error) => {
      showErrorAlert(
        "Password Reset Failure",
        "Something went wrong! Try Again!"
      );
      throw new Error();
    });
}

function showSuccessAlert(title, message) {
  Swal.fire({
    title: title,
    text: message,
    icon: "success",
    showConfirmButton: false,
    footer:
      '<a href="/" class="bg-green-500 text-white py-2 px-4 rounded">Proceed to Home</a>',
  });
}

function showErrorAlert(title, error) {
  Swal.fire({
    title: title,
    text: error,
    icon: "error",
    confirmButtonText: "OK",
  });
}
