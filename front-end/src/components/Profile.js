import { useEffect, useState } from 'react';
import { Redirect, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Avatar } from '@mui/material';


const serverAddress = "http://localhost:3002";

export function Profile() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    

    const [storedId, setStoredId] = useState('');

useEffect(() => {
  const id = localStorage.getItem('userId');
  if (id) {
    setStoredId(id);
    axios.get(`${serverAddress}/profile/${id}`).then(response => {
      const { email, password } = response.data;
      setEmail(email);
      setPassword(password);
    }).catch(error => {
      console.log(error);
      // handle error
    });
    const storedAvatarUrl = localStorage.getItem(`avatarUrl-${id}`);
    if (storedAvatarUrl) {
      setAvatarUrl(storedAvatarUrl);
    }
  }
}, [email,password]);

const handleUpdateEmail = async (event) => {
  event.preventDefault();
  try {
    const response = await axios.post(`${serverAddress}/profile/${storedId}`, {
      email: newEmail,
    });
    if (response.status === 200) {
        alert("Email successfully changed");
        setEmail(newEmail);
    }
  } catch (error) {
    console.log(error);
    // handle error
  }
};

const handleUpdatePassword = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${serverAddress}/profile/${storedId}`, {
        password: newPassword,
      });
      if (response.status === 200) {
        alert("Password successfully changed");
        setPassword(newPassword);
      }
    } catch (error) {
      console.log(error);
      // setError(true);
    }
  };

  const handleLogout = () => {
    // logout logic
    navigate('/login');
  };

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const avatarUrl = reader.result;
      setAvatarUrl(avatarUrl);
  
      // clear old avatar URLs for the current user
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('avatarUrl-') && key !== `avatarUrl-${storedId}`) {
          localStorage.removeItem(key);
        }
      });
  
      // update the avatarUrl for the user logged in
      axios.post(`${serverAddress}/avatar/${storedId}`, {
      })
      .then(response => {
        localStorage.setItem(`avatarUrl-${storedId}`, avatarUrl);
      })
      .catch(error => {
        console.log(error);
      });
    };
  };
  
  
  
    return (
        <div>
             <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
        <label htmlFor="avatar-upload">
          <Avatar src={avatarUrl} sx={{ width: 200, height: 200 }} />
        </label>
        <input
          type="file"
          id="avatar-upload"
          accept=".jpg,.jpeg,.png"
          style={{ display: 'none' }}
          onChange={handleAvatarUpload}
        />
      </Box>
          <h1>Profile</h1>
          <p style={{border: '1px solid #ccc', padding: '10px',textAlign: 'center'}}>Email: {email}</p>
          {/* <p style={{border: '1px solid #ccc', padding: '10px',textAlign: 'center'}}>Password: {maskedPassword}</p> */}
          <h2>Update Info</h2>
          <form onSubmit={handleUpdateEmail}>
            <label>
              New Email:
              <br />
              <input
                style={{border: '1px solid #ccc', padding: '10px', width: '100%'}}
                type="email"
                value={newEmail}
                onChange={(event) => setNewEmail(event.target.value)}
                onKeyDown={(event) => {
                    if (event.keyCode === 13) {
                      handleUpdateEmail();
                    }
                  }}
                />
              </label>
            </form>
          <form onSubmit={handleUpdatePassword}>
            <br />
            <label>
              New Password:
              <br />
              <input
                style={{border: '1px solid #ccc', padding: '10px', width: '100%'}}
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
              />
            </label>
            <br />
            <button style={{marginTop: '10px'}} type="submit">Update Password</button>
          </form>
          <button style={{marginTop: '40px'}} onClick={handleLogout}>Logout</button>
        </div>
      );
      
      
  };


   // useEffect(() => {
    //     const storedId = localStorage.getItem('userId');
    //     console.log(storedId);
    //     const storedEmail = localStorage.getItem('email');
    //     const storedPassword = localStorage.getItem('password');
    //     const storedAvatarUrl = localStorage.getItem(`avatarUrl-${storedEmail}`);      
    //     if (storedEmail) {
    //       setEmail(storedEmail);
    //       setPassword(storedPassword);
    //       setAvatarUrl(storedAvatarUrl); 

    //   }
    // }, [email,password]);