
export const isValidEmail = (email:string) => {
    return email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
}

export const isValidPhoneNumber = (phoneNumber:string) => {
    return phoneNumber.match(/^(\+\d{1,2}\s?)?1?-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/);
}

