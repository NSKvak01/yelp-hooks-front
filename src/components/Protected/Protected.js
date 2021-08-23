import React, {useState, useEffect}  from 'react'
import axios from 'axios'
import YelpList from "./YelpList"
import Spinner from "../Spinner/Spinner"
import "./Protected.css"
import useChangeInputConfig from '../hooks/searchHooks'

function Protected() {
    const [term, termOnChange, isErrorTerm, errorMessageTerm] = useChangeInputConfig("Search")
    const [address, addressOnChange, isErrorAddress, errorMessageAddress] = useChangeInputConfig("Location")
    const [yelp, setYelp] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [session, setSession] = useState(false)
    const [disabledSearch, setDisabledSearch] = useState(true)
    const [sortRating, setSortRating] = useState(false)
    const [sortPrice, setSortPrice] = useState(false)
    

    useEffect(async() => {
        setIsLoading(true)
        if(window.sessionStorage.getItem("address")){
            setSession(true)
            let oldTerm = window.sessionStorage.getItem("term")
            let oldAddress = window.sessionStorage.getItem("address")
            let result = await axios.get(`http://localhost:3000/api/yelp/get-yelp-api?term=${oldTerm}&address=${oldAddress}`)
            console.log(result)
            setYelp(result.data.businesses)
            setIsLoading(false)
        } else{
            setIsLoading(false)
        }
    }, [])


    useEffect(() => {
        if(term.length!==0 && address.length!==0){
            setDisabledSearch(false)
        } else{
            setDisabledSearch(true)
        }
    }, [term, address])


    async function handleSearch(){
        try {
            if(term.length===0){
                setDisabledSearch(true)
            } else {
                setSession(true)
                setDisabledSearch(false)
                setIsLoading(true)
                let result = await axios.get(`http://localhost:3000/api/yelp/get-yelp-api?term=${term}&address=${address}`)
                console.log(result)
                setYelp(result.data.businesses)
                window.sessionStorage.setItem("address", address)
                window.sessionStorage.setItem("term", term)
                setIsLoading(false)
            }
        } catch (e) {
            setIsLoading(false)
            console.log(e)
        }
    }

            return (
                <React.Fragment>
                    <div style={{display:"flex", justifyContent:"center", marginTop:"75px", marginBottom:"80px"}}>
                        <div style={{display:"flex", flexDirection:"column"}}>
                            <input style={{height:"30px", width:"400px", marginRight:"5px", fontSize:"16px", borderColor:"red"}} value={term} name="term" onChange={termOnChange} onBlur = {termOnChange} placeholder="Search restaurants"/>
                            <span style={{color:"red"}}>{isErrorTerm && errorMessageTerm}</span>
                        </div>
                        <div style={{display:"flex", flexDirection:"column"}}>
                            <input style={{width:"200px",marginRight:"5px",height:"30px", fontSize:"16px", borderColor:"red"}} value={address} name="address" onChange={addressOnChange} onBlur = {addressOnChange} placeholder="Enter search location"/>
                            <span style={{color:"red"}}>{isErrorAddress && errorMessageAddress}</span>
                        </div>
                        <button style={{width:"125px", color:"white", height:"35px", fontSize:"18px", borderRadius:"4px"}} onClick={handleSearch} disabled={disabledSearch}>Search</button>
                    </div>
                    <div>
                        {!session && (<h1 style={{textAlign:"center", color:"grey", marginTop:"200px", fontSize:"60px"}}>Search restaurants, food, venues</h1> )}
                        <ul>
                        {isLoading ? (<Spinner />)
                        : (yelp?.map((item)=>{
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
                        )
                        }
                        
                    
                        </ul>
                        
                    </div>
                </React.Fragment>
            )
        }

export default Protected
