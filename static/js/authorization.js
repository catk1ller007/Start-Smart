// async function getNickaname(userId) {
//   const idData = {
//     id: userId,
//   };

//   fetch("/set_nickname", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(idData),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log("Success:", data);
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// }


const btnReg = document.getElementById("btn-authorization");

btnReg.addEventListener("click", async () => {
  const email = document.getElementById("mail").value;
  const password = document.getElementById("password").value;

  if (email.length === 0 || password.length === 0) {
    alert("Заполните все поля!");
    return;
  }
  const data = {
    email: email,
    passwordUser: password,
  };

  try {
    const response = await fetch("/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      showSuccessAlert();
    } else if (response.status === 404) {
      showErrorAlert();
    }
  } catch (error) {
    alert(`Request failed: ${error.message}`);
  }

});

function showSuccessAlert() {
  Swal.fire({
    icon: "success",
    title: "Успех",
    text: "Добро пожаловать!",
    customClass: {
      confirmButton: "my-confirm-button",
    },
  }).then(() => {
    window.location.href = `/my_projects`;
  });
}

function showErrorAlert() {
  Swal.fire({
    icon: "error",
    title: "Ошибка",
    text: "Проверьте ваши данные еще раз",
    confirmButtonText: "ОК",
    customClass: {
      confirmButton: "my-error-button",
    },
  });
}
