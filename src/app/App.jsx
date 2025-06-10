import "./App.scss";
import ToDoList from "../modules/todolist";
import TodoInput from "../modules/todolist_input";
import useGetData from "../shared/api/getDataFromApi.jsx";

function App() {
   const { data, isLoading, isError, error } = useGetData();

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

         <ToDoList todoTasksData={data} />
      </div>
   );
}

export default App;
