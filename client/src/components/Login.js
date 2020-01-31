import React,{ useState } from "react";
import axios from 'axios'

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [credentials, setCredentials] = useState ({email: "", password: ""});

  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  }

  const login = e => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/login", credentials)
      .then( res => {
        console.log("this is the API response", res)
        localStorage.setItem("token", res.data.payload)
        props.history.push("/home")
      })
      .catch(err => console.log(err))
  };
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={login}>
          <input
             type="text"
             name="username"
             value={credentials.username}
             onChange={handleChange}
                />
           <input
               type="password"
               name="password"
               value={credentials.password}
              onChange={handleChange}
            />
            <button onClick={login}>Log in</button>
      </form>
    </>
  );
};

export default Login;
