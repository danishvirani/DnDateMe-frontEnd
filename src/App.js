
import {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css'

import NavBar from './components/NavBar'
import LogIn from './components/LogIn'
import NewUser from './components/NewUser'
import EditUser from './components/EditUser'
import UserCard from './components/UserCard'

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
    let [currentUser, setCurrentUser] = useState({})
    let [currentPage, setCurrentPage] = useState('usersIndex')

    const getCurrentUser = (id) => {
        axios
            .get(`https://dndateme-backend.herokuapp.com/users/${id}`)
            .then((response) => {
                setCurrentUser(response.data)
            })
    }

    useEffect(() => {
        getCurrentUser('610dae1157fdeb0015d073cf')
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

    return (
        <>
        <NavBar
            getUsers={getUsers}
            currentUser={currentUser}
            setCurrentPage={setCurrentPage}
            setCurrentUser={setCurrentUser}/>
        <main>
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
                />
            }
            {currentPage === 'usersIndex' &&
            <>
            <h1>All Users</h1>
            <div className="cardBox">
                {users.map((user, index) => {
                    return <UserCard key={index}
                        user={user}
                        getCurrentUser={getCurrentUser}/>
                })}
            </div>
            </>
            }
        </main>
        </>
    )
}

export default App;
