import React, { useEffect, useState } from "react";
import { Switch, TextField, Button, Alert, AlertTitle } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';


export default function Signup() {

    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState('');
    const [alertType, setAlertType] = useState('info'); // State to set alert type (success, error, info)

    const navigate = useNavigate();
    const { setLoggedInUsername, setCurrSession } = useAuth();

    const [newUserAccount, setNewUserAccount] = useState([]);

    function handleUsername(e) {
        console.log(e.target.value)
        setUsername(e.target.value)
    }

    function handleEmail(e) {
        console.log(e.target.value)
        setEmail(e.target.value)
    }

    function handlePassword(e) {
        console.log(e.target.value)
        setPassword(e.target.value)
    }

    // Inside your handleLogin function
    async function handleLogin() {
        //console.log(document.cookie);
        const loginAttempt = { username, password };
    
        try {
            // Make an HTTP POST request to your backend API
            const response = await axios.post('http://localhost:3001/api/accounts/login', loginAttempt);
    
            // Check for a successful login response from the server
            if (response.data.message === "Successfully Logged In") {
                // If successful, navigate to a different route (e.g., /dashboard)
                console.log("login worked");
                const loggedInUsername = response.data.username;
                console.log(loggedInUsername);
                setLoggedInUsername(loggedInUsername); // Update the username in the global state
                setCurrSession(response.data.sessionID);
                navigate('/'); // Use the route you want to navigate to 
            } else {
                // Handle unexpected response data
                console.error('Unexpected response data:', response.data);
            }
        } catch (error) {
            // Handle errors appropriately (e.g., show an error message to the user)
            console.error('Error Logging In:', error);
    
            if (error.response) {
                // Handle response errors with status codes here
                setMessage(error.response.data.error);
                setAlertType('error'); // Set the alert type to error for a registration error
            } else if (error.request) {
                // Handle network errors here (e.g., no response from the server)
                setMessage('Network error. Please try again later.');
                setAlertType('error');
            } else {
                // Handle other types of errors here
                setMessage('An unexpected error occurred.');
                setAlertType('error');
            }
        }
    }
    

    async function handleSignup() {
        const newAccount = { email, username, password };
        setNewUserAccount(newAccount);
    
        try {
            // Make an HTTP POST request to your backend API
            const response = await axios.post('http://localhost:3001/api/accounts/signup', newUserAccount);
    
            // Check for a successful registration response from the server
            if (response.data.message === "Successfully created account") {
                setMessage(response.data.message); // Update the message based on the server response
                setAlertType('success'); // Set the alert type to success for a successful registration
                console.log('User account data successfully added to the backend:', response.data);
                // Optionally, you can perform additional actions here
            } else {
                // Handle unexpected response data
                console.error('Unexpected response data:', response.data);
            }
        } catch (error) {
            // Handle errors appropriately (e.g., show an error message to the user)
            console.error('Error sending user account data to the backend:', error);
    
            if (error.response) {
                // Handle response errors with status codes here
                setMessage(error.response.data.error);
                setAlertType('error'); // Set the alert type to error for a registration error
            } else if (error.request) {
                // Handle network errors here (e.g., no response from the server)
                setMessage('Network error. Please try again later.');
                setAlertType('error');
            } else {
                // Handle other types of errors here
                setMessage('An unexpected error occurred.');
                setAlertType('error');
            }
        }
    }
    

    return (
        <>
        
        <div className="signup">
            <h1>Sign-Up</h1>
            <TextField id="outlined-basic" label="Email" variant="filled" onChange={handleEmail}/>
            <TextField id="outlined-basic" label="Username" variant="filled" onChange={handleUsername}/>
            <TextField
                type={showPassword ? "text" : "password"}
                placeholder="password"
                onChange={handlePassword}
            />
            <Button variant="outlined" onClick={handleSignup}>Sign-Up</Button>
        </div>
        <div className="login">
        <h1>Login</h1>
        <TextField id="outlined-basic" label="Username" variant="filled" onChange={handleUsername}/>
        <TextField
                type={showPassword ? "text" : "password"}
                placeholder="password"
                onChange={handlePassword}
        />
        <Switch onClick={() => setShowPassword(s => !s)}>Toggle Visibility</Switch>
        <Button variant="outlined" onClick={handleLogin}>Login</Button>
        </div>

        {message && (
            <Alert icon={false} severity={alertType}>
                {message}
            </Alert>
        )}
        </>
    )
}