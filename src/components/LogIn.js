import React, {useState} from 'react'
import axios from 'axios'

const LogIn = (props) => {
    let [logInEmail, setLogInEmail] = useState('')
    let [logInPassword, setLogInPassword] = useState('')

    const validateLogin = (e) => {
        e.preventDefault()
        axios
            .post('http://dndateme-backend.herokuapp.com/sessions',
            {
                email: logInEmail,
                password: logInPassword
            }).then((response) => {
                if (response.data.error){
                    console.log(response.data.error)
                } else {
                    props.setCurrentUser(response.data)
                    props.setCurrentPage('usersIndex')
                }
            })
    }

    const handleChangeEmail = (e) => {
        setLogInEmail(e.target.value)
    }

    const handleChangePassword = (e) => {
        setLogInPassword(e.target.value)
    }

    return (
        <>
        <form onSubmit={(e)=>validateLogin(e)}>
            <label htmlFor='email'>Email: </label>
            <input type='text' id='email' onChange={(e)=>handleChangeEmail(e)} />
            <label htmlFor='password'>Password: </label>
            <input type='password' id='password' onChange={(e)=>handleChangePassword(e)} />
            <input type='submit' value='Log In' />
        </form>
        </>
    )
}

export default LogIn
