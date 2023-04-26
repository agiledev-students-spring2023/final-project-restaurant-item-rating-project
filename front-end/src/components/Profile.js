import { Avatar, Box, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const serverAddress = "http://localhost:3002";

export function Profile() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const [storedId, setStoredId] = useState("");

useEffect(() => {
  const id = localStorage.getItem('userId');
  if (id) {
    setStoredId(id);
    axios.get(`${serverAddress}/profile/${id}`).then(response => {
      const { email, password,avatarUrl } = response.data;
      setEmail(email);
      setPassword(password);
      setAvatarUrl(avatarUrl);
      localStorage.setItem('avatarUrl', avatarUrl);

    }).catch(error => {
      console.log(error);
    });
  }
}, [email,password]);

  const handleUpdateEmail = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${serverAddress}/profile/${storedId}`,
        {
          email: newEmail,
        }
      );
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
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(
        `${serverAddress}/profile/${storedId}`,
        {
          password: newPassword,
        }
      );
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
    localStorage.clear();
    navigate('/login');
  };

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const avatarUrl = reader.result; // set the avatarUrl to the value from the FileReader
      setAvatarUrl(avatarUrl);
      axios.post(`${serverAddress}/avatar/${storedId}`, {
        avatarUrl: avatarUrl,
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    };
  };
  

  
  
  
    return (
        <div>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
  {avatarUrl ? (
    <label htmlFor="avatar-upload">
      <Avatar src={avatarUrl} sx={{ width: 200, height: 200 }} />
    </label>
  ) : (
    <Box sx={{ textAlign: 'center' }}>
      <Typography>Add Profile Pic</Typography>
      <label htmlFor="avatar-upload">
        <Avatar sx={{ width: 200, height: 200 }} />
      </label>
    </Box>
  )}
  <input
    type="file"
    id="avatar-upload"
    accept=".jpg,.jpeg,.png"
    style={{ display: "none" }}
    onChange={handleAvatarUpload}
  />
</Box>
      <h1>Profile</h1>
      <p
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          textAlign: "center",
        }}
      >
        Email: {email}
      </p>
      {/* <p style={{border: '1px solid #ccc', padding: '10px',textAlign: 'center'}}>Password: {maskedPassword}</p> */}
      <h2>Update Info</h2>
      <form onSubmit={handleUpdateEmail}>
        <label>
          New Email:
          <br />
          <input
            style={{ border: "1px solid #ccc", padding: "10px", width: "100%" }}
            type="email"
            value={newEmail}
            onChange={(event) => setNewEmail(event.target.value)}
          />
        </label>
        <br />
        <button style={{ marginTop: "10px" }} type="submit"  disabled={!newEmail ? true : false}>
          Update Email
        </button>
      </form>
      <form onSubmit={handleUpdatePassword}>
        <br />
        <label>
          New Password:
          <br />
          <input
            style={{ border: "1px solid #ccc", padding: "10px", width: "100%" }}
            type="password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
          />
        </label>
        <br />
        <label>
          Confirm Password:
          <br />
          <input
            style={{ border: "1px solid #ccc", padding: "10px", width: "100%" }}
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </label>
        <br />
        <button style={{ marginTop: "10px" }} type="submit"disabled={!newPassword ? true : false}>
          Update Password
        </button>
      </form>
      <button style={{ marginTop: "40px" }} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

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
