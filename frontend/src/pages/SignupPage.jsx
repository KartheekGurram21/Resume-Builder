import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/joy/Card';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import axios from 'axios';


function SignUpPage() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");

  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCredentials({
      ...credentials,
      [name]: value
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    axios.post('http://localhost:3001/api/user/signUp', { userName: credentials.username, password: credentials.password, confirmPassword: credentials.confirmPassword })
      .then(res => {
        console.log(res.userName)
      })
      .catch(err => {
        console.log(err.response.data);
        setError(err.response.data.error);
      })
  }



  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card variant="outlined" style={{ width: '300px' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h1 style={{ alignSelf: 'center' }}>SignUp</h1>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ marginBottom: '5px' }}>
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
              <div style={{ marginBottom: '5px' }}>
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
              <div style={{ marginBottom: '15px' }}>
                <h3>Confirm Password</h3>
                <Input
                  placeholder="Confirm password"
                  value={credentials.confirmPassword}
                  onChange={handleChange}
                  name="confirmPassword"
                  type="password"
                  variant="outlined"
                  size='lg'
                  color='primary'
                />
              </div>
              {error && <p style={{ color: "red", marginBottom: "13px" }}>{error}</p>}
              <div style={{ alignSelf: 'center', marginBottom: "10px" }}>
                <Button variant='outlined' type='submit'>SignUp</Button>
              </div>
              <h5>Already have an account</h5>
              <Button variant='outlined' onClick={() => navigate("/login")}>Login</Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}

export default SignUpPage;