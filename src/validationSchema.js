export const LOGIN_TEST_VALIDATION_SCHEMA = {
    mobile: {
        required: true,
        name: "mobile",
        regex: /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/,
        errorText: "Please enter a valid mobile no."
    },
    password: {
        required: true,
        name: "password"
    }
}
