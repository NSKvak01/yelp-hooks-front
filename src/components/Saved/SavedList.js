import React, {useEffect} from 'react'
import axios from "axios"
import Cookie from "js-cookie"


function SavedList(props) {
    const {_id, name, image, url, location, phone, rating, reviews, price} = props.item
    const {fetchYelp}=props
    let phoneHref = "tel:"+[phone]
    let locationHref = "https://maps.google.com/maps?q="+location;
    

    async function handleDelete(){
        const cookie = Cookie.get("jwt-cookie")
        try {
            let deletedYelp = await axios.delete(`http://localhost:3000/api/yelp/delete-yelp/${_id}`, {
                headers:{
                    authorization:`Bearer ${cookie}`
                }
            })
            fetchYelp()
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            <li style={{display:"flex", justifyContent:"center", marginTop:"50px", marginBottom:"20px"}}>
                <div style={{marginTop:"50px"}}>
                    <img src={image} style={{width:"450px", border:"10px solid red"}} />
                </div>
                <div style={{marginLeft:"80px", marginTop:"50px",}}>
                    <h1>{name}</h1>
                    <h3 style={{marginTop:-10, color:"red", fontSize:"22px", marginBottom:"10px", marginLeft:"5px"}}>{price}</h3>
                    <div style={{display:"flex", justifyContent:"space-between", width:"300px", marginLeft:"5px"}}>
                        <div style={{display:"flex", alignItems:"center"}}>
                            <h3 style={{color:"rgb(100, 100, 100)", fontSize:"20px"}}>Rating: </h3>
                            <h3 style={{marginLeft:"5px", color:"red"}}>{rating}</h3>
                        </div>
                        <div style={{display:"flex", alignItems:"center"}}>
                            <h3 style={{color:"rgb(100, 100, 100)", fontSize:"20px"}}>Reviews: </h3>
                            <h3 style={{marginLeft:"5px"}}>{reviews}</h3>
                        </div>
                    </div>
                    <div style={{display:"flex", alignItems:"center", marginLeft:"5px"}}>
                        <h3 style={{marginRight:"20px", color:"rgb(100, 100, 100)"}}>Website: </h3>
                        <a href={url} target="_blank" style={{fontSize:"18px", color:"black", fontWeight:"bold", marginLeft:"-15px"}}>Check {name} here</a>
                    </div>
                    <div style={{height:"40px", marginLeft:"5px"}}>
                        <h3 style={{color:"rgb(100, 100, 100)"}} >Phone: <a href={phoneHref} style={{color:"black"}}>{phone}</a></h3>
                    </div>
                    <div style={{height:"40px", marginLeft:"5px"}}>
                        <h3 style={{color:"rgb(100, 100, 100)", width:"500px"}}>Address: <a href={locationHref} target="_blank" style={{width:"500px", fontSize:"18px", color:"black", fontWeight:"bold"}}>{location}</a></h3>
                    </div>
                    <div style={{display:"flex", width:"400px", justifyContent:"flex-end"}}>
                        <button onClick={handleDelete} style={{width:"150px", height:"35px", color:"white", fontSize:"18px", marginTop:"20px"}}>Delete</button>
                    </div>
                </div>
            </li>
        </div>
    )
}

export default SavedList
