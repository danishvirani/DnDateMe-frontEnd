import React, {useState, useEffect} from 'react'
import axios from 'axios'

const GroupCard = (props) => {
    let group = props.group

    let [memberNames, setMemberNames] = useState('')

    const handleCardClick = () => {
    }

    const getMemberNames = (membersArray) => {
        let nameArray = []
        // console.log(membersArray)
        axios.post(`https://dndateme-backend.herokuapp.com/users/findMany`, {
            idArray: membersArray
        }).then((response) => {
            for (let user of response.data){
                nameArray.push(`${user.firstName} ${user.lastName}`)
            }
            // console.log(membersArray)
            // console.log(response)
            setMemberNames(nameArray.join(', '))
        })
    }

    useEffect(() => {
        getMemberNames(group.members)
    },[])

    return (
        <div className="userCard" onClick={()=>props.handleShowGroup(group._id)}>
            <img src={group.image} alt={group.name} />
            <h3>{group.name}</h3>
            <p>{memberNames}</p>
        </div>
    )
}

export default GroupCard
