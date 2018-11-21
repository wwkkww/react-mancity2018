
export const Validate = (element) => {
    let status = [true, ''];

    //email validation
    if (element.validation.email) {
        const valid = /\S+@\S+\.\S+/.test(element.value);
        const message = `${!valid ? 'Please enter a valid email' : ''}`;
        status = !valid ? [valid, message] : status;
    }

    //text required validation
    if (element.validation.required) {
        const valid = element.value.trim() !== '';
        const message = `${!valid ? 'This field is required' : ''}`;
        status = !valid ? [valid, message] : status;
    }

    return status;
}