import Input from './primitives/Input';
import CheckBox from './primitives/CheckBox';
import { memo, useEffect, useRef, useState } from 'react';
import useTodoStore from '../stores/todoStore';

const InputBar = () => {
   const [checked, setChecked] = useState(false);
   const checkBoxRef = useRef<HTMLInputElement>(null);
   const inputRef = useRef<HTMLInputElement>(null);
   const addTodo = useTodoStore((s) => s.addTodo);

   const setCheckbox = (value: boolean) => {
      if (checkBoxRef.current) {
         checkBoxRef.current.click();
         setChecked(value);
      }
   };

   const handleTodoAdd = () => {
      const text = inputRef.current?.value ?? '';
      const completed = checkBoxRef.current?.checked ?? false;
      addTodo(text, completed);

      inputRef.current!.value = '';
      setChecked(false);
   };

   const handleKeys = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && e.ctrlKey) {
         setCheckbox(true);
         handleTodoAdd();
      } else if (e.key === 'Enter') {
         handleTodoAdd();
      }
   };

   useEffect(() => {
      const inputElement = inputRef.current;
      if (inputElement) {
         inputElement.addEventListener('keydown', handleKeys);
      }
      return () => {
         if (inputElement) {
            inputElement.removeEventListener('keydown', handleKeys);
         }
      };
   });

   return (
      <div className="flex h-fit content-center items-center bg-primary rounded-sm shadow-xl">
         <CheckBox
            ref={checkBoxRef}
            onChange={(e) => setChecked(e.target.checked)}
            checked={checked}
            setChecked={setChecked}
         />
         <Input
            className="rounded-sm"
            type="text"
            placeholder="Create a new todo..."
            ref={inputRef}
         />
      </div>
   );
};

export default memo(InputBar);
