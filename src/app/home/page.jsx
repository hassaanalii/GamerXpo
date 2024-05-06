import apiService from "../services/apiService";

const Home = () =>{
    apiService.get("/api/user/148")
    return(
        <p>home page</p>
    )
}
export default Home;