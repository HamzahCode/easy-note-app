import { useContext } from "react";
import { AppContext } from "../context/appcontext";
export default function Message({ msgname, getidDel, titleinp, descinp }) {
  const {
    setShowMessage,
    notes,
    setnotes,
    isid,
    setisedited,
    isedited,
    setdeleteDone,
    setsavedDone,
    setsearchnote,
    setaddedDone,
    nextid,
    setnextid,
  } = useContext(AppContext);
  function handleaddnote() {
    setnotes([...notes, { id: nextid, title: titleinp, desc: descinp }]);
    setnextid(nextid + 1);
    setaddedDone(true);
    setShowMessage(false);
    changestate();
  }
  function handledelenote() {
    let del = notes.filter((note) => {
      if (note.id !== getidDel) {
        return note;
      }
    });
    setnotes(del);
    setShowMessage(false);
    setdeleteDone(true);
    setsearchnote("");
  }
  function changestate() {
    setisedited(!isedited);
  }
  function handleditnote() {
    let editing = notes.map((note) => {
      if (isid === note.id) {
        let update = { ...note, title: titleinp, desc: descinp };

        return update;
      } else {
        return note;
      }
    });
    setnotes(editing);
    setShowMessage(false);
    setsavedDone(true);
    changestate();
  }
  return (
    <div className="container z-50 bg-black flex flex-col justify-between fixed top-[33%] left-[50%] -translate-x-[50%] rounded-md  w-2/5 sm:h-1/4 lg:w-1/3 lg:h-1/3 ">
      <div className="flex justify-center items-center">
        <div className="text-2xl border-b w-full text-center p-1 border-solid border-[#e7b34c]">
          تحذير!!
        </div>
      </div>
      <div className="md:text-lg lg:text-xl mx-2 text-center">
        {msgname === "Delete"
          ? "سيتم حذف الملاحظة، هل أنت متأكد؟"
          : msgname === "Save"
          ? "لم يتم حفظ الملاحظة الحالية، هل ترغب بحفظها؟"
          : "هل تريد اضافة هذه الملاحظة؟"}
      </div>
      <div className="flex justify-between items-end w-full font-bold text-xl container">
        <button
          className="p-2 border border-solid border-[#e7b34c] w-1/2 lg:h-11 hover:bg-[#dda433]"
          onClick={() => {
            {
              msgname === "Delete"
                ? handledelenote()
                : msgname === "Save"
                ? handleditnote()
                : handleaddnote();
            }
          }}
        >
          {msgname === "Delete" ? "حذف" : msgname === "Save" ? "حفظ" : "إضافة"}
        </button>
        <button
          className="p-2 border border-solid border-[#e7b34c] w-1/2 lg:h-11 hover:bg-[#dda433]"
          onClick={() => {
            setShowMessage(false);
            msgname === "Save" || msgname === "Add" ? changestate() : null;
          }}
        >
          {msgname === "Delete" ? "إلغاء" : "لا"}
        </button>
      </div>
    </div>
  );
}
