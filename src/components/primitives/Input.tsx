import React from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
   className?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
   ({ className, type, ...props }, ref) => {
      return (
         <input
            type={type}
            className={cn(
               'flex h-12 w-full border-none outline-none bg-primary text-foreground placeholder-muted-foreground',
               className
            )}
            ref={ref}
            {...props}
         />
      );
   }
);

Input.displayName = 'Input';

export default Input;
