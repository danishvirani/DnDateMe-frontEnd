import React, {useState, useEffect} from 'react'
import axios from 'axios'

const UserProfile = (props) => {

  let [friendNames, setfriendNames] = useState('')
  let user = props.currentUser

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

  const getFriendNames = (friendArray) => {
      let nameArray = []
      axios.post(`https://dndateme-backend.herokuapp.com/users/findMany`, {
          idArray: friendArray
      }).then((response) => {
          for (let user of response.data){
              nameArray.push(`${user.firstName} ${user.lastName}`)
          }
          setfriendNames(nameArray.join(', '))
      })
  }

  useEffect(() => {
      getFriendNames(props.currentUser.friendIds)
  },[])

  const accept = (id) => {
      axios
        .put(
          `https://dndateme-backend.herokuapp.com/users/handleRequest`,
          {
            senderId:id,
            receiverId:user._id,
            status:"accept"
          }
      ).then(()=>refreshProfile())
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
      ).then(()=>refreshProfile())
  }

  const refreshProfile = () => {
    axios
        .get(`https://dndateme-backend.herokuapp.com/users/${props.currentUser._id}`)
        .then((response) => {
            props.getCurrentUser(props.currentUser._id)
        })
  }

  const handleDeleteAccount = (currentUser) => {
      axios
        .delete(
          `https://dndateme-backend.herokuapp.com/users/${currentUser._id}`
        ).then((response) => {
            props.setCurrentUser(undefined)
            props.setMyChats(undefined)
            props.getUsers()
            props.setCurrentPage('usersIndex')
        })
  }

  return(
    <>
    <h1>{user.firstName + ' ' + user.lastName}</h1>
    <br/><br/>
    <img src={user.profileImg}/>
    <br/><br/>
    <h5>Friends:</h5>
    <br/><br/>
    {friendNames}
    <h5>Friend Requests:</h5>
    <br/><br/>
    {
      user.requestIds.map((id) => {
          return(
            <p>
            {(!user.friendIds.includes(id)) &&
            props.users.filter(user => user._id == id).map(filteredName => (
              <p>{filteredName.firstName + ' ' + filteredName.lastName}</p>
            ))}
            {(!user.friendIds.includes(id)) &&
            <><button className="btn btn-nav" onClick={()=>accept(id)}>Accept</button><button className="btn btn-nav" onClick={()=>deny(id)}>Deny</button></>
          }</p>
          )
      })
    }
    <button className="btn btn-nav" onClick={()=>handleDeleteAccount(props.currentUser)}>Delete Account</button>
    </>
  )
}

export default UserProfile
