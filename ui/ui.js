document.addEventListener("DOMContentLoaded", () => {
    const dropdownIcon = document.getElementById('dropdown-icon');
    const dropdownMenu = document.getElementById('dropdown-menu');

    if (dropdownIcon && dropdownMenu) {
        dropdownIcon.addEventListener('click', function () {
            dropdownMenu.classList.toggle('show');
        });
    }
});