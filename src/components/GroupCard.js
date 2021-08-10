import React from 'react'

const GroupCard = (props) => {
    let group = props.group

    const handleCardClick = () => {
    }

    return (
        <div className="userCard" onClick={()=>props.handleShowGroup(group._id)}>
            <img src={group.image} alt={group.name} />
            <h3>{group.name}</h3>
            <p>{group.members.join(', ')}</p>
        </div>
    )
}

export default GroupCard
