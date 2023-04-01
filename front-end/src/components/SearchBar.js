
import React, {useState} from "react";
import { FaSearch } from "react-icons/fa";
import './SearchBar.css';
import { useAsyncError } from "react-router-dom";

function SearchBar(){

    const [input, setInput] = useState("")

    const fetchData = (value) =>{
        fetch("https://my.api.mockaroo.com/restaurants/123.json?key=fc5ecd60")
        .then((response) => response.json())
        .then((json) =>{
            const results = json.filter((user)=> {
                return(

                    value &&
                    user &&
                    user.name &&
                    user.name.toLowerCase().includes(value)

                );
            });
            console.log(json);
        });
    }

    const handleChange = (value) =>{
        setInput(value);
        fetchData(value);
    };

    return(
        <div className = "input-wrapper">
            <FaSearch id = "search-icon" />
            <input placeholder = "Type to search desired restaurant..." v
            alue = {input} 
            onChange={(e) => setInput(e.target)}/>
        </div>
    );
  }

  export default SearchBar;