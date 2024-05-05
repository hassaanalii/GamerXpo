import Image from "next/image";

const HeroSectionLanding = () => {
    return (
        <div className="flex flex-col items-center mt-2">
            <div className="flex flex-col">
                <div className="flex flex-col items-center">
                    <p className="font-extracolombo text-white text-[150px] leading-none">GAMERXPO</p>
                    <p className="font-regularcolombo text-white text-[26px]">Revolutionising The Gaming Industry </p>
                </div>
                <div className="flex flex-row items-center relative">
                    <Image
                        src="/controller2.svg"
                        alt="Controller 2"
                        width={300}
                        height={300}
                        className="z-10" // Higher z-index for the controller you want on top
                    />
                    <Image
                        src="/controller1.svg"
                        alt="Controller 1"
                        width={500}
                        height={500}
                        className="absolute left-[190px] -top-10" // Adjust positioning for overlap
                    />
                </div>

            </div>
        </div>
    )
}
export default HeroSectionLanding;