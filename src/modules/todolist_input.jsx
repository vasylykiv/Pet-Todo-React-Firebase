import { useState, useEffect } from "react";
import useSendData from "../shared/api/sendDataToApi";

export default function TooInput() {
   const [inputValue, setInputValue] = useState("");
   const { mutate, isPending, isError, error } = useSendData();

   useEffect(() => {
      if (!isPending && !isError && !error) {
         setInputValue(""); // Очищаємо поле після успішного запиту
      }
   }, [isPending, isError, error]);

   return (
      <form onSubmit={handleSubmit} className="todo__form">
         <input name="task name input" onChange={handleChange} value={inputValue} className="todo__input" type="text" placeholder="Enter your task" />
         <input className="todo__button" type="submit" value="Save" />
      </form>
   );

   /*-----------------// Handlers //-----------------*/
   function handleSubmit(e) {
      e.preventDefault();
      const sendingData = {
         taskBody: inputValue,
         isComplete: false,
         completeAt: 0,
      };

      if (inputValue.trim()) {
         mutate({ data: sendingData });
      }
   }

   function handleChange(e) {
      const inputText = e.target.value;
      setInputValue(inputText);
   }
}
