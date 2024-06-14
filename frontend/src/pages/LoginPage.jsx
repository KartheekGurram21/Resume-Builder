import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/joy/Card';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import axios from 'axios';


function LoginPage() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate()
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCredentials({
      ...credentials,
      [name]: value
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    axios.post('https://resumebuilder-8kmu.onrender.com/api/user/login', { userName: credentials.username, password: credentials.password})
      .then(res => {
        sessionStorage.setItem('user', JSON.stringify(res.data))
        console.log(res.data.userName)
        navigate("/")
      })
      .catch(err => {
        console.log(err.response.data);
        setError(err.response.data.error);
      })
  }



  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '85vh' }}>
      <Card variant="outlined" style={{ width: '300px' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* <div style={{color:"#000", background:"#ddd",display:'flex',borderRadius:"20px 20px 0px 0px",justifyContent:"center"}}> */}
            <h1 style={{ alignSelf:"center"}}>Login</h1>
          {/* </div> */}
          <form onSubmit={handleSubmit}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{marginBottom:"5px"}}>
                <h3>Username</h3>
                <Input
                  placeholder="Enter username"
                  value={credentials.username}
                  name="username"
                  onChange={handleChange}
                  variant="outlined"
                  size='lg'
                  color='primary'
                />
                {/* {errors.name && <p style={{ color: "red", fontSize: "13px" }}>{errors.name}</p>} */}
              </div>
              <div style={{ marginBottom: '15px' }}>
                <h3>Password</h3>
                <Input
                  placeholder="Enter password"
                  value={credentials.password}
                  onChange={handleChange}
                  name="password"
                  type="password"
                  variant="outlined"
                  size='lg'
                  color='primary'
                />
                {/* {errors.password && <p style={{ color: "red", fontSize: "13px" }}>{errors.password}</p>} */}
              </div>
              {error && <p style={{ color: "red", marginBottom: "13px" }}>{error}</p>}
              <div style={{ alignSelf: 'center', marginBottom:"10px" }}>
                <Button variant='outlined' type='submit'>Login</Button>
              </div>
              <h5>Don't have an account</h5>
              <Button variant='outlined' onClick={() => navigate("/signup")}>SignUp</Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}

export default LoginPage;