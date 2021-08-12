import React, {useState, useEffect} from 'react'
import axios from 'axios'

const ShowUser = (props) => {

  let [newRequestIds, setNewRequestIds] = useState([])
  let [showUser, setShowUser] = useState(props.showUser)
  let [friendNames, setfriendNames] = useState('')

    // const addFriend = () => {
    //   if (showUser.requestIds.includes(props.currentUser._id)) {
    //     let requestArray = showUser.requestIds
    //     let requestIndex = requestArray.indexOf(props.currentUser._id)
    //     let removeArray = [...requestArray.slice(0, requestIndex), ...requestArray.slice(requestIndex + 1)]
    //     axios
    //       .put(
    //         `https://dndateme-backend.herokuapp.com/users/${showUser._id}`,
    //         {
    //           requestIds:removeArray
    //         }
    //       ).then(props.getUsers())
    //
    //
    //   } else {
    //     let addArray = [...showUser.requestIds, props.currentUser._id]
    //     if (!showUser.requestIds.includes(props.currentUser._id)){
    //       axios
    //         .put(
    //           `https://dndateme-backend.herokuapp.com/users/${showUser._id}`,
    //           {
    //             requestIds:addArray
    //           }
    //         ).then(props.getUsers())
    //
    //     }
    //   }
    //   props.getCurrentUser(props.currentUser._id)
    //   axios
    //       .get(`https://dndateme-backend.herokuapp.com/users/${showUser._id}`)
    //       .then((response) => {
    //           setShowUser(response.data)
    //       })
    // }

    const getFriendNames = (friendsArray) => {
      let nameArray = []
      axios.post(`https://dndateme-backend.herokuapp.com/users/findMany`, {
          idArray: friendsArray
      }).then((response) => {
          for (let user of response.data){
              nameArray.push(`${user.firstName} ${user.lastName}`)
          }
          setfriendNames(nameArray.join(', '))
      })
    }

    useEffect(() => {
        getFriendNames(showUser.friendIds)
    },[])

    const addFriend = () => {
      axios
        .put(
          `https://dndateme-backend.herokuapp.com/users/friendRequest`,
          {
            senderId:props.currentUser._id,
            receiverId:showUser._id
          }
        ).then(()=>refreshUser())
    }

    const unFriend = () => {
      axios
        .put(
          `https://dndateme-backend.herokuapp.com/users/handleUnFriend`,
          {
            senderId:props.currentUser._id,
            receiverId:showUser._id
          }
        ).then(()=>refreshUser())
    }

    const refreshUser = () => {
      axios
          .get(`https://dndateme-backend.herokuapp.com/users/${showUser._id}`)
          .then((response) => {
              setShowUser(response.data)
          })
    }

    return(
        <>
        <div className="card mx-auto text-center">
        <div className="card-header mx-auto text-center">
        <h1>{showUser.firstName}</h1>
        </div>
        <div className="card-body mx-auto text-center name-img">
        <img src={showUser.profileImg} alt={showUser.firstName} className="showUserImg"/>
        <br/><br/>
        </div>
        <div className="card-footer mx-auto text-center">
        <h3>Favorite Classes</h3>
        <p>{
            showUser.faveClass.includes('Artificer')?
            <img src="https://www.enworld.org/data/attachments/25/25385-b7ecb2659a2ad69e504b73de736160d4.jpg" alt='Artificer'/>
            : <></>}
            {showUser.faveClass.includes('Barbarian')?
            <img src="https://www.enworld.org/data/attachments/25/25427-e516d7294e89f2ffec671b85bb8770d8.jpg" alt='Barbarian'/>
            : <></>}
            {showUser.faveClass.includes('Bard')?
            <img src="https://www.enworld.org/data/attachments/25/25385-b7ecb2659a2ad69e504b73de736160d4.jpg" alt='Bard'/>
            : <></>}
            {showUser.faveClass.includes('Cleric')?
            <img src="https://www.enworld.org/data/attachments/25/25453-9e7fa880325abcb7a8fb69930e9d6b5e.jpg" alt='Cleric'/>
            : <></>}
            {showUser.faveClass.includes('Druid')?
            <img src="https://www.enworld.org/data/attachments/25/25527-b5410377ddef5f14a22e1109e7dca5eb.jpg" alt='Druid'/>
            : <></>}
            {showUser.faveClass.includes('Fighter')?
            <img src="https://www.enworld.org/data/attachments/25/25643-6603092789799dac8e3efeb566b3795a.jpg" alt='Fighter'/>
            : <></>}
            {showUser.faveClass.includes('Monk')?
            <img src="https://www.enworld.org/data/attachments/25/25664-8b5dd5d305ce3a4c321fb781937f13a6.jpg" alt='Monk'/>
            : <></>}
            {showUser.faveClass.includes('Paladin')?
            <img src="https://www.enworld.org/data/attachments/25/25689-69a84005dc22d977ad72577ca422d640.jpg" alt='Paladin'/>
            : <></>}
            {showUser.faveClass.includes('Ranger')?
            <img src="https://www.enworld.org/data/attachments/25/25723-df52668dca885ddd6db3b01a77d839e5.jpg" alt='Ranger'/>
            : <></>}
            {showUser.faveClass.includes('Rogue')?
            <img src="https://www.enworld.org/data/attachments/25/25767-9c491604386f2e5db7f848261643f476.jpg" alt='Rogue'/>
            : <></>}
            {showUser.faveClass.includes('Sorcerer')?
            <img src="https://www.enworld.org/data/attachments/25/25825-c39f672cd211dd66a96a669a3853591e.jpg" alt='Sorcerer'/>
            : <></>}
            {showUser.faveClass.includes('Warlock')?
            <img src="https://www.enworld.org/data/attachments/25/25848-c92d44c9a9193dab59adfdeb21b17fe9.jpg" alt='Warlock'/>
            : <></>}
            {showUser.faveClass.includes('Wizard')?
            <img src="https://www.enworld.org/data/attachments/25/25891-6f02824188749f93de050e9b18b83d3f.jpg" alt="Wizard"/>
            : <></>}
        </p>
        <br/><br/>
        <h5>Pronouns:</h5>
        <br/>
        <p>{showUser.pronouns}</p>
        <br/><br/>
        <h5>About Me:</h5>
        <br/><br/>
        <p>{showUser.aboutMe}</p>
        <br/><br/>
        <h5>Friends: </h5>
        <br/><br/>
        <p>{friendNames}</p>
        <br/><br/>
        {
          (props.currentUser !== undefined) &&
          (props.currentUser._id !== showUser._id) &&
          (!showUser.friendIds.includes(props.currentUser._id)) &&

            <button className="btn btn-nav" onClick={addFriend}>{
              (showUser.requestIds.includes(props.currentUser._id || showUser.friendIds.includes(props.currentUser._id)))? 'Remove Friend' : "Add Friend"
            }</button>
        }
        <br/>
        {
          (props.currentUser !== undefined) &&
          (props.currentUser._id !== showUser._id) &&
          (showUser.friendIds.includes(props.currentUser._id)) &&

            <button className="btn btn-nav" onClick={unFriend}>Un-Friend</button>
        }
        </div>
        </div>
        </>
    )
}

export default ShowUser
