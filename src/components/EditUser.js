import React from 'react'
import {useState} from 'react'
import axios from 'axios'

const EditUser = (props) => {

  let [newPassword1, setNewPassword1] = useState('')
  let [newPassword2, setNewPassword2] = useState('')
  let [errorMessage, setErrorMessage] = useState('')

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
          lastName: props.newStates.newLastName || currentUser.lastname,
          pronouns: props.newStates.newPronouns || currentUser.Pronouns,
          faveClass: props.newStates.faveClass || currentUser.faveClass
        }
      ).then(props.getUsers())
      event.target.reset()
      props.clearFormStates()
    }

    const handlePasswordChange = (event, currentUser) => {
      setErrorMessage('')
      event.preventDefault()
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
      } else {
        setErrorMessage('Passwords Do Not Match')
      }
    }

    const toggleChangePassword = () => {
      props.clearFormStates()
      document.querySelector('#passwordForm').classList.toggle('hidden')
    }

    return (
      <>
        <form onSubmit={(event) => handleEditUser(event, props.currentUser)}>
          <label htmlFor="email">Email: </label>
          <input type="text" onChange={props.changeHandlers.emailChange}/><br/>
          <label htmlFor="firstname">First Name: </label>
          <input type="text" onChange={props.changeHandlers.firstChange}/><br/>
          <label htmlFor="lastname">Last Name: </label>
          <input type="text" onChange={props.changeHandlers.lastChange}/><br/>
          <label htmlFor="pronouns">Pronouns: </label>
          <input type="text" onChange={props.changeHandlers.pronounsChange}/><br/>
          <label htmlFor="profilepic">Profile Picture: </label>
          <input type="text" onChange={props.changeHandlers.picChange}/><br/>
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
          <input type="submit" value="Update Profile"/>
        </form><br/>

        <button onClick={toggleChangePassword}>Change Password</button>
          <form className='hidden' id='passwordForm' onSubmit={(event) => handlePasswordChange(event, props.currentUser)}>
          <label htmlFor="password">Password: </label>
            <input type="text" onChange={handleNewPassword1}/><br/>
            <label htmlFor="password">Confirm Password: </label>
            <input type="text" onChange={handleNewPassword2}/><br/>
            <input type="submit" value="Update Password"/>
            <p>{errorMessage}</p>
          </form>

      </>
    )
}

export default EditUser
