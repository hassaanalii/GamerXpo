import apiService from "../services/apiService";

const Home = () =>{
    apiService.get("/api/home")
    return(
        <p>home page</p>
    )
}
export default Home;