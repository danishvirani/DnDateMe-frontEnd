
import {useState, useEffect} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import NavBar from './components/NavBar'
import LogIn from './components/LogIn'
import NewUser from './components/NewUser'
import EditUser from './components/EditUser'
import UserCard from './components/UserCard'
import ShowUser from './components/ShowUser'
import UserProfile from './components/UserProfile'
import Banner from './components/Banner'
import GroupCard from './components/GroupCard'
import ShowGroup from './components/ShowGroup'
import ChatFooter from './components/ChatFooter'
import ShowChat from './components/ShowChat'
import NewGroup from './components/NewGroup'
import EditGroup from './components/EditGroup'

const App = () => {

    // New/edit form states
    let [newEmail, setNewEmail] = useState('')
    let [newPassword, setNewPassword] = useState('')
    let [newFirstName, setNewFirstName] = useState('')
    let [newLastName, setNewLastName] = useState('')
    let [newPronouns, setNewPronouns] = useState('')
    let [newFaveClass, setNewFaveClass] = useState('')
    let [newProfilePic, setNewProfilePic] = useState('')
    let [newFriends, setNewFriends] = useState('')


    let [users, setUsers] = useState([])
    let [currentUser, setCurrentUser] = useState(undefined)
    let [showUser, setShowUser] = useState({})
    let [groups, setGroups] = useState([])
    let [showGroup, setShowGroup] = useState({})
    let [currentPage, setCurrentPage] = useState('usersIndex')
    let [myChats, setMyChats] = useState(undefined)

    useEffect(() => {
        getSessionUser()
        getUsers()
        getGroups()
    },[])

    let newStates = {
        newEmail:newEmail,
        newPassword:newPassword,
        newFirstName:newFirstName,
        newLastName:newLastName,
        newPronouns:newPronouns,
        newFaveClass:newFaveClass,
        newProfilePic:newProfilePic,
        newFriends:newFriends
    }

    const clearFormStates = () => {
        setNewEmail("")
        setNewPassword("")
        setNewFirstName("")
        setNewLastName("")
        setNewPronouns("")
        setNewProfilePic("")
        setNewFaveClass([])
    }

    const changeHandlers = {
        emailChange: (e) => {
            setNewEmail(e.target.value)
        },
        passwordChange: (e) => {
            setNewPassword(e.target.value)
        },
        firstChange: (e) => {
            setNewFirstName(e.target.value)
        },
        lastChange: (e) => {
            setNewLastName(e.target.value)
        },
        pronounsChange: (e) => {
            setNewPronouns(e.target.value)
        },
        picChange: (e) => {
            setNewProfilePic(e.target.value)
        },
        classChange: (e) => {
            setNewFaveClass(e.target.value)
        }
    }

    const getUsers = () => {
        axios
            .get('https://dndateme-backend.herokuapp.com/users')
            .then((response) => {
                setUsers(response.data)
            })
    }


    const getGroups = () => {
        axios
            .get('https://dndateme-backend.herokuapp.com/groups')
            .then((response) => {
                setGroups(response.data)
            })
    }

    const getMyChats = (id) => {
        axios
            .get(`https://dndateme-backend.herokuapp.com/chats/byUser/${id}`)
            .then((response) => {
                setMyChats(response.data)
            })
    }

    const getCurrentUser = (id) => {
        axios
            .get(`https://dndateme-backend.herokuapp.com/users/${id}`)
            .then((response) => {
                setCurrentUser(response.data)
            })
    }

    const handleShowUser = (id) => {
        axios
            .get(`https://dndateme-backend.herokuapp.com/users/${id}`)
            .then((response) => {
                setShowUser(response.data)
                setCurrentPage('showUser')
            })
    }

    const handleShowGroup = (id) => {
        axios
            .get(`https://dndateme-backend.herokuapp.com/groups/${id}`)
            .then((response) => {
                setShowGroup(response.data)
                setCurrentPage('showGroup')
            })
    }

    const getSessionUser = () => {
        // console.log('test')
        axios
            // .get('https://dndateme-backend.herokuapp.com/sessions/')
            .get('http://localhost:3000/sessions/')
            .then((response) => {
                console.log(response)
                if (response.data.currentUser){
                    setCurrentUser(response.data.currentUser)
                }
            })
    }

    return (
        <>
        <Banner />
        <NavBar
            getUsers={getUsers}
            currentUser={currentUser}
            setCurrentPage={setCurrentPage}
            setCurrentUser={setCurrentUser}
            handleShowUser={handleShowUser}
            setMyChats={setMyChats}/>
        <main>
            <button onClick={getSessionUser}>Test</button>
            {currentPage === "logIn" &&
                <LogIn
                    setCurrentPage={setCurrentPage}
                    setCurrentUser={setCurrentUser}
                    getMyChats={getMyChats}/>
            }
            {currentPage === 'signUp' &&
                <NewUser
                    changeHandlers={changeHandlers}
                    newStates={newStates}
                    getUsers={getUsers}
                    clearFormStates={clearFormStates}
                    setCurrentPage={setCurrentPage}
                />
            }
            {currentPage === "editUser" &&
                <EditUser
                    changeHandlers={changeHandlers}
                    newStates={newStates}
                    getUsers={getUsers}
                    clearFormStates={clearFormStates}
                    currentUser={currentUser}
                    getCurrentUser={getCurrentUser}
                    setShowUser={setShowUser}
                    setCurrentPage={setCurrentPage}
                />
            }
            {currentPage === "myProfile" &&
                <UserProfile
                    currentUser={currentUser}
                    getUsers={getUsers}
                    users={users}
                    getCurrentUser={getCurrentUser}
                    setCurrentUser={setCurrentUser}
                    setMyChats={setMyChats}
                    setCurrentPage={setCurrentPage}
                />
            }
            {currentPage === 'usersIndex' &&
                <>
                <h1>All Users</h1>
                <div className="cardBox">
                    {users.map((user, index) => {
                        return <UserCard key={index}
                            user={user}
                            handleShowUser={handleShowUser}/>
                    })}
                </div>
                </>
            }
            {currentPage === "showUser" &&
                <ShowUser
                    showUser={showUser}
                    setShowUser={setShowUser}
                    currentUser={currentUser}
                    getCurrentUser={getCurrentUser}
                    getUsers={getUsers}
                    users={users}
                />
            }
            {currentPage === 'groupsIndex' &&
                <>
                {getGroups()}
                <h1>All Groups</h1>
                <div className="cardBox">
                    {groups.map((group, index) => {
                        return <GroupCard key={index}
                            group={group}
                            handleShowGroup={handleShowGroup}/>
                    })}
                </div>
                </>
            }
            {currentPage === "showGroup" &&
                <ShowGroup
                    showGroup={showGroup}
                    currentUser={currentUser}
                    getGroups={getGroups}
                    getUsers={getUsers}
                    users={users}
                />
            }
            {currentPage === "newGroup" &&
                <NewGroup
                    currentUser={currentUser}
                    setCurrentPage={setCurrentPage}
                    getGroups={getGroups}
                />
            }
        </main>
        {currentUser &&
            <ChatFooter
                currentUser={currentUser}
                getMyChats={getMyChats}
                myChats={myChats}/>
        }

        </>
    )
}

export default App;
