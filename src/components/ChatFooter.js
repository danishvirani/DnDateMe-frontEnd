import React, {useState} from 'react'
import axios from 'axios'

import './css/ChatFooter.css'
import ShowChat from './ShowChat'


const ChatFooter = (props) => {
    let [currentChat, setCurrentChat] = useState(undefined)

    const getChatName = (chat) => {
        if (chat.title !== '') {
            return chat.title
        } else {
            let memberArray = []
            for (let memberId of chat.memberIds){
                if (memberId !== props.currentUser._id.toString()){
                    axios.get(`https://dndateme-backend.herokuapp.com/users/${memberId}`)
                        .then((response) => {
                            let name = response.data.firstName + response.data.lastName
                            memberArray.push(name)
                        })
                }
            }
            return memberArray.join(', ')
        }
    }

    return (
        <div className="chatManager">
            <div id="chatManagerWindow">
            {!currentChat && props.myChats &&
                <>
                {props.myChats.map((chat,index) =>{
                    return <button className="btn btn-chat" onClick={()=>setCurrentChat(chat)}>{chat.title}</button>
                    })
                }
                </>
            }
            {currentChat &&
                <ShowChat
                    chat={currentChat}
                    getMyChats={props.getMyChats}
                    currentUser={props.currentUser}
                    setCurrentChat={setCurrentChat}
                    />
            }
            </div>
            <button className="btn btn-chat" onClick={()=>{
                document.querySelector('#chatManagerWindow').classList.toggle('hidden')
                setCurrentChat(undefined)
            }}>Chats</button>
        </div>
    )
}

export default ChatFooter
