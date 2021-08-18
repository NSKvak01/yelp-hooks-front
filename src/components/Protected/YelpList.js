import React from 'react'
import axios from "axios"
import { toast } from 'react-toastify'
import Cookie from "js-cookie"



function YelpList(props) {
    const {item, name, image, phone, location, price, rating, reviewCount, website} = props
    let phoneHref = "tel:"+[phone]
    let locationHref = "https://maps.google.com/maps?q="+location

    async function addYelp(){
        const cookie = Cookie.get("jwt-cookie")
        try {
            let newYelp = {
                name:name,
                image:image,
                url:website,
                phone:phone,
                rating:rating,
                price:price,
                reviews:reviewCount,
                location:location.join()
            }
            let result = await axios.post("http://localhost:3000/api/yelp/add-yelp", newYelp, {
                headers:{authorization:`Bearer ${cookie}`}
            })
            console.log(result)
            toast.success(`Restaurant saved`);
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <React.Fragment>
            <li style={{display:"flex", justifyContent:"center"}}>
                <div style={{marginTop:"50px"}}>
                    <img src={image} style={{width:"450px", border:"10px solid red"}} />
                </div>
                <div style={{marginLeft:"80px", marginTop:"50px",}}>
                    <div style={{display:"flex", justifyContent:"flex-end", width:"350px"}}><img src="https://cdn4.vectorstock.com/i/1000x1000/31/33/bookmark-sign-red-bookmark-icon-on-white-vector-20973133.jpg" style={{width:"30px"}} onClick={addYelp}  /></div>
                    <h1>{name}</h1>
                    <h3 style={{marginTop:-10, color:"red", fontSize:"22px", marginBottom:"10px", marginLeft:"5px"}}>{price}</h3>
                    <div style={{display:"flex", justifyContent:"space-between", width:"300px", marginLeft:"5px"}}>
                        <div style={{display:"flex", alignItems:"center"}}>
                            <h3 style={{color:"rgb(100, 100, 100)", fontSize:"20px"}}>Rating: </h3>
                            <h3 style={{marginLeft:"5px", color:"red"}}>{rating}</h3>
                        </div>
                        <div style={{display:"flex", alignItems:"center"}}>
                            <h3 style={{color:"rgb(100, 100, 100)", fontSize:"20px"}}>Reviews: </h3>
                            <h3 style={{marginLeft:"5px"}}>{reviewCount}</h3>
                        </div>
                    </div>
                    <div style={{display:"flex", alignItems:"center", marginLeft:"5px"}}>
                        <h3 style={{marginRight:"20px", color:"rgb(100, 100, 100)"}}>Website: </h3>
                        <a href={website} target="_blank" style={{fontSize:"18px", color:"black", fontWeight:"bold", marginLeft:"-15px"}}>Check {name} here</a>
                    </div>
                    <div style={{height:"40px", marginLeft:"5px"}}>
                        <h3 style={{color:"rgb(100, 100, 100)"}} >Phone: <a href={phoneHref} style={{color:"black"}}>{phone}</a></h3>
                    </div>
                    <div style={{height:"40px", marginLeft:"5px"}}>
                        <h3 style={{color:"rgb(100, 100, 100)", width:"500px"}}>Address: <a href={locationHref} target="_blank" style={{width:"500px", fontSize:"18px", color:"black", fontWeight:"bold"}}>{location}</a></h3>
                    </div>
                    
                </div>
            </li>

        </React.Fragment>
    )
}

export default YelpList
