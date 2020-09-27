import React from "react"
import BNav from "react-bootstrap/Nav"
import "./style/NavBar.css"

const NavBar = ({ user, setUser, setMode }) => {
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
            <img
                width="10%"
                src={process.env.PUBLIC_URL + "/brand.png"}
                alt="WUPHF"
            />
            {user && (
                <BNav.Item>
                    <BNav.Link href="/">Home</BNav.Link>
                </BNav.Item>
            )}
            <BNav.Item>
                <BNav.Link href="/explore">Explore</BNav.Link>
            </BNav.Item>
            {user && (
                <BNav.Item>
                    <BNav.Link href={"/profile/" + user.username}>
                        Profile
                    </BNav.Link>
                </BNav.Item>
            )}
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
