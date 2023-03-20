import { Box, Typography } from "@mui/material";
import React, {useReducer, useState} from 'react';
import Rating from './Rating';
import "./stars.css"
import './front-end/src/App.css'
//.....................................//

const formReducer = (state, event) =>{
  return {
    ...state,
    [event.name]: event.value
  }
}

const handleChange = event =>{
  setFormData({
    name: event.target.name,
    value: event.target.value,
  });
}

export function App() {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);
    const handleSubmit = event => {
        event.preventDefault();
        setSubmitting(true);
        alert('Restaurant Information submitted')
        
        setTimeout(() => {
            setSubmitting(false);
          }, 3000)
    
  }
  
 return(
  <div className = "Wrapper">
    <h1 className = "pagetitle">Add a Restaurant</h1>
    {submitting &&
        <div>You are submitting the folowing Restaurant information：
          <ul> {Object.entries(formData).map(([name, value]) => (
             <li key={name}><strong>{name}</strong>:{value.toString()}</li>
           ))}</ul>
        </div>
      }
    <form onSubmit ={handleSubmit}>
      <div>
      <label>
        <p>Restaurant Name</p>
        <input name ="Enter restaurant name" onChange = {handleChange}/>
      </label>
      </div>
      <div>
      <label>
        <p>City</p>
        <input name ="Enter city"/>
      </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
 )

  


}
export default App; 