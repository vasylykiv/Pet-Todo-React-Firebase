import { useState, useEffect } from "react";
import "./App.scss";
import ToDoList from "../modules/todolist";
import TodoInput from "../modules/todolist_input";
import useGetData from "../shared/api/getDataFromApi.jsx";

function App() {
   const { data, isLoading, isError, error } = useGetData();
   const [userName, setUserName] = useState("");

   useEffect(() => {
      const userNameFromLocalStorage = localStorage.getItem("userName");

      if (!userNameFromLocalStorage) {
         const name = prompt("Please enter your name:");
         if (name) {
            setUserName(name);
            localStorage.setItem("userName", name);
         }
      } else {
         // Якщо ім'я вже є в localStorage, зберігаємо його в state
         setUserName(userNameFromLocalStorage);
      }
   }, []);

   if (isLoading) {
      return <div>Loading...</div>;
   }

   if (isError) return <div>Your error is {error.message}</div>;

   return (
      <div className="container">
         <header>
            <h1 className="todo__title">TO DO LIST</h1>
            <TodoInput />
         </header>

         <ToDoList todoTasksData={data} userName={userName} />
      </div>
   );
}

export default App;
