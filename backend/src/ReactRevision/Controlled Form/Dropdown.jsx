import { div } from "framer-motion/client";
import React, { useState } from "react";

const Dropdown = ()=>{
    const [education,setEducation] = useState("")

    const handleDropdown = (e)=>{
        const{name,value} = e.target
        setEducation({[name]:value})
    }
    const handleForm= (e)=>{
        e.preventDefault()
        console.log(value)
    }
    return (
    <div>
        <form action= "" onSubmit={handleForm}>
<label htmlFor="education"> Choose your Education</label>
<select id = "education" value={education} onChange={handleDropdown}>
            <option value="">Select your education</option>
            <option value="highschool">High School</option>
            <option value="bachelor">Bachelor's Degree</option>
            <option value="master">Master's Degree</option>
        </select>
        </form>
        
    <button type="submit">Submit</button>
    </div>
    )
}