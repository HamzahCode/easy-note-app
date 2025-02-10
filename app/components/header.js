"use client";
import logolabel from "../images/Note.png";
import Image from "next/image";
import ContrastIcon from "@mui/icons-material/Contrast";

const Header = () => {
  return (
    <div className="relative p-4 h-16 w-full flex justify-between items-center bg-[#222222] text-white z-20">
      <div className="mr-10">
        <Image
          src={logolabel}
          width={100}
          alt=""
          className="logo font-bold cursor-pointer"
        />
      </div>

      {/* <div className="cursor-pointer ml-10">
        <ContrastIcon />
      </div> */}
    </div>
  );
};

export default Header;
