import Image from "next/image";

const RoleNavBar = (props) => {
    return (
        <div className="bg-gradient-to-r from-cgreen to-cgreen/60 py-6 px-36">
            <div className="flex flex-row items-center justify-between">
                <Image src="/logolandingpage.svg" alt="hello" height={50} width={50} />
                <div className="flex items-center justify-center gap-16">

                    <p className="text-white cursor-pointer hover:text-gray-300 font-poppins">Home</p>
                    <p className="text-white cursor-pointer hover:text-gray-300 font-poppins">Events</p>

                    {
                        props.role === 'Gamer' && (
                            <p className="text-white cursor-pointer hover:text-gray-300 font-poppins">Library</p>
                        )
                    }

                    <p className="text-white cursor-pointer hover:text-gray-300 font-poppins">XpoArena</p>

                </div>
                <div className="flex flex-row gap-3">
                    
                </div>
            </div>

        </div>
    )
}
export default RoleNavBar;