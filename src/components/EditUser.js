import React from 'react'
import {useState} from 'react'
import axios from 'axios'

const EditUser = (props) => {

    let [newPassword1, setNewPassword1] = useState('')
    let [newPassword2, setNewPassword2] = useState('')
    let [errorMessage, setErrorMessage] = useState('')
    let [passwordMessage, setPasswordMessage] = useState('')

    const handleNewPassword1 = (event) => {
        setNewPassword1(event.target.value)
    }

    const handleNewPassword2 = (event) => {
        setNewPassword2(event.target.value)
    }

    const handleEditUser = (event, currentUser) => {
        event.preventDefault()
        axios
          .put(
            `https://dndateme-backend.herokuapp.com/users/${currentUser._id}`,
            {
              email: props.newStates.newEmail || currentUser.email,
              firstName: props.newStates.newFirstName || currentUser.firstName,
              lastName: props.newStates.newLastName || currentUser.lastName,
              pronouns: props.newStates.newPronouns || currentUser.pronouns,
              profileImg:props.newStates.newProfilePic || currentUser.profileImg,
              faveClass: props.newStates.newFaveClass || currentUser.faveClass,
              aboutMe: props.newStates.newAboutMe || currentUser.aboutMe
            }
        ).then((response) => {
            props.getUsers()
            props.getCurrentUser(response.data._id)
            props.setShowUser(response.data)
            props.setCurrentPage('showUser')
        })
        event.target.reset()
        props.clearFormStates()
    }

    const handlePasswordChange = (event, currentUser) => {
      setErrorMessage('')
      setPasswordMessage('')
      event.preventDefault()
      let pass = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
      if ( newPassword1.match(pass) ) {
        if ( newPassword1 === newPassword2 ) {
          axios
            .put(
              `https://dndateme-backend.herokuapp.com/users/${currentUser._id}`,
              {
                password: newPassword2
              }
            ).then(props.getUsers())
            event.target.reset()
            props.clearFormStates()
            setPasswordMessage('Password Succesfully Changed')
        } else {
          setErrorMessage('Passwords Do Not Match')
        }
      } else {
        setPasswordMessage('Password must be 7 to 15 characters which contain at least one numeric digit and a special character')
      }
    }

    const toggleChangePassword = () => {
      props.clearFormStates()
      document.querySelector('#passwordForm').classList.toggle('hidden')
    }

    return (
      <>
        <form onSubmit={(event) => {
            handleEditUser(event, props.currentUser)
        }}>
          <label htmlFor="email">Email: </label>
          <input type="email" onChange={props.changeHandlers.emailChange}/>
          <label htmlFor="firstname">First Name: </label>
          <input type="text" onChange={props.changeHandlers.firstChange}/>
          <label htmlFor="lastname">Last Name: </label>
          <input type="text" onChange={props.changeHandlers.lastChange}/>
          <label htmlFor="pronouns">Pronouns: </label>
          <input type="text" onChange={props.changeHandlers.pronounsChange}/>
          <label htmlFor="profilepic">Profile Picture: </label>
          <input type="text" onChange={props.changeHandlers.picChange}/>
          <label htmlFor="faveClass">Favorite Class: </label>
          <select onChange={props.changeHandlers.classChange}>
            <option value="Artificer">Artificer</option>
            <option value="Barbarian">Barbarian</option>
            <option value="Bard">Bard</option>
            <option value="Cleric">Cleric</option>
            <option value="Druid">Druid</option>
            <option value="Fighter">Fighter</option>
            <option value="Monk">Monk</option>
            <option value="Paladin">Paladin</option>
            <option value="Ranger">Ranger</option>
            <option value="Rogue">Rogue</option>
            <option value="Sorcerer">Sorcerer</option>
            <option value="Warlock">Warlock</option>
            <option value="Wizard">Wizard</option>
          </select>
          <label htmlFor="aboutMe">About Me: </label>
          <textarea onChange={props.changeHandlers.aboutMeChange}></textarea>
          <input type="submit" value="Update Profile"/>
        </form><br/>

        <button onClick={toggleChangePassword}>Change Password</button>
          <form className='hidden' id='passwordForm' onSubmit={(event) => handlePasswordChange(event, props.currentUser)}>
          <label htmlFor="password">Password: </label>
            <input type="password" onChange={handleNewPassword1}/>
            <label htmlFor="password">Confirm Password: </label>
            <input type="password" onChange={handleNewPassword2}/>
            <p>{passwordMessage}</p>
            <input type="submit" value="Update Password"/>
            {errorMessage && <p>{errorMessage}</p>}
          </form>

      </>
    )
}

export default EditUser
