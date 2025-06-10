import { useState, memo, useEffect, useRef } from "react";
import useEditData from "../shared/api/editDataFromApi.jsx";
import useDeleteData from "../shared/api/deleteApiData.jsx";

const ToDoItem = memo(function ToDoItem({ taskData }) {
   const [inputText, setInputText] = useState(taskData.taskBody);
   const [isEdit, setIsEdit] = useState(false);
   const formDOMElement = useRef(null);

   const { mutate: editMutate, isPending: editRequestWaiting } = useEditData(taskData.id);
   const { mutate: deleteMutate, isPending: deleteRequestWaiting } = useDeleteData(taskData.id);

   // variables class for css style
   const isCompleteClassName = taskData.isComplete ? " todo-item__complete" : "";
   const isEditClassName = isEdit ? " todo-item__edit" : "";

   if (editRequestWaiting) <div>Loading...</div>;
   if (deleteRequestWaiting) <div>Loading...</div>;

   // app logic when clicking outside the task
   useEffect(() => {
      function handleClick(e) {
         if (formDOMElement.current && !formDOMElement.current.contains(e.target) && isEdit) {
            setIsEdit(false);
         }
      }

      if (isEdit) {
         document.addEventListener("mousedown", handleClick);
      }

      if (!isEdit && inputText !== taskData.taskBody) {
         setInputText(taskData.taskBody);
      }

      return () => {
         document.removeEventListener("mousedown", handleClick);
      };
   }, [isEdit]);

   return (
      <li className={"todo-item" + isCompleteClassName + isEditClassName}>
         <h2 className="todo-item__title" aria-label="task name">
            {taskData.taskBody}
         </h2>
         {!isEdit ? (
            <p>{taskData.taskBody}</p>
         ) : (
            <form className="todo-item__form" aria-label="change task text" onSubmit={handleSubmit} ref={formDOMElement}>
               <input type="text" placeholder="Edit your task" value={inputText} onChange={handleChange} name="task change input"></input>
               <button type="submit" aria-label="confirm change data">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 40 40" fill="#0AD805">
                     <path d="M1.707 22.199L4.486 19.42 13.362 28.297 35.514 6.145 38.293 8.924 13.362 33.855z"></path>
                     <path d="M35.514,6.852l2.072,2.072L13.363,33.148L2.414,22.199l2.072-2.072l8.169,8.169l0.707,0.707 l0.707-0.707L35.514,6.852 M35.514,5.438L13.363,27.59l-8.876-8.876L1,22.199l12.363,12.363L39,8.924L35.514,5.438L35.514,5.438z"></path>
                  </svg>
               </button>
               <button aria-label="close editing" onClick={handleClickClose}>
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 40 40" fill="#FF6262">
                     <path d="M21 24.15L8.857 36.293 4.707 32.143 16.85 20 4.707 7.857 8.857 3.707 21 15.85 33.143 3.707 37.293 7.857 25.15 20 37.293 32.143 33.143 36.293z"></path>
                     <path d="M33.143,4.414l3.443,3.443L25.15,19.293L24.443,20l0.707,0.707l11.436,11.436l-3.443,3.443 L21.707,24.15L21,23.443l-0.707,0.707L8.857,35.586l-3.443-3.443L16.85,20.707L17.557,20l-0.707-0.707L5.414,7.857l3.443-3.443 L20.293,15.85L21,16.557l0.707-0.707L33.143,4.414 M33.143,3L21,15.143L8.857,3L4,7.857L16.143,20L4,32.143L8.857,37L21,24.857 L33.143,37L38,32.143L25.857,20L38,7.857L33.143,3L33.143,3z"></path>
                  </svg>
               </button>
            </form>
         )}

         <ul className="todo-item__buttons">
            {taskData.isComplete ? null : (
               <>
                  <li>
                     <button aria-label="mark a task as completed" disabled={isEdit} onClick={handleClickComplete}>
                        <svg fill="#0AD805" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                           <g clipPath="url(#clip0_101_63)">
                              <path d="M10 19.25C7.67936 19.25 5.45376 18.3281 3.81282 16.6872C2.17187 15.0462 1.25 12.8206 1.25 10.5C1.25 8.17936 2.17187 5.95376 3.81282 4.31282C5.45376 2.67187 7.67936 1.75 10 1.75C12.3206 1.75 14.5462 2.67187 16.1872 4.31282C17.8281 5.95376 18.75 8.17936 18.75 10.5C18.75 12.8206 17.8281 15.0462 16.1872 16.6872C14.5462 18.3281 12.3206 19.25 10 19.25ZM10 20.5C12.6522 20.5 15.1957 19.4464 17.0711 17.5711C18.9464 15.6957 20 13.1522 20 10.5C20 7.84784 18.9464 5.3043 17.0711 3.42893C15.1957 1.55357 12.6522 0.5 10 0.5C7.34784 0.5 4.8043 1.55357 2.92893 3.42893C1.05357 5.3043 0 7.84784 0 10.5C0 13.1522 1.05357 15.6957 2.92893 17.5711C4.8043 19.4464 7.34784 20.5 10 20.5Z" />
                              <path d="M13.7126 6.7125C13.7037 6.72113 13.6953 6.73031 13.6876 6.74L9.34631 12.2712L6.73006 9.65375C6.55234 9.48815 6.31728 9.398 6.0744 9.40228C5.83153 9.40657 5.5998 9.50496 5.42803 9.67672C5.25626 9.84849 5.15787 10.0802 5.15359 10.3231C5.1493 10.566 5.23946 10.801 5.40506 10.9788L8.71256 14.2875C8.80166 14.3764 8.90776 14.4465 9.02454 14.4936C9.14131 14.5406 9.26637 14.5637 9.39224 14.5613C9.51811 14.559 9.64223 14.5313 9.75718 14.48C9.87213 14.4286 9.97556 14.3547 10.0613 14.2625L15.0513 8.025C15.2212 7.84666 15.3141 7.60862 15.3099 7.36233C15.3057 7.11605 15.2048 6.88131 15.0289 6.70887C14.853 6.53643 14.6163 6.44014 14.37 6.44081C14.1237 6.44149 13.8875 6.53909 13.7126 6.7125Z" />
                           </g>
                           <defs>
                              <clipPath id="clip0_101_63">
                                 <rect width={20} height={20} fill="white" transform="translate(0 0.5)" />
                              </clipPath>
                           </defs>
                        </svg>
                     </button>
                  </li>
                  <li>
                     <button aria-label="edit task" onClick={handleClickEdit} disabled={isEdit}>
                        <svg fill="#04B4FF" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                           <path d="M19.3775 2.925C19.4943 3.04215 19.5599 3.20083 19.5599 3.36625C19.5599 3.53167 19.4943 3.69035 19.3775 3.8075L18.0738 5.1125L15.5738 2.6125L16.8775 1.3075C16.9947 1.19033 17.1537 1.12451 17.3194 1.12451C17.4851 1.12451 17.6441 1.19033 17.7613 1.3075L19.3775 2.92375V2.925ZM17.19 5.995L14.69 3.495L6.17376 12.0125C6.10496 12.0813 6.05317 12.1652 6.02251 12.2575L5.01626 15.275C4.99801 15.33 4.99542 15.389 5.00878 15.4454C5.02213 15.5018 5.05091 15.5534 5.0919 15.5944C5.13288 15.6353 5.18445 15.6641 5.24085 15.6775C5.29725 15.6908 5.35625 15.6882 5.41126 15.67L8.42876 14.6637C8.52097 14.6335 8.60485 14.5821 8.67376 14.5138L17.19 5.99625V5.995Z" />
                           <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M1.25 17.375C1.25 17.8723 1.44754 18.3492 1.79917 18.7008C2.15081 19.0525 2.62772 19.25 3.125 19.25H16.875C17.3723 19.25 17.8492 19.0525 18.2008 18.7008C18.5525 18.3492 18.75 17.8723 18.75 17.375V9.875C18.75 9.70924 18.6842 9.55027 18.5669 9.43306C18.4497 9.31585 18.2908 9.25 18.125 9.25C17.9592 9.25 17.8003 9.31585 17.6831 9.43306C17.5658 9.55027 17.5 9.70924 17.5 9.875V17.375C17.5 17.5408 17.4342 17.6997 17.3169 17.8169C17.1997 17.9342 17.0408 18 16.875 18H3.125C2.95924 18 2.80027 17.9342 2.68306 17.8169C2.56585 17.6997 2.5 17.5408 2.5 17.375V3.625C2.5 3.45924 2.56585 3.30027 2.68306 3.18306C2.80027 3.06585 2.95924 3 3.125 3H11.25C11.4158 3 11.5747 2.93415 11.6919 2.81694C11.8092 2.69973 11.875 2.54076 11.875 2.375C11.875 2.20924 11.8092 2.05027 11.6919 1.93306C11.5747 1.81585 11.4158 1.75 11.25 1.75H3.125C2.62772 1.75 2.15081 1.94754 1.79917 2.29917C1.44754 2.65081 1.25 3.12772 1.25 3.625V17.375Z"
                           />
                        </svg>
                     </button>
                  </li>
               </>
            )}
            <li>
               <button aria-label="delete task" disabled={isEdit} onClick={handleClickDelete}>
                  <svg fill="#FF6262" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                     <g clipPath="url(#clip0_101_57)">
                        <path d="M6.875 7.375C7.04076 7.375 7.19973 7.44085 7.31694 7.55806C7.43415 7.67527 7.5 7.83424 7.5 8V15.5C7.5 15.6658 7.43415 15.8247 7.31694 15.9419C7.19973 16.0592 7.04076 16.125 6.875 16.125C6.70924 16.125 6.55027 16.0592 6.43306 15.9419C6.31585 15.8247 6.25 15.6658 6.25 15.5V8C6.25 7.83424 6.31585 7.67527 6.43306 7.55806C6.55027 7.44085 6.70924 7.375 6.875 7.375ZM10 7.375C10.1658 7.375 10.3247 7.44085 10.4419 7.55806C10.5592 7.67527 10.625 7.83424 10.625 8V15.5C10.625 15.6658 10.5592 15.8247 10.4419 15.9419C10.3247 16.0592 10.1658 16.125 10 16.125C9.83424 16.125 9.67527 16.0592 9.55806 15.9419C9.44085 15.8247 9.375 15.6658 9.375 15.5V8C9.375 7.83424 9.44085 7.67527 9.55806 7.55806C9.67527 7.44085 9.83424 7.375 10 7.375ZM13.75 8C13.75 7.83424 13.6842 7.67527 13.5669 7.55806C13.4497 7.44085 13.2908 7.375 13.125 7.375C12.9592 7.375 12.8003 7.44085 12.6831 7.55806C12.5658 7.67527 12.5 7.83424 12.5 8V15.5C12.5 15.6658 12.5658 15.8247 12.6831 15.9419C12.8003 16.0592 12.9592 16.125 13.125 16.125C13.2908 16.125 13.4497 16.0592 13.5669 15.9419C13.6842 15.8247 13.75 15.6658 13.75 15.5V8Z" />
                        <path
                           fillRule="evenodd"
                           clirrule="evenodd"
                           d="M18.125 4.25C18.125 4.58152 17.9933 4.89946 17.7589 5.13388C17.5245 5.3683 17.2065 5.5 16.875 5.5H16.25V16.75C16.25 17.413 15.9866 18.0489 15.5178 18.5178C15.0489 18.9866 14.413 19.25 13.75 19.25H6.25C5.58696 19.25 4.95107 18.9866 4.48223 18.5178C4.01339 18.0489 3.75 17.413 3.75 16.75V5.5H3.125C2.79348 5.5 2.47554 5.3683 2.24112 5.13388C2.0067 4.89946 1.875 4.58152 1.875 4.25V3C1.875 2.66848 2.0067 2.35054 2.24112 2.11612C2.47554 1.8817 2.79348 1.75 3.125 1.75H7.5C7.5 1.41848 7.6317 1.10054 7.86612 0.866117C8.10054 0.631696 8.41848 0.5 8.75 0.5L11.25 0.5C11.5815 0.5 11.8995 0.631696 12.1339 0.866117C12.3683 1.10054 12.5 1.41848 12.5 1.75H16.875C17.2065 1.75 17.5245 1.8817 17.7589 2.11612C17.9933 2.35054 18.125 2.66848 18.125 3V4.25ZM5.1475 5.5L5 5.57375V16.75C5 17.0815 5.1317 17.3995 5.36612 17.6339C5.60054 17.8683 5.91848 18 6.25 18H13.75C14.0815 18 14.3995 17.8683 14.6339 17.6339C14.8683 17.3995 15 17.0815 15 16.75V5.57375L14.8525 5.5H5.1475ZM3.125 4.25V3H16.875V4.25H3.125Z"
                        />
                     </g>
                     <defs>
                        <clipPath id="clip0_101_57">
                           <rect width={20} height={20} fill="white" transform="translate(0 0.5)" />
                        </clipPath>
                     </defs>
                  </svg>
               </button>
            </li>
         </ul>
      </li>
   );

   /*-----------------// Handlers //-----------------*/
   function handleChange(e) {
      const changedText = e.target.value;
      setInputText(changedText);
   }

   function handleSubmit(e) {
      e.preventDefault();
      if (taskData.taskBody !== inputText) {
         editMutate({ data: { taskBody: inputText } });
      }

      setIsEdit(false);
   }

   function handleClickClose(e) {
      e.preventDefault();
      setIsEdit(false);
   }

   function handleClickEdit() {
      setIsEdit(!isEdit);
   }

   function handleClickComplete(e) {
      e.preventDefault();
      editMutate({ data: { isComplete: true, completeAt: new Date().getTime() } });
   }

   function handleClickDelete(e) {
      e.preventDefault();
      deleteMutate();
   }
});

export default ToDoItem;
