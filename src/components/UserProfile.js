import React from 'react'
import {useState} from 'react'
import axios from 'axios'

const UserProfile = (props) => {

  let [user, setUser] = useState(props.currentUser)

  // const accept = (id) => {
  //   let addedUser = [...props.currentUser.friendIds, id]
  //   let requestArray = props.currentUser.requestIds
  //   let requestIndex = requestArray.indexOf(id)
  //   let removeRequestArray = [...requestArray.slice(0, requestIndex), ...requestArray.slice(requestIndex + 1)]
  //
  //   axios
  //     .put(
  //       `https://dndateme-backend.herokuapp.com/users/${props.currentUser._id}`,
  //       {
  //         requestIds:removeRequestArray,
  //         friendIds:addedUser
  //       }
  //     ).then(props.getUsers())
  //
  //   const user2 = props.users.filter(user => user._id == id)
  //   let addedUser2 = [...user2[0].friendIds, props.currentUser._id]
  //   if (props.currentUser.requestIds.includes(id)){
  //     let requestArray2 = user2[0].requestIds
  //     let requestIndex2 = requestArray2.indexOf(props.currentUser._id)
  //     let removeRequestArray2 = [...requestArray2.slice(0, requestIndex2), ...requestArray2.slice(requestIndex2 + 1)]
  //
  //     axios
  //     .put(
  //       `https://dndateme-backend.herokuapp.com/users/${id}`,
  //       {
  //         requestIds:removeRequestArray2,
  //         friendIds:addedUser2
  //       }
  //     ).then(props.getUsers())
  //   } else {
  //
  //     axios
  //     .put(
  //       `https://dndateme-backend.herokuapp.com/users/${id}`,
  //       {
  //         friendIds:addedUser2
  //       }
  //     ).then(props.getUsers())
  //
  //   }
  //   props.getCurrentUser(props.currentUser._id)
  // }
  //
  // const deny = (id) => {
  //   let requestArray = props.currentUser.requestIds
  //   let requestIndex = requestArray.indexOf(id)
  //   let removeRequestArray = [...requestArray.slice(0, requestIndex), ...requestArray.slice(requestIndex + 1)]
  //
  //   axios
  //     .put(
  //       `https://dndateme-backend.herokuapp.com/users/${props.currentUser._id}`,
  //       {
  //         requestIds:removeRequestArray
  //       }
  //     ).then(props.getUsers())
  //     props.getCurrentUser(props.currentUser._id)
  // }

  const accept = (id) => {
      axios
        .put(
          `https://dndateme-backend.herokuapp.com/users/handleRequest`,
          {
            senderId:id,
            receiverId:user._id,
            status:"accept"
          }
        ).then(refreshProfile())
  }

  const deny = (id) => {
      axios
        .put(
          `https://dndateme-backend.herokuapp.com/users/handleRequest`,
          {
            senderId:id,
            receiverId:user._id,
            status:"deny"
          }
        ).then(refreshProfile())
  }

  const refreshProfile = () => {
    axios
        .get(`https://dndateme-backend.herokuapp.com/users/${props.currentUser._id}`)
        .then((response) => {
            props.getCurrentUser(props.currentUser._id)
        })
  }

  return(
    <>
    <h1>{user.firstName + ' ' + user.lastName}</h1>
    <img src={user.profileImg}/>
    <h5>Friend Requests:</h5>
    {
      user.requestIds.map((id) => {
          return(
            <p>
            {(user.friendIds.includes(id))?
            <></>
            :props.users.filter(user => user._id == id).map(filteredName => (
              <p>{filteredName.firstName + ' ' + filteredName.lastName}</p>
            ))}
            {(user.friendIds.includes(id))?
            <></>
            :<><button onClick={()=>accept(id)}>Accept</button><button onClick={()=>deny(id)}>Deny</button></>
          }</p>
          )
      })
    }
    </>
  )
}

export default UserProfile
