import React from 'react'
import axios from "axios"
import Cookie from "js-cookie"
import useChangeInputConfig from '../hooks/profileInput'
import {makeStyles} from "@material-ui/core/styles"
import {Grid, 
    Button, 
    TextField, 
    } from "@material-ui/core"
import MuiAlert from "@material-ui/lab/Alert"

const useStyles = makeStyles((theme)=>({
    root:{
        "& > *":{
            margin:theme.spacing(1),
            width:"25ch"
        }
    }
    }))

function Profile() {
    const classes = useStyles()

    const [email, handleEmailChange, isEmailError, ,emailErrorMessage, ,isEmailDisabled, clearEmailInput] = useChangeInputConfig("Email")
    const [password, handlePasswordChange, isPasswordError, ,passwordErrorMessage, ,isPasswordDisabled, clearPasswordInput] = useChangeInputConfig("Password")
    const [username, handleUsernameChange, isUsernameError, ,usernameErrorMessage, ,isUsernameDisabled, clearUsernameInput] = useChangeInputConfig("Username")
    const [firstName, handleFirstNameChange, isFirstNameError, ,firstNameErrorMessage, ,isFirstNameDisabled, clearFirstNameInput] = useChangeInputConfig("First name")
    const [lastName, handleLastNameChange, isLastNameError, ,lastNameErrorMessage, ,isLastNameDisabled, clearLastNameInput] = useChangeInputConfig("Last name")
    
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
            <Grid container spacing spacing={0} justifyContent="center">
                {/* {successMessageValue && successMessage()}
                {error && errorMessage()} */}
                <form className={classes.root} onSubmit={handleUpdate}>
                <Grid>
                    <h2 style={{marginTop:"100px"}}>Change profile</h2>
                </Grid>
            
                    <Grid item m={6}>
                        <TextField 
                        fullWidth 
                        label="First name" 
                        name="firstName" 
                        value={firstName} 
                        onChange={handleFirstNameChange}
                        error = {isFirstNameError}
                        helperText={firstNameErrorMessage}/>
                    </Grid>

            
                    <Grid item m={6}>
                        <TextField 
                        fullWidth 
                        label="Last name" 
                        name="lastName" 
                        value={lastName} 
                        onChange={handleLastNameChange}
                        error = {isLastNameError}
                        helperText={lastNameErrorMessage}/>
                    </Grid>

                    <Grid item m={6}>
                        <TextField 
                        fullWidth 
                        label="Username" 
                        name="username" 
                        value={username} 
                        onChange={handleUsernameChange}
                        error = {isUsernameError}
                        helperText={usernameErrorMessage}/>
                    </Grid>

                    <Grid item m={6}>
                        <TextField 
                        fullWidth 
                        label="Email" 
                        name="email" 
                        type="email"
                        value={email} 
                        onChange={handleEmailChange}
                        error = {isEmailError}
                        helperText={emailErrorMessage}/>
                    </Grid>

                    
                    <Grid item m={6}>
                    <TextField 
                    fullWidth 
                    label="Password" 
                    name="password" 
                    value={password} 
                    onChange={handlePasswordChange}
                    error = {isPasswordError}
                    helperText={passwordErrorMessage}
                    type="password"
                    />
                    </Grid>
                    
                    <Grid style={{textAlign:"center"}}>
                        <Button type="submit" variant="contained" color="primary" className="submitButton"
                        style={{marginTop:10, backgroundColor:"red"}}>Submit</Button>
                    </Grid>

                    <Grid>
                    <div style={{color:"red", textAlign:"center", width:"250px", marginTop:"50px", textDecoration:"underline"}}>Delete profile</div>

                    </Grid>
                </form>
        </Grid>
       
    )
}

export default Profile
