import {render} from "@testing-library/react"
import Login from '../pages/Login'
import SignIn from "./style/LoginFormLayout";
import { useState, useEffect } from "react";

import { io } from "socket.io-client";
const socket = io.connect("http://localhost:3001");

test('unable to loginn with incorrect credentials',async () => {
    const [invalid, setInvalid] = useState('false')
    const handleSubmit = async (e) => {
        e.preventDefault();
        socket.emit("loginAttempt", 
        { username:"pughal", password:"lolol", usertype:"Student" } );
    }
    useEffect(() => {
        socket.on("recievedCredentials", (data) => {
            console.log(`CREDENTIALS SUCCESSFULLY RECIEVED`);
            setInvalid(false);
        });
        
        socket.on("invalidCredentials", () => {
            setInvalid(true);
        });
    }, [socket])
    render(<SignIn
        setUsername = {() => {return "pughal"}}
        setPassword = {() => {return "lolol"}}
        usertype = {""}
        setUsertype = {() => {return "Student"}}
        handleSubmit = {handleSubmit}
        invalid = {invalid}
        setInvalid = {setInvalid}
    />)
    
    // we need to assert that invalid is set to be true
    // expect(await invalid == True)
})

test("unable to login with incorrect credentials", () => {
    render(<Login
        socket = {socket}
        quotas = {"O"}
        setQuotas = {() => {}}
    />)
})