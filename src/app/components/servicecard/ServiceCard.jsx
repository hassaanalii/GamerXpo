import Image from "next/image";

const ServiceCard = ({ name, description, logo }) => {
    return (
        <div className="bg-[#2d3f2f] rounded-lg p-4 text-white flex flex-col  transition duration-500 hover:scale-105 cursor-pointer">
            <Image src={logo} alt={name} className="mb-4" width={30} height={30} />
            <div className="flex flex-col gap-2">
                <h3 className=" font-semibold text-[16px] text-cyellow font-poppins">{name}</h3>
                <p className="text-[11px] font-poppins text-white text-justify">{description}</p>
            </div>
        </div>
    );
};
export default ServiceCard;