import { Box, Typography } from "@mui/material";
import React, {useReducer, useState} from 'react';
import Rating from './Rating';
import "./stars.css"
import './App.css'

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

function App() {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);
    const handleSubmit = event => {
        event.preventDefault();
        setSubmitting(true);
        alert('Dish Details submitted')
        
        setTimeout(() => {
            setSubmitting(false);
          }, 3000)
    
  }
}
  
 return(
  <div className = "Wrapper">
    <h1 style = {{fontSize: 20}}>Add a Dish</h1>
    <h1>Restaurant: </h1>
    <form onSubmit ={handleSubmit}>
      <div>
      <label>
        <p>Dish Name</p>
        <input name ="Enter dish name" onChange = {handleChange}/>
      </label>
      </div>
      <View style ={{flexDirection: "row"}}>
      <p>Vegan? </p>
      <view className = "buttonStyle">
      <Button style ={{width: "15px", height: "10px"}}>Yes</Button>
      </view>
      <view className = "buttonStyle">
      <Button style ={{width: "15px", height: "10px"}}>No</Button>
      </view>
      </View>
      <View style ={{flexDirection: "row"}}>
      <p>Gluten Free? </p>
      <view className = "buttonStyle">
      <Button style ={{width: "15px", height: "10px"}}>Yes</Button>
      </view>
      <view className = "buttonStyle">
        <Button style ={{width: "15px", height: "10px"}}>No</Button>
      </view>
      </View>
      <div>
      <label>
        <p>Add Pictures?</p>
        <Button style ={{width: "15px", height: "10px"}}>Add Image</Button>
        <span style={{ fontWeight: 'bold' }}>Uploaded images: </span>
      </label>
      </div>
      <button type="submit" style ={{width: "30px", height: "10px"}}>Submit</button>
    </form>
  </div>
 )

  




export default App; 