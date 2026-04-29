function toggleTheme() {
    const body = document.body;
    const btn = document.getElementById('themeToggleBtn');
    const navbar = document.querySelector('.navbar');
    const text = btn.querySelector('.theme-text');
    const icon = btn.querySelector('.theme-icon');

    body.classList.toggle('light-mode');

    if (body.classList.contains('light-mode')) {

        text.textContent = "LIGHT MODE";
        icon.textContent = "☀️";

        navbar.classList.remove('navbar-dark', 'bg-dark');
        navbar.classList.add('navbar-light', 'bg-light');

    } else {

        text.textContent = "DARK MODE";
        icon.textContent = "🌙";

        navbar.classList.remove('navbar-light', 'bg-light');
        navbar.classList.add('navbar-dark', 'bg-dark');
    }
}

// ✅ 인라인 대신 리스너 사용
document.addEventListener("DOMContentLoaded", function () {

    const themeBtn = document.getElementById("themeToggleBtn");

    themeBtn.addEventListener("click", toggleTheme);

});