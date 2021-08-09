import React, {useState} from 'react'
import axios from 'axios'

const ShowChat = (props) => {

    let [newMessageBody, setNewMessageBody] = useState('')

    const handleMessageBody = (e) => {
        setNewMessageBody(e.target.value)
    }

    const sendMessage = (e,chatId) => {
        e.preventDefault()
        axios
            .put(`https://dndateme-backend.herokuapp.com/chats/${chatId}/addMessage`,
            {
                senderId: props.currentUser._id,
                senderName: `${props.currentUser.firstName} ${props.currentUser.lastName}`,
                body: newMessageBody
            })
            .then((response) => {
                props.getMyChats(props.currentUser._id)
            })
        e.target.reset()
    }

    return(
        <div className="chatBox">
            {props.chat.messages.map((message,index) => {
                return(
                    <div className="message">
                        <p className="messageName">{message.senderName}</p>
                        <p className="messageBody">{message.body}</p>
                    </div>
                )
            })}
            <form onSubmit={(e)=>sendMessage(e,props.chat._id)}>
                <textarea onChange={(e)=>handleMessageBody(e)} />
                <input type="submit" value="send" />
            </form>
        </div>
    )
}

export default ShowChat
