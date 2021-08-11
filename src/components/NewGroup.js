import React from 'react'
import {useState} from 'react'
import axios from 'axios'

const NewGroup = (props) => {

  let [newName, setNewName] = useState('')
  let [newLocation, setNewLocation] = useState('')
  let [newImage, setNewImage] = useState('')

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }
  const handleNewImage = (event) => {
    setNewImage(event.target.value)
  }

  const handleNewGroup = (event, currentUser) => {
    event.preventDefault()
    axios
      .post(
        `https://dndateme-backend.herokuapp.com/groups`,
        {
          name:newName,
          admin:props.currentUser._id,
          image:newImage
        }
      ).then((response) => {
        props.setCurrentPage('groupsIndex')
      })
  }

  return (
    <>
      <form onSubmit={(event) => {handleNewGroup(event, props.currentUser)}}>
        <label htmlFor="name">Group Name: </label>
        <input type="text" onChange={handleNewName}/>
        <label htmlFor="image">Group Image: </label>
        <input type="text" onChange={handleNewImage}/>
        <input type="submit" value="Create Group"/>
      </form>
    </>
  )
}
export default NewGroup
