import { redirect } from 'next/navigation';

async function getVerification(){
  const res =  await fetch("http://localhost:8000/api/verify/", {
    method: 'GET',
    credentials: 'include', // Important for cookies if using sessions
  });
  if (res.ok) {
    const data = await res.json();
    if(data.authenticated){
      redirect("/profile")
    }else if(!data.authenticated){
      redirect("/login")
    }
  }
}
export default async function Profile(){
  const data = await getVerification()
  return(
    <div>hello</div>
  )
}


