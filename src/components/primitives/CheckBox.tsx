import React, { useEffect, useRef, useState } from 'react';
import IconCheck from '../../assets/images/icon-check';
import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
   className?: string;
   checked: boolean;
   setChecked: (newState: boolean) => void;
}

const CheckBox = React.forwardRef<HTMLInputElement, InputProps>(
   (
      {
         className,
         checked: checkedState,
         setChecked: setCheckedState,
         ...props
      },
      ref
   ) => {
      const checked = checkedState;
      const setChecked = setCheckedState;
      const localRef =
         (ref as React.RefObject<HTMLInputElement>) ||
         useRef<HTMLInputElement>(null);

      return (
         <div className="p-6 flex">
            <div
               className={`bg-muted-foreground z-0  w-[24px] h-[24px] rounded-full relative hover:cursor-pointer ${
                  !checked ? 'gradient-border' : 'gradient-border-static'
               }`}
               onClick={() => {
                  setChecked(!checked);
               }}
            >
               <div
                  // onClick={() => setChecked(!checked)}
                  onClick={() => localRef.current?.click()}
                  className={`flex justify-center items-center w-[22px] h-[22px] rounded-full absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-10 ${
                     !checked ? 'bg-primary' : ''
                  }`}
               >
                  {checked && <IconCheck className=""></IconCheck>}
               </div>
               <input
                  checked={checked}
                  type="checkbox"
                  className={cn(
                     'appearance-none w-full h-full rounded-full bg-transparent border-none hover:cursor-pointer',
                     className
                  )}
                  {...props}
                  ref={localRef}
               />
            </div>
         </div>
      );
   }
);

CheckBox.displayName = 'CheckBox';
export default CheckBox;
