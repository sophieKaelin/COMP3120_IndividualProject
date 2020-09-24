import React, { useState, useEffect } from "react"
import BNav from "react-bootstrap/Nav"
import "./style/NavBar.css"

const NavBar = ({ user, setUser }) => {
    // useEffect(() => {
    //     setUser("test")
    // }, [])

    const saveAndLogout = () => {
        localStorage.removeItem("user")
        setUser(null)
    }

    return (
        //ADD LOGO ON THE LEFT
        //ADD SEARCH BAR ON THE LEFT
        <BNav variant="tabs" activeKey="/home">
            <BNav.Item>
                <BNav.Link href="/">Home</BNav.Link>
            </BNav.Item>
            <BNav.Item>
                <BNav.Link href="/explore">Explore</BNav.Link>
            </BNav.Item>
            <BNav.Item>
                <BNav.Link href="/profile/:username">Profile</BNav.Link>
            </BNav.Item>
            {user ? (
                <BNav.Link href="/" onSelect={saveAndLogout}>
                    Logout
                </BNav.Link>
            ) : (
                <BNav.Link href="/login">Login</BNav.Link>
            )}
        </BNav>
    )
}

export default NavBar
