"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Image from "next/image";
import { useEffect } from "react";
import { resetCanvas } from "../flow";

interface Props {
  white: boolean;
}

function Goingbackbtn({white}: Props) {
  const router = useRouter();

  //put functions in here that you wanna call when user goes back from one page to other
  function resetStuff() {
    resetCanvas();    
  }

  const handleClick = () => {
    router.back();
    resetStuff();
  };

  return (
    <button onClick={handleClick} style={{backgroundColor:'none'}}>
      <Image
        src={`${white ? "/assets/back.svg" : "/assets/backblack.svg"}`}
        alt="back button"
        width={24}
        height={24}
        className="cursor-pointer object-contain mt-3 mr-3 mb-2"
      />
    </button>
  );

};

export default Goingbackbtn;
