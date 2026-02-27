//Sign Up Form

let register = async (event) => {
  event.preventDefault();
  //   console.log("Event Form");
  let form = event.target;
  const name = form.fullName.value.trim();
  //   console.log(name);
  const email = form.email.value.trim();
  const password = form.password.value.trim();
  //   console.log(password);

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const passError = document.getElementById("passError");
  const userRegister = document.getElementById("userRegister");

  nameError.textContent = "";
  emailError.textContent = "";
  passError.textContent = "";
  userRegister.textContent = "";

  const passwordRegx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|in)$/;
  let isValid = true;

  if (name.length < 3) {
    nameError.textContent = "Name must be greater than 3 characters";
    isValid = false;
  }
  if (!emailRegex.test(email)) {
    emailError.textContent =
      "Email id must be includes @ and ends with .com / .in";
    isValid = false;
  }
  if (!passwordRegx.test(password)) {
    passError.textContent =
      "Password must be 8 char and includes Cap & Small letter, one number and one special char";
    isValid = false;
  }
  const errormsg = document.querySelectorAll(".errormsg");
  errormsg.forEach((cntn) => {
    cntn.style.display = cntn.textContent.trim() === "" ? "none" : "block";
  });

  if (!isValid) return;

  try {
    const registerAPI = await fetch(
      "https://authenticationapi-p7aa.onrender.com/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      },
    );

    const data = await registerAPI.json();
    console.log("Register APi", registerAPI);
    console.log("Data", data);

    if (registerAPI?.status === 201) {
      userRegister.textContent = data.message;
      userRegister.style.display = "block";
      form.reset();
      setTimeout(() => {
        container.classList.toggle("right-panel-active");
        overlayBtn.classList.remove("btnScaled");
        window.requestAnimationFrame(() => {
          overlayBtn.classList.add("btnScaled");
        });
      }, 1000);
    } else {
      userRegister.textContent = data.message;
      userRegister.style.display = "block";
    }
  } catch (error) {
    console.log(error);
  }
};

let login = async (event) => {
  event.preventDefault();
  let form = event.target;
  const email = form.email.value.trim();
  const password = form.password.value.trim();

  const emailError = document.getElementById("loginEmail");
  const passError = document.getElementById("loginPass");
  const userLogin = document.getElementById("userLogin");

  emailError.textContent = "";
  passError.textContent = "";
  userLogin.textContent = "";
  let isValid = true;

  if (!email) {
    emailError.textContent = "Email should not empty";
    isValid = false;
  }
  if (!password) {
    passError.textContent = "Password should not empty";
    isValid = false;
  }

  const errormsg = document.querySelectorAll(".errormsg");
  errormsg.forEach((cntn) => {
    cntn.style.display = cntn.textContent.trim() === "" ? "none" : "block";
  });

  if (!isValid) return;

  try {
    const loginAPI = await fetch(
      "https://authenticationapi-p7aa.onrender.com/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      },
    );

    const data = await loginAPI.json();
    console.log("loginAPI", loginAPI);
    console.log("data", data.message);

    if (!loginAPI.ok) {
      userLogin.textContent = data.message;
      userLogin.style.display = "block";
      console.log("error", data);
      return;
    }

    if (loginAPI.status === 200) {
      userLogin.textContent = data.message;
      userLogin.style.display = "block";
      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.user);
      form.reset();
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1000);
    } else {
      userLogin.textContent = data.message;
      userLogin.style.display = "block";
    }
  } catch (error) {
    console.log(error);
  }
};

const token = localStorage.getItem("token");
const user = localStorage.getItem("userName");

setInterval(() => {
  if (token && user) {
    window.location.href = "dashboard.html";
  }
}, 1000);
