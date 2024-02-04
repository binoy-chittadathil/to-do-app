import { useEffect, useState } from 'react';
import './App.css'

function App() {
  const [todo,setTodo]=useState('');
  const [todos,setTodos]=useState([]);
  const [toggleSubmit,setToggleSubmit]=useState(true);
  const [isEditItem,setIsEditItem]=useState(null);
  const [currentDay,setCurrentDay]=useState('')

  useEffect(()=>{
    const currentDate = new Date();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    setCurrentDay(daysOfWeek[currentDate.getDay()])

  },[])

  const add=()=>{
    setTodos(
      todos.map((elem)=>{
        if(elem.id===isEditItem){
          return {...elem,text:todo}
        }
        return elem
      })
    )
    setTodo('');
    setToggleSubmit(true)
  }

const editItem=(id)=>{
  let newEditItem=todos.find((todosObj4)=>{
    return todosObj4.id===id
  })
  setToggleSubmit(false);
  setTodo(newEditItem.text)
  setIsEditItem(id);
  
}

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's {currentDay} 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input value={todo} onChange={(e)=>setTodo(e.target.value)} type="text" placeholder="🖊️ Add item..." />
        {
          toggleSubmit ? <i onClick={()=>{setTodos([...todos,{id:Date.now(),text:todo,status:false}]);setTodo('')} } className="fas fa-plus"></i> :
          <i className="fa-regular fa-pen-to-square" onClick={()=>add()}></i>
        }
      </div>
      <div className="todos">
        {
          todos.map((todosObj,index)=>{
            return (
              <div className="todo" key={index}>
          <div className="left">
            <input value={todosObj.status} onChange={(e)=>{setTodos(todos.filter((todosObj2)=>{if(todosObj2.id===todosObj.id){
              todosObj2.status=e.target.checked
            }
            return todosObj2
            }))}} type="checkbox" name="" id="" />
            <p>{todosObj.text}</p>
          </div>
          <div className="right">
            <i className="fa-regular fa-pen-to-square" onClick={()=>editItem(todosObj.id)}></i>
            <i onClick={()=>setTodos(todos.filter((todosObj3)=>{return (todosObj.id!==todosObj3.id)}))} className="fas fa-times"></i>
          </div>
        </div>
            )
          })
            
        }
        
      </div>
    </div>
  );
}

export default App;
