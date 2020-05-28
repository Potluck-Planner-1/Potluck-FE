import React, { useState, useEffect }from "react";

// import NewPotluckInfoForm from './NewPotluckInfoForm'
import { axiosWithAuth } from "../utils/AxiosWithAuth";

import styled from 'styled-components'




export default function PotluckInfoCard(props) {

 const [potLucks, setPotLucks] = useState([])
    console.log(potLucks, '??POTLUCKINFO data????????')

    
    useEffect(() => {
        axiosWithAuth()
        .get('/api/user/id')
        .then(res => {
            console.log(res, 'what we have here???!!!!????')
            setPotLucks(res.data);
            })
        .catch(err => {console.log(err);
        });
    }, []);

    const deletePotluckEvent = color => {
        axiosWithAuth()
        .delete(`/api/user/${potLucks.id}`)
        .then(res => {
          const newPotluckList = potLucks.filter((potluck) => {
             return potluck.id !== res.data
          })
          setPotLucks(newPotluckList)
        })
        .catch(err => console.log(err))
    };

    return(
        <div>
            {/* <NewPotluckInfoForm/> */}
            <div>
                {potLucks.map((potLuck) => {
                    return (
                        <div key={potLuck.id}>
                            <h3>Event Name: {potLuck.eventName}</h3>
                            <p>Location: {potLuck.location }</p>
                            <p>Date: {potLuck.date}</p>
                            <p>Time: {potLuck.time}</p>
                        </div>    
                    )
                })}
                 <button onClick = {e => {
                    e.stopPropagation();
                    deletePotluckEvent(potLucks.id)
                 }}> Delete Potluck Event </button>
            </div>
        </div>
    )




}
