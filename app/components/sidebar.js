"use client";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import { AppContext } from "../context/appcontext";
import { useContext, useEffect, useState } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Message from "./message";

const Sidebar = () => {
  const {
    isExpanded,
    setIsExpanded,
    notes,
    searchnote,
    setsearchnote,
    setisid,
    searchedcontent,
    setsearchedcontent,
    showMessage,
    setShowMessage,
    settoeditor,
  } = useContext(AppContext);
  const [delid, setdelid] = useState();

  function handlearrow() {
    setIsExpanded(!isExpanded);
  }

  function handledelenote(noteid) {
    setShowMessage(true);
    setdelid(noteid);
  }
  useEffect(() => {
    let searched = notes.filter((note) => {
      if (searchnote.length !== 0) {
        return note.title.toLowerCase().includes(searchnote.toLowerCase());
      } else {
        return note;
      }
    });
    if (searched.length > 0) {
      setsearchedcontent(searched);
    } else {
      setsearchedcontent([]);
    }
  }, [searchnote]);
  return (
    <div className="flex items-center">
      {showMessage && (
        <div
          className="fixed inset-0 bg-black/50 z-40 "
          onClick={(e) => e.stopPropagation()}
        />
      )}
      {showMessage ? <Message msgname={"Delete"} getidDel={delid} /> : null}
      <div
        className={`sidebar w-full h-screen bg-[#313131] text-white overscroll-y-auto overflow-x-hidden scroll-smooth transition-all duration-500 ease-in-out`}
      >
        <div className="container">
          <div className="title p-3 cursor-default flex items-center bg-black h-10 w-full">
            <div className="m-3">
              <AssignmentOutlinedIcon className="text-[#e7b34c]" />
            </div>
            <h1 className="text-2xl font-bold">الملاحظات</h1>
          </div>

          {/* <hr className="border border-solid border-[#e7b34c]" /> */}
          <div className="w-full flex items-center justify-center z-50 border border-solid border-[#e7b34c] my-1">
            <input
              type="text"
              placeholder="البحث عن ملاحظات"
              value={searchnote}
              className="rounded-md font-bold text-xl bg-black/70 w-full p-2 text-white outline-none"
              onChange={(e) => {
                setsearchnote(e.target.value);
              }}
            />
          </div>

          {searchnote.length === 0 ? (
            <div>
              {notes.map((note) => {
                return (
                  <div
                    key={note.id}
                    className="border-b h-14 border-b-[#e7b34c] group flex items-center justify-between hover:bg-[#474747]"
                  >
                    <div
                      onClick={() => {
                        setisid(note.id);
                        settoeditor(true);
                      }}
                      className="flex items-center cursor-pointer transition-all duration-500 ease-in-out group-hover:-translate-x-4 w-[440px] h-full"
                    >
                      <h1 className="text-2xl truncate font-bold">
                        {note.title}
                      </h1>
                    </div>
                    <div className=" flex items-center">
                      <div className="h-[45px] ml-2 border-r border-r-black"></div>
                      <div
                        className="ml-2 p-1 hover:bg-white rounded-md "
                        onClick={() => {
                          handledelenote(note.id);
                        }}
                      >
                        <DeleteOutlineOutlinedIcon className="text-red-600 cursor-pointer" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              {searchedcontent.map((note) => {
                return (
                  <div
                    key={note.id}
                    className="border-b h-14 border-b-[#e7b34c] group flex items-center justify-between"
                  >
                    <div
                      onClick={() => {
                        setisid(note.id);
                        settoeditor(true);
                      }}
                      className="flex items-center cursor-pointer transition-all duration-500 ease-in-out group-hover:-translate-x-4 w-[440px] h-full"
                    >
                      <h1 className="text-2xl truncate font-bold">
                        {note.title}
                      </h1>
                    </div>
                    <div className=" flex items-center">
                      <div className="h-[45px] ml-2 border-r border-r-black"></div>
                      <div
                        className="ml-2 p-1 hover:bg-white rounded-md "
                        onClick={() => {
                          handledelenote(note.id);
                        }}
                      >
                        <DeleteOutlineOutlinedIcon className="text-red-600 cursor-pointer" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div
        onClick={handlearrow}
        className="w-4 h-screen bg-[#d8d8d8] text-white flex justify-center items-center cursor-pointer hover:bg-[#ffffff]"
      >
        {isExpanded ? (
          <KeyboardArrowRightIcon fontSize="20px" className="text-black" />
        ) : (
          <KeyboardArrowLeftIcon fontSize="20px" className="text-black" />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
