import ProfileCard from "../profilecard/ProfileCard";

const TeamSectionLanding = () => {
    return (
        <div id="team" className="flex flex-col gap-5 items-center justify-center py-36 px-12">
            <p className="font-extracolombo text-white text-[50px] leading-none">OUR TEAM</p>
            <div className="flex flex-row items-center justify-center gap-5">
                <ProfileCard
                    name="Muhammad Hassaan Ali"
                    id="FA20-BCS-055"
                    imageUrl="/hassaan.jpg"
                />
                <ProfileCard
                    name="Muhammad Maarij"
                    id="FA20-BCS-060"
                    imageUrl="/hassaan.jpg"
                />
            </div>

        </div>
    )
}
export default TeamSectionLanding;