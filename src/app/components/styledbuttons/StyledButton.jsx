"use client"
const StyledButton = ({text, onClick, className}) =>{
    return(
        <button className={className} onClick={onClick} >
            {text}
        </button>
    )
}
export default StyledButton;