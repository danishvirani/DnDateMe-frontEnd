import React, {useState, useEffect} from 'react'
import axios from 'axios'

const ShowGroup = (props) => {

  let [newName, setNewName] = useState('')
  let [newLocation, setNewLocation] = useState('')
  let [newImage, setNewImage] = useState('')
  let [group, setGroup] = useState(props.showGroup)
  let [newGroupChatMessage, setNewGroupChatMessage] = useState('')
  let [memberNames, setMemberNames] = useState('')

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }
  const handleNewImage = (event) => {
    setNewImage(event.target.value)
  }
  const handleNewGroupChatMessage = (event) => {
    setNewGroupChatMessage(event.target.value)
  }

  const getMemberNames = (membersArray) => {
      let nameArray = []
      axios.post(`https://dndateme-backend.herokuapp.com/users/findMany`, {
          idArray: membersArray
      }).then((response) => {
          for (let user of response.data){
              nameArray.push(`${user.firstName} ${user.lastName}`)
          }
          setMemberNames(nameArray.join(', '))
      })
  }

  useEffect(() => {
      getMemberNames(group.members)
  },[])

  const accept = (request) => {
    axios
      .put(
        `https://dndateme-backend.herokuapp.com/groups/${group._id}/${request}/accept`)
      .then((response) => {
          setGroup(response.data)
      })
  }

  const deny = (request) => {
    axios
      .put(
        `https://dndateme-backend.herokuapp.com/groups/${group._id}/${request}/deny`)
      .then((response) => {
          setGroup(response.data)
      })
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
        ).then(()=>refreshGroup())

  }

  const toggleEditGroup = () => {
    document.querySelector('#groupForm').classList.toggle('hidden')
  }

  const refreshGroup = () => {
    axios
        .get(`https://dndateme-backend.herokuapp.com/groups/${group._id}`)
        .then(()=>(response) => {
            setGroup(response.data)
        })
  }

  const handleJoinGroup = (currentUser) => {
    axios
        .put(`https://dndateme-backend.herokuapp.com/groups/${group._id}/${currentUser._id}`
        ).then((response) => {
            setGroup(response.data)
        })
  }

  const handleNewGroupChatForm = (event, currentUser) => {
    event.preventDefault()
    axios
        .put(
          `https://dndateme-backend.herokuapp.com/groups/${group._id}/${currentUser._id}/message`,
          {
            message: newGroupChatMessage + " - " + currentUser.firstName + " " + currentUser.lastName
          }
        ).then((response) => {
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
                <button onClick={()=>accept(request)}>Accept</button>
                <button onClick={()=>deny(request)}>Deny</button>
                </>
              )
            })
            :
            <></>
        }
        <h1>{group.name}</h1>
        <img src={group.image} alt={group.name}/>
        <h4>Members: </h4>
        <br/>
        <p>{memberNames}</p>
        <br/><br/>
        {
          (props.currentUser !== undefined) &&
            (props.currentUser._id == group.admin) &&
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
        }
        <br/><br/>
        {
          (props.currentUser !== undefined) &&
          (!group.members.includes(props.currentUser._id)) && (group.admin !== props.currentUser._id) && <>
          {
            (group.joinRequests.includes(props.currentUser._id))?
            <p>Join Request Pending Approval</p>
            :
            <button onClick={()=>handleJoinGroup(props.currentUser)}>Join</button>
          }
        </>
        }
        {
          (props.currentUser !== undefined) &&
          (group.members.includes(props.currentUser._id) || group.admin == props.currentUser._id) &&
          <div className="card">
            <div className="card-header"><h3>Group Chat</h3></div>
            <div className="card-body">
              {
                group.chat.map((messages) => {
                  return (
                    <p>{messages}<br/></p>
                  )
                })
              }
            </div>


            <div className="card-footer w-100 overflow-scroll mx-auto">
              <form className="mx-auto" onSubmit={(event) => handleNewGroupChatForm(event, props.currentUser)}>
                <label htmlFor="message">Message</label>
                <textarea onChange={handleNewGroupChatMessage}></textarea>
                <input type="submit" value="Post Messsage"/>
              </form>
            </div>
            </div>
        }
        </>
    )
}

export default ShowGroup
