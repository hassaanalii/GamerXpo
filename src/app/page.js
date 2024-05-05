import HeroSectionLanding from "./components/herosectionlanding/HeroSectionLanding";
import NavBarLandingPage from "./components/navbarlandingpage/NavBarLandingPage";

const LandingPage = () =>{
  return(
    <div className="h-screen flex flex-col bg-cover bg-center bg-[#324734] " style={{backgroundImage: "url('/landingpagebg.svg')"}}>
      <NavBarLandingPage />
      <HeroSectionLanding />
      
    </div>
  )
}
export default LandingPage;