import axios from 'axios';
import { FaArrowAltCircleRight } from "react-icons/fa";
import React, { useRef, useState } from 'react';
import s from"./Ai.module.css"
const Ai = () => {
    let [text, settext] = useState("")
    let [loading, setLoading] = useState(false);
    let inputref = useRef("");

    const handleSubmit = (e) => {
        e.preventDefault();
        settext(inputref.current.value);
        apifetch();
    };

    let Apikey = 'AIzaSyAo0XS96F_F0DHgQoCtWKpY2dwbW-YQQJg';
    const apifetch = async () => {
        setLoading(true);
        try {
            let response = await axios({
                url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${Apikey}`,
                method: "post",
                data: {
                    contents: [{ parts: [{ text: inputref.current.value }] }],
                }
            });
            //   console.log(response);
              console.log(response.data.candidates[0].content.parts[0].text); 
            settext(response.data.candidates[0].content.parts[0].text)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        finally {
            setLoading(false);
        }
    };
    let handlePress =(e)=>{
        // console.log(e.key);
        
        if(e.key === "Enter"){
            handleSubmit(e)
        }
        
    }
    return (
        <>
            <div className={s.cont}>
                <input
                    type="text"
                    ref={inputref}
                    onKeyDown={handlePress}
                    placeholder='Enter the Prompt'
                />
                <button 
                onClick={handleSubmit}>
                   search
                </button>
            </div>
            {loading ? (<div><p>Loading...</p></div>) : (<div><pre>{text}</pre></div>)}
        </>
    )
}
export default Ai
