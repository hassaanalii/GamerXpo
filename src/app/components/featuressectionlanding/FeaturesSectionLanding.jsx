import ServiceCard from "../servicecard/ServiceCard";

const FeaturesSectionLanding = () =>{
    const services = [
        {
            name: "EXPO SCHEDULING & MANAGEMENT",
            description: "Schedule and manage online events with detailed information and media uploads. Stay updated with comprehensive scheduling and real-time access during live events.",
            logo: "/expologo.svg"
        },
        {
            name: "LIVE STREAMING",
            description: "Live streaming during events that enables the organization to deliver and explain the gamers about their creations.",
            logo: "/livestreamlogo.svg"
        },
        {
            name: "GAME MARKETPLACE",
            description: "Reserve booths, showcase games, and generate revenue easily. Explore and purchase games with customisable options for enhanced engagement.",
            logo: "/marketplacelogo.svg"
        },
        {
            name: "eSPORTS ARENA",
            description: "Join organised tournaments with secure registration and real-time streaming. Enjoy fair matches and live updates for an immersive gaming experience.",
            logo: "/esportslogo.svg"
        },
        {
            name: "FEEDBACK AND HUB CHAT",
            description: "Engage in real-time interaction with gamers and developers. Leave feedback, receive responses, and foster a constructive feedback environment.",
            logo: "/feedbacklogo.svg"
        },
        {
            name: "SPONSORSHIP MANAGEMENT",
            description: "Select, provide details, and confirm sponsorship requests seamlessly. Efficiently manage sponsorship offers for mutual benefits.",
            logo: "/sponsorlogo.svg"
        },
        {
            name: "GAME DATA ACQUISITION",
            description: "Extraction of games from crazygames to help the provide the proof the idea is market implementable. Helps gamers to play a demo before purchasing a game",
            logo: "/datalogo.svg"
        },
        {
            name: "SAFE PAYMENTS",
            description: "Ensure secure transactions with encryption and fraud prevention measures. Make payments confidently with transparent recording and processing.",
            logo: "/paymentlogo.svg"
        },
        {
            name: "PERSONALISED SEARCH AND RECOMMENDATIONS",
            description: "Discover games tailored to your preferences with advanced filters and personalized recommendations. Enhance engagement with content that aligns with your interests.",
            logo: "/searchlogo.svg"
        }
    ];
    
    return(
        <div id="features" className="flex flex-col gap-5 items-center justify-center py-36 px-12">
            <p className="font-extracolombo text-white text-[50px] leading-none">FEATURES</p>
            <div className="grid grid-cols-3 gap-6 mt-8 w-full max-w-6xl"> {/* Grid container */}
                {services.map(service => (
                    <ServiceCard key={service.name} {...service} />
                ))}
            </div>

        </div>
    )   
}

export default FeaturesSectionLanding;