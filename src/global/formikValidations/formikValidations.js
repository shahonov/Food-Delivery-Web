export const validateNonEmptyInputs = (values, names) => {
    const errors = {};
    for (const name of names) {
        if (values[name].toString().length === 0) {
            errors[name] = 'Required field';
        }
    }
    return errors;
}

export const validateNumberInputs = (values, names) => {
    const errors = {};
    for (const name of names) {
        if (isNaN(values[name])) {
            errors[name] = 'Expected number value';
        }
    }
    return errors;
}

export const validateEmailInputs = (values, names) => {
    const errors = {};
    const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    for (const name of names) {
        const isValidEmail = emailRegEx.test(String(values[name]).toLowerCase());
        if (!isValidEmail) {
            errors[name] = 'Not a valid email address';
        }
    }
    return errors;
}

export const validatePasswords = (values, names) => {
    const errors = {};
    const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
    for (const name of names) {
        if (!passwordRegEx.test(values[name])) {
            errors[name] = 'Should contain at least one lowercase, one upper case letter and a number';
        }
    }
    return errors;
}

export const validatePasswordsMatch = (values, names) => {
    const errors = {};
    let isMatch = true;
    let prev = '';
    for (const name of names) {
        if (!prev) {
            prev = values[name];
        } else {
            if (prev !== values[name]) {
                isMatch = false;
            }
        }
    }
    if (!isMatch) {
        for (const name of names) {
            errors[name] = 'Passwords does not match';
        }
    }
    return errors;
}

export const validateUnsplashUrls = (values, names) => {
    const errors = {};
    const unsplashRegex = /^(?:(?:https?:)\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/;
    for (const name of names) {
        if (!unsplashRegex.test(values[name])) {
            errors[name] = 'Invalid unsplash url';
        }
    }
    return errors;
}

export const validateInputsLengths = (values, names, minLength, maxLength) => {
    const errors = {};
    for (const name of names) {
        if ((minLength && values[name].length < minLength) || (maxLength && values[name].length > maxLength)) {
            errors[name] = `Minimum length: ${minLength}, Maximum length: ${maxLength}`;
        }
    }
    return errors;
}
