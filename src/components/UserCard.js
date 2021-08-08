import React from 'react'

const UserCard = (props) => {
    let user = props.user

    const handleCardClick = () => {
        console.log('boop')
    }

    return (
        <div className="userCard" onClick={()=>handleCardClick()}>
            <img src={user.profileImg} alt={user.firstName} />
            <h3>{user.firstName} {user.lastName}</h3>
            <p className="caps">{user.pronouns}</p>
        </div>
    )
}

export default UserCard
