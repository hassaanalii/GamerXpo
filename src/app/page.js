import EventSectionLanding from "./components/eventsectionlanding/EventSectionLanding";
import HeroSectionLanding from "./components/herosectionlanding/HeroSectionLanding";
import MarketplaceSectionLanding from "./components/marketplacesectionlanding/MarketplaceSectionLanding";
import NavBarLandingPage from "./components/navbarlandingpage/NavBarLandingPage";

const LandingPage = () => {
  return (
    <div className="flex flex-col">
      <div className="h-screen flex flex-col bg-cover bg-center bg-[#324734] " style={{ backgroundImage: "url('/landingpagebg.svg')" }}>
        <NavBarLandingPage />
        <HeroSectionLanding />
      </div>
      <div className="flex flex-col bg-cover bg-center" style={{backgroundImage: "url('/bgimagecomplete.png')"}}>
        <EventSectionLanding />
        <MarketplaceSectionLanding />

      </div>

    </div>
  )
}
export default LandingPage;