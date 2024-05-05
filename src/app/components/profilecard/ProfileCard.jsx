import Image from "next/image";

const ProfileCard = ({ name, id, imageUrl }) => {
    return (
        <div className="w-[250px] rounded-lg overflow-hidden shadow-lg bg-[#2d3f2f] flex flex-col items-center justify-center py-5 gap-8">
            <Image src={imageUrl} alt={name} width={200} height={200}  className="rounded-lg"/>
            <div className="px-6 flex flex-col items-center justify-center">
                <div className="font-bold text-[15px] font-poppins text-cyellow">{name}</div>
                <p className="text-white text-[11px] font-poppins">
                    {id}
                </p>
            </div>
        </div>
    );
};

export default ProfileCard;