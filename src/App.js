import { keyword } from 'chalk';
import {useState} from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import './App.css';
import _ from "lodash";
import {v4} from "uuid";
import myd from './myd';

// Will make it Component  
// Till Here
function App() {
 
const [text , setText]= useState("");
  const [data , setData]= useState(myd

// Will make it Also Component
)
// Till here ...
  const handleDragEnd=({destination, source})=>{

    console.log("Source is ",source);
    console.log("Destination is ",destination);
    if (!destination){
      console.log('Ghalat !')
      return
    }
    if (destination.index === source.index && destination.droppableId === source.droppableId){
      console.log("Hello");
      return
    }
    const itemcopy= {...data[source.droppableId].items[source.index]};
    setData(prev=>{

      prev={...prev};
      prev[source.droppableId].items.splice(source.index,1);
      
      prev[destination.droppableId].items.splice(destination.index, 0 , itemcopy);
      return prev;
    })
  
  }
  const addItem=()=>{
   setData(prev=>{
     return {
       ...prev,
    todo:{
      title:'Todo',
      items:[{
        id:v4(),
        name:text
      },
    ...prev.todo.items
    ]
    }}
   })
    setText('');
  }
  return (
    <>
    <div className="App">
     
    <DragDropContext onDragEnd={handleDragEnd}>
    {_.map(data , (s,key)=>
    {
      return(
        
    <div className={'column'}  key={key}>
       <h3 >{(s.title)}</h3>
       <Droppable droppableId={key}>
        {(provided)=>{

          return(

            <div 
             
            ref= {provided.innerRef}
            {...provided.droppableProps}
            {...provided.dragHandleProps}
            
            className={"droppable-col"}
        
            >
               {s.items.map((el, index)=>{

                 return (
                   <Draggable key={el.id} index={index} draggableId={el.id}>
                     {(provided, snapshot)=>{
                     
                     return(
                       <div
                       className={`item ${snapshot.isDragging && "dragging"}`}
                       ref={provided.innerRef}
                       {...provided.draggableProps}
                       {...provided.dragHandleProps}
                       >

                     {el.name}
                       </div>
                     )

                     }}
                   </Draggable>
                 )
               })}
               {provided.placeholder}
            </div>

          )

        }}
    </Droppable>
    </div>)
    }
    )}
    </DragDropContext>
    </div>
    <div className="tx" >
        <input type="text" value={text} onChange={(e)=>setText(e.target.value)} />
        <button onClick={addItem}>Add</button>
      </div>
    </>
  );
}

export default App;
