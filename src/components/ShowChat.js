import React, {useState} from 'react'
import axios from 'axios'

import './css/ShowChat.css'

const ShowChat = (props) => {

    let [newMessageBody, setNewMessageBody] = useState('')

    const handleMessageBody = (e) => {
        setNewMessageBody(e.target.value)
    }

    const setCurrentChatById = (chatId) => {
        axios.get(`https://dndateme-backend.herokuapp.com/chats/${chatId}`)
            .then((response) => {
                props.setCurrentChat(response.data)
            })
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
                setCurrentChatById(chatId)
            })
        e.target.reset()
    }

    return(
        <div className="chatBox">
            <button className="btn btn-back" onClick={()=>props.setCurrentChat(undefined)}>Back</button>
            <div className="chatBody">
            {props.chat.messages.map((message,index) => {
                return(
                    <div className={message.senderId === props.currentUser._id.toString() ? "message myMessage" : "message"}>
                        <p className="messageName">{message.senderName}</p>
                        <p className="messageBody">{message.body}</p>
                    </div>
                )
            })}
            </div>
            <form onSubmit={(e)=>sendMessage(e,props.chat._id)}>
                <textarea onChange={(e)=>handleMessageBody(e)} />
                <input type="submit" value="send" />
            </form>

        </div>
    )
}

export default ShowChat
