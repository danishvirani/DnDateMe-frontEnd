import React from 'react'
import {useState} from 'react'
import axios from 'axios'

const ShowGroup = (props) => {

  let [newName, setNewName] = useState('')
  let [newLocation, setNewLocation] = useState('')
  let [newImage, setNewImage] = useState('')
  let [group, setGroup] = useState(props.showGroup)

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }
  const handleNewImage = (event) => {
    setNewImage(event.target.value)
  }

  const accept = (request) => {

  }

  const deny = (request) => {
    axios
      .put(
        `https://dndateme-backend.herokuapp.com/groups/${group._id}/${request}/deny`)
      .then(props.getGroups())
  }

  const handleEditForm = (event) => {
      event.preventDefault()
      axios
        .put(
          `https://dndateme-backend.herokuapp.com/groups/${group._id}`,
          {
            name:newName || group.name,
            image:newImage || group.image
          }
        ).then(refreshGroup())

  }

  const toggleEditGroup = () => {
    document.querySelector('#groupForm').classList.toggle('hidden')
  }

  const refreshGroup = () => {
    axios
        .get(`https://dndateme-backend.herokuapp.com/groups/${group._id}`)
        .then((response) => {
            setGroup(response.data)
        })
  }

  // {group.members.map((member) => {
  //   return ( <>
  //     {props.users.filter(user => user._id == member).map(filteredName => (
  //       <p>{filteredName.firstName + ' ' + filteredName.lastName + ', '}</p>
  //   ))}
  // </>)}}

    return(
        <>
        {
          (props.currentUser == undefined)?
            <></>
            :
            (props.currentUser._id == group.admin)?
            group.joinRequests.map((request) => {
              return (
                <>
                {props.users.filter(user => user._id == request).map(filteredName => (
                  <p>{filteredName.firstName + ' ' + filteredName.lastName}</p>
                ))}
                <button onClick={accept(request)}>Accept</button>
                <button onClick={deny(request)}>Deny</button>
                </>
              )
            })
            :
            <></>
        }
        <h1>{group.name}</h1>
        <img src={group.image} alt={group.name}/>
        <h4>Members: </h4>

        {
          (props.currentUser == undefined)?
            <></>
            :
            (props.currentUser._id == group.admin)?
              <>
              <button onClick={toggleEditGroup}>Edit Group</button>
              <form class='hidden' id='groupForm' onSubmit={(event) => handleEditForm(event)}>
                <label htmlFor="name">Group Name: </label>
                <input type="text" onChange={handleNewName}/>
                <label htmlFor="image">Group Image: </label>
                <input type="text" onChange={handleNewImage}/>
                <input type="submit" value="Update Group"/>
              </form>
              </>
            : <></>
        }

        </>
    )
}

export default ShowGroup
