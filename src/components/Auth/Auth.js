import React from 'react'
import {makeStyles} from "@material-ui/core/styles"
import {Grid, 
    Button, 
    TextField, 
    CircularProgress, 
    Snackbar} from "@material-ui/core"
import MuiAlert from "@material-ui/lab/Alert"
import useChangeInputConfig from '../hooks/useInput'
import useFetchAPI from '../hooks/useFetchAPI'
import checkAuthCookie from '../hooks/checkAuthCookie'
import "./Auth.css"

const useStyles = makeStyles((theme)=>({
root:{
    "& > *":{
        margin:theme.spacing(1),
        width:"25ch"
    }
}
}))

function Auth(props) {
    const classes = useStyles()
    let isLoginRoute = props.match.path==="/login"
    let buttonTitle = isLoginRoute ? "Login":"Sign up"
    let apiURL = isLoginRoute? "/users/login":"/users/sign-up"

    const {checkIfCookieExists} = checkAuthCookie()

    const [{
        isLoading, response, error, setResponse
    }, 
    handleAPICallButtonSubmit,
    isMessageOpen,
    handleMessageClose,
    ,
    successMessageValue] = useFetchAPI(apiURL)

    const [email, handleEmailChange, isEmailError, emailErrorMessage, isEmailDisabled, clearEmailInput] = useChangeInputConfig("email")
    const [emailUsername, handleEmailUsernameChange, isEmailUsernameError, emailUsernameErrorMessage, isEmailUsernameDisabled, clearEmailUsernameInput] = useChangeInputConfig("email/username")
    const [password, handlePasswordChange, isPasswordError, passwordErrorMessage, isPasswordDisabled, clearPasswordInput] = useChangeInputConfig("password")
    const [username, handleUsernameChange, isUsernameError, usernameErrorMessage, isUsernameDisabled, clearUsernameInput] = useChangeInputConfig("username")
    const [firstName, handleFirstNameChange, isFirstNameError, firstNameErrorMessage, isFirstNameDisabled, clearFirstNameInput] = useChangeInputConfig("firstName")
    const [lastName, handleLastNameChange, isLastNameError, lastNameErrorMessage, isLastNameDisabled, clearLastNameInput] = useChangeInputConfig("lastName")
    
    async function handleOnSubmit(e){
        e.preventDefault()
        const user = isLoginRoute ? {emailUsername, password}:{firstName, lastName, username, email, password}

        handleAPICallButtonSubmit({
            method:"post",
            data:{
                ...user
            }
        })
    }

    function successMessage(){
        return(
            <Snackbar open={isMessageOpen} autoHideDuration={6000} onClose={handleMessageClose}
            style={{transform:"translateY(-500px)"}}>
                <Alert severity="success">{successMessageValue}</Alert>
            </Snackbar>
        )
    }
    
    function Alert(props){
        return <MuiAlert elevation={6} variant="filled" {...props} />
    }

    function errorMessage(){
        return(
            <Snackbar open={isMessageOpen} autoHideDuration={6000} onClose={handleMessageClose}
            style = {{transform:"translateY(-500px)"}}>
                <Alert severity="error">{error}</Alert>
            </Snackbar>
        )
    }

    if(isLoading){
        return(
            <div style={{textAlign:"center"}}>
                <CircularProgress />
            </div>
        )
    }

    if(response ==="Success - User created"){
        clearEmailInput()
        clearUsernameInput()
        clearPasswordInput()
        clearFirstNameInput()
        clearLastNameInput()
        setResponse(null)
    }
    if(response ==="Success login"){
        clearEmailUsernameInput()
        clearPasswordInput()
        setResponse(null)
    }

    if(checkIfCookieExists()){
        props.history.push("/protected")
    }

    return (
        <Grid container spacing spacing={0} justifyContent="center">
            {successMessageValue && successMessage()}
            {error && errorMessage()}
            <form className={classes.root} onSubmit={handleOnSubmit}>
                {
                    !isLoginRoute && (
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
                    )
                }
                {
                    !isLoginRoute && (
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
                    )
                }
                {
                    !isLoginRoute && (
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
                    )
                }
                 {
                    !isLoginRoute && (
                        <Grid item m={6}>
                            <TextField 
                            fullWidth 
                            label="Email" 
                            name="email" 
                            value={email} 
                            onChange={handleEmailChange}
                            error = {isEmailError}
                            helperText={emailErrorMessage}/>
                        </Grid>
                    )
                }
                 {
                    isLoginRoute && (
                        <Grid item m={6}>
                            <TextField 
                            fullWidth 
                            label="Email/Username" 
                            name="emailUsername" 
                            value={emailUsername} 
                            onChange={handleEmailUsernameChange}
                            error = {isEmailUsernameError}
                            helperText={emailUsernameErrorMessage}/>
                        </Grid>
                    )
                }
                <Grid item m={6}>
                <TextField 
                fullWidth 
                label="Password" 
                name="password" 
                value={password} 
                onChange={handlePasswordChange}
                error = {isPasswordError}
                helperText={passwordErrorMessage}/>
                </Grid>
                <Grid style={{textAlign:"center"}}>
                    <Button type="submit" variant="contained" color="primary" className="submitButton"
                    style={{marginTop:10}} disabled={isLoginRoute? isEmailUsernameDisabled || isPasswordDisabled 
                    : isEmailDisabled || isPasswordDisabled || isUsernameDisabled||isFirstNameDisabled || isLastNameDisabled}>{buttonTitle}</Button>
                </Grid>
            </form>
        </Grid>
    )
}

export default Auth
