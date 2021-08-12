import React from 'react'

const NavBar = (props) => {
    const logOut = () => {
        props.setCurrentUser(undefined)
        props.setCurrentPage('usersIndex')
        props.setMyChats(undefined)
    }

    return(
        <nav>
            <h1>DnDateMe</h1>
            <div className="btnBox">
                {props.currentUser &&
                    <p>Signed in as {props.currentUser.firstName}</p>
                }
                <button className="btn btn-nav" onClick={()=> {props.setCurrentPage('usersIndex'); props.getUsers()}}>Home</button>
                <button class="btn btn-nav dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    Groups
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a class="dropdown-item" onClick={()=> {props.setCurrentPage('groupsIndex')}}>All Groups</a></li>
                {(props.currentUser !== undefined) &&
                  <li><a class="dropdown-item" onClick={()=> {props.setCurrentPage('newGroup')}}>New Group</a></li>
                }
                </ul>
                {props.currentUser ?
                    <>
                    <button class="btn btn-nav dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                        Profile
                    </button>
                      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                        <li><a class="dropdown-item" onClick={()=> {props.setCurrentPage('myProfile')}}>My Profile</a></li>
                        <li><a class="dropdown-item" onClick={()=> {props.setCurrentPage('editUser')}}>Edit User</a></li>
                      </ul>
                    <button className="btn btn-nav" onClick={logOut}>Log Out</button>
                    </>:
                    <>
                    <button className="btn btn-nav" onClick={()=>props.setCurrentPage('logIn')}>Log In</button>
                    <button className="btn btn-nav" onClick={()=>props.setCurrentPage('signUp')}>SignUp</button>
                    </>
                }

            </div>
        </nav>
    )
}

export default NavBar
