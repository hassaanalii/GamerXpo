const Banner = ({role}) =>{
    return (
        <div className="bg-cgreen flex items-center justify-center py-3">
             {role === 'Gamer' ? (
                <p className="text-white text-[30px] font-extracolombo text-center">EVENTS SCHEDULED</p>
            ) : (role === 'Lead' || role === 'Developer') ? (
                <p className="text-white text-[30px] font-extracolombo text-center">OUR EVENTS</p>
            ) : null}
          
        </div>
    )
}
export default Banner;