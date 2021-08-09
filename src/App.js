
import {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css'

import NavBar from './components/NavBar'
import LogIn from './components/LogIn'
import NewUser from './components/NewUser'
import EditUser from './components/EditUser'
import UserCard from './components/UserCard'
import ShowUser from './components/ShowUser'

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
    let [currentPage, setCurrentPage] = useState('usersIndex')

    useEffect(() => {
        getSessionUser()
        getUsers()
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
        setNewEmail(null)
        setNewPassword(null)
        setNewFirstName(null)
        setNewLastName(null)
        setNewPronouns(null)
        setNewProfilePic(null)
        setNewFaveClass(null)
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

    const getSessionUser = () => {
        // console.log('test')
        axios
            .get('https://dndateme-backend.herokuapp.com/sessions/')
            .then((response) => {
                console.log(response)
                // if (response){
                //     setCurrentUser(response.data)
                // }
            })
    }

    return (
        <>
        <NavBar
            getUsers={getUsers}
            currentUser={currentUser}
            setCurrentPage={setCurrentPage}
            setCurrentUser={setCurrentUser}
            handleShowUser={handleShowUser}/>
        <main>
            <button onClick={getSessionUser}>Test</button>
            {currentPage === "logIn" &&
                <LogIn
                    setCurrentPage={setCurrentPage}
                    setCurrentUser={setCurrentUser}/>
            }
            {currentPage === 'signUp' &&
                <NewUser
                    changeHandlers={changeHandlers}
                    newStates={newStates}
                    getUsers={getUsers}
                    clearFormStates={clearFormStates}
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
                    currentUser={currentUser}
                    getUsers={getUsers}/>
            }
        </main>
        </>
    )
}

export default App;
