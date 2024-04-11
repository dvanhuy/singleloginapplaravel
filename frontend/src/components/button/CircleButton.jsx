const CircleButton = ({children}) => {
    return ( 
        <div className="rounded-full flex items-center justify-center gap-2 bg-slate-200 w-12 h-12 border-[1px] hover:bg-slate-100">
            {children}
        </div>
     );
}
 
export default CircleButton;