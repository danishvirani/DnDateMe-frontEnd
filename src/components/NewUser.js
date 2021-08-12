import React from 'react'
import {useState} from 'react'
import axios from 'axios'

const NewUser = (props) => {

  let [errorMessage, setErrorMessage] = useState('')

  const handleNewUserCreation = (event) => {
    event.preventDefault()
    setErrorMessage(null)
    let pass = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    if (props.newStates.newPassword.match(pass)){
      axios.post(
        'https://dndateme-backend.herokuapp.com/users',
        {
          email:props.newStates.newEmail,
          password:props.newStates.newPassword,
          firstName:props.newStates.newFirstName,
          lastName:props.newStates.newLastName,
          pronouns:props.newStates.newPronouns,
          faveClass:props.newStates.newFaveClass,
          profileImg:props.newStates.newProfilePic || 'https://i.imgur.com/pIYMngN.png',
          aboutMe:props.newStates.newAboutMe
        }
    ).then((response) => {
        props.getUsers()
        props.setCurrentUser(response.data)
    })
      event.target.reset()
      props.clearFormStates()
      props.setCurrentPage('usersIndex')
    } else {
      setErrorMessage('Please Choose A Stronger Password')
    }
  }

  return (
    <>
      <form onSubmit={handleNewUserCreation}>
        <h1>Sign Up</h1>
        <label htmlFor="email">Email: </label>
        <input type="email" onChange={props.changeHandlers.emailChange}/>
        <label htmlFor="password">Password: </label>
        <input type="password" onChange={props.changeHandlers.passwordChange}/>
        <p>Password must be 7 to 15 characters which contain at least one numeric digit and a special character</p>
        <p>{errorMessage}</p>
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
        <input type="submit" value="Sign Up"/>
      </form>
    </
  )
}

export default NewUser
