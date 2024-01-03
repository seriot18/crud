import React, { useState } from 'react';
import { isEmpty, size } from 'lodash'
import shortid from 'shortid'

function App() {

  const [task, setTask]=useState("")
  const [tasks, setTasks]=useState([])
  const [editMode, setEditMode]=useState(false)
  const [id, setId]=useState("")
  const [error, setError]=useState(null) 



  const addTask = (e) => {
    e.preventDefault()
    if (isEmpty(task)) {
      setError("Debes Ingresar una tarea.")
      return
    }
    
    const newTask = {
      id: shortid.generate(),
      name: task
    }
    
    setTasks([ ...tasks, newTask])

    setTask("")
  }



    ////////////////////////////////
    const saveTask = (e) => {
      e.preventDefault()
      if (isEmpty(task)) {
        console.log('task empty')
        return
      }
      
  
      const editedTasks = tasks.map(item => item.id===id ? {id, name: task} : item)
      setTasks(editedTasks)
      setEditMode(false)
      setTask("")
      setId("")
    }





  const deleteTask = (id) => {
    const filteredTask = tasks.filter(task => task.id != id)
    setTasks(filteredTask)
  }





  const EditTask = (thetask) =>{
    setTask(thetask.name)
    setEditMode(true)
    setId(thetask.id)
    
  }









  return (
    <div className="container mt-5">
      <h1>Tareas</h1>
      <hr/>
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de Tareas</h4>
          {
            size(tasks) == 0 ? 
            (
              <h5 className="text-center">Aun no hay tarea programadas</h5>
            ):
            (

              <ul className="list-group">
              {
                  tasks.map((task)=> (
    
                    <li className="list-group-item" key={task.id}>
                      <span 
                        className="lead">
                        {task.name}
                      </span>           
                      <button 
                        className="btn btn-danger btn-sm float-right"
                        onClick={() => deleteTask(task.id)}
                        >
                        Eliminar
                      </button>
                      <button 
                        className="btn btn-warning btn-sm float-right mx-2"
                        onClick={() => EditTask(task)}
                        >
                        Editar
                        
                      </button>
                    </li>
    
                  ))
                
              }
           </ul>



            )

          }


          



        </div>
        <div className="col-4">
        <h4 className="text-center">{editMode ? "Modificar Tarea":"Agregar Tarea"}</h4>

        <form onSubmit= {editMode ? saveTask :addTask}>
          <input type="text"  
          className="form-control mb-2"  
          placeholder="Ingrese la tarea...." 
          onChange={(text)=>setTask(text.target.value)} 
          value={task}

          >
          </input>

          <button 
            className={editMode ? "btn btn-warning btn-block" :"btn btn-dark btn-block" }
            type="submit"
          
          >{editMode ? "Guardar":"Agregar"}
          </button>

        </form>


        </div>

      </div>
    </div>
  );
}

export default App;
