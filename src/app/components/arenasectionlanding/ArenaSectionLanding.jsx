const ArenaSectionLanding = () =>{
    return (
        <div className="flex flex-col py-16 items-center justify-center bg-cover gap-10 " 
        style={{backgroundImage: "url('/marketplace.svg')"}}>
            <div className="flex flex-col justify-center items-center w-[50%] gap-6">
                <p className="font-extracolombo text-white text-[50px] leading-none">ESPORTS ARENA</p>
                <p className="text-white font-poppins text-center">Organise various <span className="font-poppins text-cyellow">eSports tournaments</span>, create a schedule for upcoming matches, <span className="font-poppins text-cyellow">organize tournaments</span>, winners, results and much more! </p>
            </div>
           
        </div>
    )

}
export default ArenaSectionLanding;