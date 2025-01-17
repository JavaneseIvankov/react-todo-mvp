import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import clsx from 'clsx';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
   className?: string;
   type?: 'primary' | 'secondary';
   isActive?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
   ({ className, type = 'secondary', isActive, ...props }, ref) => {
      return (
         <button
            className={cn(
               clsx({
                  'text-primary-foreground': isActive,
                  'text-secondary-foreground': !isActive,
                  'bg-primary': type === 'primary',
                  'bg-secondary': type === 'secondary',
                  'font-semibold': true,
                  'hover:text-foreground': true,
               }),
               className
            )}
            ref={ref}
            {...props}
         />
      );
   }
);

Button.displayName = 'Button';
export default Button;
