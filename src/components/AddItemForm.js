import React, {useState} from "react";
import styled from 'styled-components'
import { axiosWithAuth } from "../utils/AxiosWithAuth";

const ItemFormContainer = styled.div`
border: 1px solid gray;
margin: 0  6rem;
padding: 1rem;
width: auto;
`





const AddItemForm = (props) => {
    const [item, setItem] = useState('');
    console.log(item, '??Item???????')

    const {addTask, clearCompleted} = props

    const handleChange = (event) => {
        setItem(event.target.value)
      }

    const handleSubmit = (event) => {
        event.preventDefault();
        addTask(item);
        axiosWithAuth()
            .post('/api/user/event/id', item)
            .then(res => {
                console.log(res, 'Posting New potluck success???????????')
             })
            .catch(err => {
                console.log(err)
            });
        setItem('');
    };
   
    return (
         <ItemFormContainer> 
            <form onSubmit = {handleSubmit}>
            <button > Add Food Item</button> 
                    <input
                            onChange = {handleChange}
                            type = 'text'
                            name = 'item'
                            value = {item}
                            />
                
            </form>
            <button  onClick = {clearCompleted}>Remove Food</button>

        </ItemFormContainer>  
    )


}
export default AddItemForm