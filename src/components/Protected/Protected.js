import React, {useState, useEffect}  from 'react'
import axios from 'axios'
import YelpList from "./YelpList"

function Protected() {
    const [term, setTerm] = useState("")
    const [address, setAddress] = useState("")
    const [yelp, setYelp] = useState(null)

    async function handleSearch(){
        try {
            let result = await axios.get(`http://localhost:3000/api/yelp/get-yelp-api?term=${term}&address=${address}`)
            console.log(result)
            setYelp(result.data.businesses)
        } catch (e) {
            console.log(e)
        }
    }
    console.log(yelp)

            return (
                <React.Fragment>
                    <div style={{display:"flex", justifyContent:"center", marginTop:"75px", marginBottom:"80px"}}>
                        <input style={{height:"30px", width:"400px", marginRight:"5px", fontSize:"16px", borderColor:"red"}} value={term} onChange={(e)=>setTerm(e.target.value)} placeholder="Search restaurants"/>
                        <input style={{width:"200px",marginRight:"5px", fontSize:"16px", borderColor:"red"}} value={address} onChange={(e)=>setAddress(e.target.value)} placeholder="Enter search location"/>
                        <button style={{width:"125px", color:"white", backgroundColor:"red", border:"1px solid red", fontSize:"18px", borderRadius:"4px"}} onClick={handleSearch}>Search</button>
                    </div>
                    <div>
                        <ul>
                        {yelp?.map((item)=>{
                            return (<YelpList 
                                key={item.id}
                                item={item}
                                name={item.name}
                                image={item.image_url}
                                phone={item.display_phone}
                                location={item.location.display_address}
                                price={item.price}
                                rating={item.rating}
                                reviewCount={item.review_count}
                                website={item.url}
                            />
                        )})
                    }
                        </ul>
                        
                    </div>
                </React.Fragment>
            )
        }

export default Protected
