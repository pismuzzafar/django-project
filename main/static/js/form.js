const form = document.getElementById('memberForm');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const username = document.getElementById('username');
const successBanner = document.getElementById('successBanner');

const errors = {
    firstName: document.getElementById('errorFirstName'),
    lastName: document.getElementById('errorLastName'),
    username: document.getElementById('errorUsername'),
};

function clearError(input, errorEl) {
    input.classList.remove('error');
    errorEl.classList.remove('show');
}

[
    { input: firstName, error: errors.firstName },
    { input: lastName, error: errors.lastName },
    { input: username, error: errors.username },
].forEach(({ input, error }) => {
    input.addEventListener('input', () => clearError(input, error));
});

form.addEventListener('submit', (e) => {
    let isValid = true;

    [
        { input: firstName, error: errors.firstName },
        { input: lastName, error: errors.lastName },
        { input: username, error: errors.username },
    ].forEach(({ input, error }) => clearError(input, error));

    if (firstName.value.trim() === '') {
        firstName.classList.add('error');
        errors.firstName.classList.add('show');
        isValid = false;
    }

    if (lastName.value.trim() === '') {
        lastName.classList.add('error');
        errors.lastName.classList.add('show');
        isValid = false;
    }

    const usernameValue = username.value.trim();
    const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
    if (!usernameRegex.test(usernameValue)) {
        username.classList.add('error');
        errors.username.classList.add('show');
        isValid = false;
    }

    if (!isValid) {
        e.preventDefault();
        return;
    }

    successBanner.classList.add('show');
});