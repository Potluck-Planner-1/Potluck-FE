import React from "react";

export const initialState = {
  tasks: [ 
    {
      item: 'add food plz!!!',
      completed: false,
      id: Date.now(), 
    }
  ]
 
}


export const reducer = (state, action) => {
 
  switch (action.type) {

    case 'ADD_TODO':
      const newTodo = {
        item: action.payload,
        completed: false,
        id: Date.now(),
      };
        return  {...state,
                  tasks: [...state.tasks, newTodo]
        };
    

    case 'TOGGLE_COMPLETED':
      return {
          ...state,
          tasks: state.tasks.map ((foodItem) => {
              if( foodItem.id=== action.payload){
                return {...foodItem,
                        completed: !foodItem.completed 
                      }              

              } else{
                  return foodItem
                }
          })
      }


    case 'CLEAR_COMPLETED':
      return {...state,
              tasks: state.tasks.filter((foodItem) => !foodItem.completed),
            
            
            }

    default:
      return state;
      
  }
}


