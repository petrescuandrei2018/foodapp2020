

import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import { Card, Form, Input, Button, Success } from "./AuthForm";
import { useAuth } from "../Auth";

function Signup() {
  // const [isLoggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isCreated, setIsCreated] = useState(false);

  const { setAuthTokens } = useAuth();

  function postSignUp() {
    axios.post("http://localhost:3000/addAuthUser", {
      userName,
      password
    }).then(result => {
      if (result.status === 201) {
        setAuthTokens(result.data);
        setIsCreated(true);
      }
    }).catch(e => {
      console.log(e);
    });
  }

  return (
    <Card>
      <h2>Sign up</h2>
    <Form>
      <Input
        type="username"
        value={userName}
        onChange={e => {
          setUserName(e.target.value);
        }}
        placeholder="email"
      />
      <Input
        type="password"
        value={password}
        onChange={e => {
          setPassword(e.target.value);
        }}
        placeholder="password"
      />
      <Button onClick={postSignUp}>Sign up!</Button>
    </Form>
    { isCreated &&<Success>You can now login!</Success> }
    <Link to="/login">Already have an account?</Link>
  </Card>
  );
}

export default Signup;
