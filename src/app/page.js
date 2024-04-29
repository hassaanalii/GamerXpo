import NavBarLandingPage from "./components/navbarlandingpage/NavBarLandingPage";

const LandingPage = () =>{
  return(
    <div className="h-screen flex flex-col bg-cover bg-center bg-[#4F6F52] " style={{backgroundImage: "url('/landingpagebg.svg')"}}>
      <NavBarLandingPage />
    </div>
  )
}
export default LandingPage;