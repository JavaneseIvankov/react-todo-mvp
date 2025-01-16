import { cn } from '../../lib/utils';

interface SeparatorProps extends React.HTMLAttributes<HTMLHRElement> {
   orientation: 'horizontal' | 'vertical';
   className?: string;
}

export default function Separator({
   orientation,
   className,
   ...props
}: SeparatorProps) {
   let orStyle = '';
   switch (orientation) {
      case 'horizontal':
         orStyle = 'w-full h-[2px] bg-black';
         break;
      case 'vertical':
         orStyle = 'h-full w-[2px]';
         break;
   }
   return <div className={cn(orStyle, className)} {...props}></div>;
}
