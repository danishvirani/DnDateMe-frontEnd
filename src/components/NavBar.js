import React from 'react'

const NavBar = (props) => {
    const logOut = () => {
        props.setCurrentUser(undefined)
        props.setCurrentPage('usersIndex')
    }

    return(
        <nav>
            <h1>DnDateMe</h1>
            {props.currentUser &&
                <p>Signed in as {props.currentUser.firstName}</p>
            }
            <div className="btnBox">
                <button className="btn btn-nav" onClick={()=> {props.setCurrentPage('usersIndex'); props.getUsers()}}>Home</button>
                {props.currentUser ?
                    <>
                    <button className="btn btn-nav" onClick={()=>props.setCurrentPage('editUser')}>My Profile</button>
                    <button className="btn btn-nav" onClick={logOut}>Log Out</button>
                    </>:
                    <button className="btn btn-nav" onClick={()=>props.setCurrentPage('logIn')}>Log In</button>
                }
                <button className="btn btn-nav" onClick={()=>props.setCurrentPage('signUp')}>Sign Up</button>
            </div>
        </nav>
    )
}

export default NavBar