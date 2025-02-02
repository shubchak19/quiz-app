import { useNavigate } from "react-router-dom";

function ErrorPage() {
    const navigate = useNavigate();
  return (<div className="w-screen h-screen bg-red-100 flex items-center justify-center flex-col">
    <p className="font-medium my-4 max-w-2xl text-balance text-center">It looks like there has been a problem with the internet connection or the sever. Please try again after sometime.</p>
    <button className="btn btn-blue" onClick={()=> navigate("/")}>Go to home</button>
  </div>
  )
}

export default ErrorPage