
async function verifyAuth() {
    try {
      const response = await fetch("http://localhost:8000/api/verify/", {
        method: 'GET',
        credentials: 'include', // To ensure cookies are included with the request
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      console.log("he")
      console.log(data)
     
    } catch (error) {
      console.error("Error during authentication verification:", error);
      return { authenticated: false }; // Assume not authenticated on error
    }
  }
  
  export default verifyAuth;