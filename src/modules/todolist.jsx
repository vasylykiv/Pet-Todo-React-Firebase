import ToDoItem from "./todolist_item.jsx";

export default function ToDoList({ todoTasksData }) {
   const todoTasksSorted = sortData(todoTasksData);

   return (
      <ul className="todolist">
         {todoTasksSorted.map((task) => {
            return <ToDoItem key={task.id} taskData={task} />;
         })}
      </ul>
   );

   /*-----------------// Functions //-----------------*/
   function sortData(data) {
      const todoTasksDataClone = structuredClone(data);

      return todoTasksDataClone.sort((a, b) => {
         if (a.isComplete === b.isComplete) {
            if (a.isComplete) {
               return b.completeAt - a.completeAt;
            }

            return -1;
         }
         return a.isComplete ? 1 : -1;
      });
   }
}
