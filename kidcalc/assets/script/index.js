const login_btn = document.getElementById("login-btn");
const name_input = document.getElementById("name-input");
const birth_input = document.getElementById("birth-input");
const theme_input = document.getElementById("theme-input");

login_btn.addEventListener("click", () => {
    const name = name_input.value;
    const birth = birth_input.value;
    const theme = theme_input.value;

    localStorage.setItem("theme", theme);

    location.href = "assets/page/kidcalc.html";
});