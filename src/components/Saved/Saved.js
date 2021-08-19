import React, {useEffect, useState} from 'react'
import axios from "axios"
import SavedList from './SavedList'
import Cookie from "js-cookie"


function Saved() {
    const [savedList, setSavedList] = useState(null)


    useEffect(() => {
        fetchYelp()
    }, [])


    async function fetchYelp(){
        const cookie = Cookie.get("jwt-cookie")
        try {
            let foundList = await axios.get("http://localhost:3000/api/yelp/get-all-yelps", {
                headers:{
                    authorization:`Bearer ${cookie}`
                }
            })
            setSavedList(foundList.data.yelp)
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <React.Fragment>
            <ul>
                {savedList?.map((item)=>{
                    return (<SavedList
                        key={item._id} 
                        item={item}
                        fetchYelp={fetchYelp}
                        />
                    )
                })}
            </ul>
        </React.Fragment>
    )
}

export default Saved
