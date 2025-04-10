
import MyComp from "@/components/MyComponent/MyComp";

import "react-toastify/dist/ReactToastify.css";



export default function Home() {


  return (
    <div className="flex flex-col items-center justify-center gap-10 h-full mb-10 w-full text-center font-semibold my-1  0">
      <MyComp />
    </div>
  );
}
