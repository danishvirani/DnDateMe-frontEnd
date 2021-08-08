import React from 'react'
import axios from 'axios'

const NewUser = (props) => {

  const handleNewUserCreation = (event) => {
    event.preventDefault()
      axios.post(
        'https://dndateme-backend.herokuapp.com/users',
        {
          email:props.newStates.newEmail,
          password:props.newStates.newPassword,
          firstName:props.newStates.newFirstName,
          lastName:props.newStates.newLastName,
          pronoun:props.newStates.newPronouns,
          faveClass:props.newStates.newFaveClass
        }
      ).then(props.getUsers())
      event.target.reset()
      props.clearFormStates()
  }

  return (
    <>
      <form onSubmit={handleNewUserCreation}>
        <label for="email">Email: </label>
        <input type="text" onChange={props.changeHandlers.emailChange}/><br/>
        <label for="password">Password: </label>
        <input type="text" onChange={props.changeHandlers.passwordChange}/><br/>
        <label for="firstname">First Name: </label>
        <input type="text" onChange={props.changeHandlers.firstChange}/><br/>
        <label for="lastname">Last Name: </label>
        <input type="text" onChange={props.changeHandlers.lastChange}/><br/>
        <label for="pronoun">Pronouns: </label>
        <input type="text" onChange={props.changeHandlers.pronounsChange}/><br/>
        <label for="profilepic">Profile Picture: </label>
        <input type="text" onChange={props.changeHandlers.picChange}/><br/>
        <label for="faveClass">Favorite Class: </label>
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
        <input type="submit" value="Sign Up"/>
      </form>
    </>
  )
}

export default NewUser
