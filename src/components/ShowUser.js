import React from 'react'
import {useState} from 'react'
import axios from 'axios'

const ShowUser = (props) => {

  let [newRequestIds, setNewRequestIds] = useState([])

    const addFriend = () => {
      if (props.showUser.requestIds.includes(props.currentUser._id)) {
        let requestArray = props.showUser.requestIds
        let requestIndex = requestArray.indexOf(props.currentUser._id)
        let removeArray = [...requestArray.slice(0, requestIndex), ...requestArray.slice(requestIndex + 1)]
        axios
          .put(
            `https://dndateme-backend.herokuapp.com/users/${props.showUser._id}`,
            {
              requestIds:removeArray
            }
          ).then(props.getUsers())

      } else {
        let addArray = [...props.showUser.requestIds, props.currentUser._id]
        if (!props.showUser.requestIds.includes(props.currentUser._id)){
          axios
            .put(
              `https://dndateme-backend.herokuapp.com/users/${props.showUser._id}`,
              {
                requestIds:addArray
              }
            ).then(props.getUsers())

        }
      }
    }

    return(
        <>
        <h1>{props.showUser.firstName}</h1>
        <img src={props.showUser.profileImg} alt={props.showUser.firstName}/>
        <h3>Favorite Classes</h3>
        <p>{
            props.showUser.faveClass.includes('Artificer')?
            <img src="https://www.enworld.org/data/attachments/25/25385-b7ecb2659a2ad69e504b73de736160d4.jpg" alt='Artificer'/>
            : <></>}
            {props.showUser.faveClass.includes('Barbarian')?
            <img src="https://www.enworld.org/data/attachments/25/25427-e516d7294e89f2ffec671b85bb8770d8.jpg" alt='Barbarian'/>
            : <></>}
            {props.showUser.faveClass.includes('Bard')?
            <img src="https://www.enworld.org/data/attachments/25/25385-b7ecb2659a2ad69e504b73de736160d4.jpg" alt='Bard'/>
            : <></>}
            {props.showUser.faveClass.includes('Cleric')?
            <img src="https://www.enworld.org/data/attachments/25/25453-9e7fa880325abcb7a8fb69930e9d6b5e.jpg" alt='Cleric'/>
            : <></>}
            {props.showUser.faveClass.includes('Druid')?
            <img src="https://www.enworld.org/data/attachments/25/25527-b5410377ddef5f14a22e1109e7dca5eb.jpg" alt='Druid'/>
            : <></>}
            {props.showUser.faveClass.includes('Fighter')?
            <img src="https://www.enworld.org/data/attachments/25/25643-6603092789799dac8e3efeb566b3795a.jpg" alt='Fighter'/>
            : <></>}
            {props.showUser.faveClass.includes('Monk')?
            <img src="https://www.enworld.org/data/attachments/25/25664-8b5dd5d305ce3a4c321fb781937f13a6.jpg" alt='Monk'/>
            : <></>}
            {props.showUser.faveClass.includes('Paladin')?
            <img src="https://www.enworld.org/data/attachments/25/25689-69a84005dc22d977ad72577ca422d640.jpg" alt='Paladin'/>
            : <></>}
            {props.showUser.faveClass.includes('Ranger')?
            <img src="https://www.enworld.org/data/attachments/25/25723-df52668dca885ddd6db3b01a77d839e5.jpg" alt='Ranger'/>
            : <></>}
            {props.showUser.faveClass.includes('Rogue')?
            <img src="https://www.enworld.org/data/attachments/25/25767-9c491604386f2e5db7f848261643f476.jpg" alt='Rogue'/>
            : <></>}
            {props.showUser.faveClass.includes('Sorcerer')?
            <img src="https://www.enworld.org/data/attachments/25/25825-c39f672cd211dd66a96a669a3853591e.jpg" alt='Sorcerer'/>
            : <></>}
            {props.showUser.faveClass.includes('Warlock')?
            <img src="https://www.enworld.org/data/attachments/25/25848-c92d44c9a9193dab59adfdeb21b17fe9.jpg" alt='Warlock'/>
            : <></>}
            {props.showUser.faveClass.includes('Wizard')?
            <img src="https://www.enworld.org/data/attachments/25/25891-6f02824188749f93de050e9b18b83d3f.jpg" alt="Wizard"/>
            : <></>}
        </p>
        {(props.currentUser._id == props.showUser._id)?
        <></>
        :<button onClick={addFriend}>{
          (props.showUser.requestIds.includes(props.currentUser._id))? '' : "Add Friend"
        }</button>}
        <br/>
        </>
    )
}

export default ShowUser
