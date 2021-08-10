import React from 'react'
import {useState} from 'react'
import axios from 'axios'

const ShowGroup = (props) => {

  let group = props.showGroup

  const accept = (request) => {
    axios
      .put(
        `https://dndateme-backend.herokuapp.com/groups/${group._id}/${request}/accept`)
      .then(props.getGroups())
  }

  const deny = (request) => {
    axios
      .put(
        `https://dndateme-backend.herokuapp.com/groups/${group._id}/${request}/deny`)
      .then(props.getGroups())
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

        </>
    )
}

export default ShowGroup
