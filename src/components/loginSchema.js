import * as yup from 'yup';



const LoginSchema = yup.object().shape({
    username: yup.string().trim().min(3,'The username must be at least 3 characters long').required('Username is a required field'),
    password: yup.string().required('You must type in a password').min(6,'Your password must be at least 6 characters long')
})

export default LoginSchema