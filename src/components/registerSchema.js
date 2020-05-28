import * as yup from 'yup';



const RegisterSchema = yup.object().shape({
    username: yup.string().trim().min(3,'The username must be at least 3 characters long').required('Username is a required field'),
    email: yup.string().trim().required('An email address is required').email('The email must be a valid email address'),
    password: yup.string().required('You must type in a password').min(6,'Your password must be at least 6 characters long')
})

export default RegisterSchema