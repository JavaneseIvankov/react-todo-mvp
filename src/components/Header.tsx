import IconMoon from '../assets/images/icon-moon';
import IconSun from '../assets/images/icon-sun';

export default function Header() {
   return (
      <>
         <img
            src="src/assets/images/bg-desktop-dark.jpg"
            alt="banner"
            className="w-full aspect-auto absolute top-0 left-0 z-[-1]"
         />
         <div className="flex justify-between w-[90%] max-w-screen-sm ml-auto mr-auto mt-[5rem] mb-[3rem]">
            <h1 className="text-[2.5rem] text-white">TODO</h1>
            <button className="bg-transparent">
               <IconMoon></IconMoon>
            </button>
         </div>
      </>
   );
}
