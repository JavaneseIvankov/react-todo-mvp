import Input from './primitives/Input';
import CheckBox from './primitives/CheckBox';
import { TodosDispatchContext } from '../contexts/TodoContext';
import { useContext, useEffect, useRef, useState } from 'react';

export default function InputBar() {
   const dispatch = useContext(TodosDispatchContext);
   const [checked, setChecked] = useState(false);
   const checkBoxRef = useRef<HTMLInputElement>(null);
   const inputRef = useRef<HTMLInputElement>(null);

   const setCheckbox = (value: boolean) => {
      if (checkBoxRef.current) {
         checkBoxRef.current.click();
         setChecked(value);
         console.log('kukikang');
      }
   };

   const handleTodoAdd = () => {
      dispatch?.({
         type: 'ADD_TODO',
         payload: {
            text: inputRef.current?.value || '',
            completed: checkBoxRef.current?.checked || false,
         },
      });

      inputRef.current!.value = '';
      // setCheckbox(false);
      setChecked(false);
   };

   const handleKeys = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && e.ctrlKey) {
         console.log('Ctrl+Enter key pressed');
      } else if (e.key === 'Enter') {
         handleTodoAdd();
      } else if (e.key === 'Escape') {
         console.log('Escape key pressed');
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
   }, []);

   return (
      <div className="flex h-fit content-center items-center bg-primary rounded-sm">
         <CheckBox
            ref={checkBoxRef}
            // onClick={() => setChecked(!checked)}
            onChange={(e) => setChecked(e.target.checked)}
            checked={checked}
            setChecked={setChecked}
         ></CheckBox>
         <Input
            className="rounded-sm"
            type="text"
            placeholder="this is input"
            ref={inputRef}
         ></Input>
      </div>
   );
}
