import React from 'react'
import axios from "axios"
import Cookie from "js-cookie"

function Profile() {
    async function handleUpdate(){
        const cookie = Cookie.get("jwt-cookie")
        try {
            let result = await axios.put("http://localhost:3000/api/users/pidate-profile", {}, {
                headers:{
                    authorization: `Bearer ${cookie}`
                }
            })
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div>
            <button onClick = {handleUpdate}>Update Profile</button>
        </div>
    )
}

export default Profile
