import { useRef, useState } from 'react';

function App() {

  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState(["Eat", "Sleep", "Repeat"]);
  const inputRef = useRef();

  const toggle = () => {

    setIsOpen((value) => {return (value)? false : true})

  }

  return (
      <main className="m-4"> {/* Tailwind: margin level 4 on all sides */}

        <Modal headerLabel="Add New Task"><AddTaskForm></AddTaskForm></Modal>
        <div className="relative z-10">
          
          <section>
              <button
              onClick={toggle}
              class="cursor-pointer whitespace-nowrap px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 active:bg-blue-800 transition duration-150 shadow-sm"
              >Add task</button>
              <h1 className="text-xl font-bold">To do</h1>
              <ul>
                  {tasks.map((task, index) => (
                    <TodoItems key={index} name={task} index={index}></TodoItems>
                  ))}
              </ul>
          </section>
        </div>
      </main>
  );

  function Modal(props) {

    if(isOpen)
      return (
        <div className="fixed inset-0 bg-gray-500/75 flex items-center justify-center z-15">
          <div className="bg-white bg-opacity-75 backdrop-blur-sm pr-2 pl-2 pb-2 rounded shadow-lg">
            <div className="flex pb-2">
            <h2 className="mr-auto mb-auto">{props.headerLabel}</h2>
            <button onClick={toggle} aria-label="Close" className="ml-auto mb-auto text-red-500 cursor-pointer">X</button>
            </div>
            
            <p>{props.children}</p>
          </div>
        </div>
      );
    else
      return null;
  }

  function AddTaskForm(props){

    const handleAddTask = () => {
      const value = inputRef.current.value.trim();
      if (value === "") return;
      setTasks((prev) => [...prev, value]);
      inputRef.current.value = ""; 
    };

    return(

      <div className="w-full max-w-[320px] h-[5vh] flex gap-2"> {/* Unfortunately comments in JSX have to be done like this */}
          <input 
              ref={inputRef}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              placeholder="New task name"/>
          <button
              onClick={handleAddTask}
              class="cursor-pointer whitespace-nowrap px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 active:bg-blue-800 transition duration-150 shadow-sm"
          >Add task</button>
      </div>

    );

  }

  
  function TodoItems(props){

    return(

      <li >
          <label>
              <input type="checkbox"/> {props.name}
          </label>
          <button onClick = {() => deleteTask(props.index)} className="ml-2 cursor-pointer">🗑️</button>
      </li>

    );

  }

  function deleteTask(indexToDelete) {
    setTasks(prevTasks => prevTasks.filter((_, index) => index !== indexToDelete));
  }
}



export default App;