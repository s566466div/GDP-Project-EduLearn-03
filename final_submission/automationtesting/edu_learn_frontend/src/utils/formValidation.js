export function validateName(name) {
    return name ? (name.length >= 3 ? '' : 'Name must be at least 3 characters long') : "Field cannot be left blank";
}

export function validateEmail(email) {
    // Use a regular expression or a validation library for more robust email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? '' : 'Invalid email format';
}

export function validatePassword(password) {
    // console.log(password)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password) ? '' : 'Password must be at least 8 characters long and contain at least one uppercase, one lowercase, one number, and one special character';
}

export function validatePasswordMatching(password, confirmPassword) {
    return password ? (password === confirmPassword ? '' : 'Password and Confirm Password do not match') : '';
}
