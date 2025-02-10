import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/appcontext";
import Message from "./message";

export default function Note() {
  const {
    notes,
    setnotes,
    isid,
    setisid,
    nextid,
    setnextid,
    setsearchnote,
    showMessage,
    setShowMessage,
    isedited,
    setaddedDone,
    setsavedDone,
  } = useContext(AppContext);
  const [titleinput, setnewtitle] = useState("");
  const [descinput, setnewdesc] = useState("");
  const [issaved, setissaved] = useState(true);
  const [newnotesaved, setnewnotesaved] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem("Notes");
    const dataid = localStorage.getItem("ID");
    if (data && dataid) {
      setnotes(JSON.parse(data));
      setnextid(JSON.parse(dataid));
    }
  }, []);
  useEffect(() => {
    setsearchnote("");
    setnewtitle("");
    setnewdesc("");
    setisid(null);
    setissaved(true);
    setnewnotesaved(true);
  }, [isedited]);
  useEffect(() => {
    localStorage.setItem("Notes", JSON.stringify(notes));
    localStorage.setItem("ID", JSON.stringify(nextid));
  });
  useEffect(() => {
    notes.map((n) => {
      if (n.id === isid) {
        setnewtitle(n.title);
        setnewdesc(n.desc);
      }
    });
  }, [isid]);
  function handleaddnote() {
    setnotes([...notes, { id: nextid, title: titleinput, desc: descinput }]);
    setnextid(nextid + 1);
    setaddedDone(true);
  }
  function handleditnote(editinfo) {
    let editing = notes.map((note) => {
      if (editinfo === note.id) {
        let update = { ...note, title: titleinput, desc: descinput };

        return update;
      } else {
        return note;
      }
    });
    setnotes(editing);
  }
  return (
    <div className="flex flex-col p-5 text-xl z-[3] h-screen">
      {showMessage && issaved === false ? (
        <Message msgname={"Save"} titleinp={titleinput} descinp={descinput} />
      ) : showMessage && newnotesaved === false ? (
        <Message msgname={"Add"} titleinp={titleinput} descinp={descinput} />
      ) : null}
      <div className="h-14 bg-[#4d4c4c] p-1 ">
        <div className="flex justify-between items-center m-3 ">
          <button
            className="bg-[#e7b34c] rounded-sm w-32 text-black ml-3 hover:bg-[#fcdb99]"
            onClick={() => {
              isid ? handleditnote(isid) : handleaddnote();
              setsearchnote("");
              setnewtitle("");
              setnewdesc("");
              setisid(null);
              setissaved(true);
              setsavedDone(true);
            }}
          >
            حفظ الملاحظة
          </button>

          <button
            className="bg-[#e7b34c] disabled:bg-[#ffffff18] disabled:opacity-50 rounded-sm w-32 text-black hover:bg-[#fcdb99]"
            onClick={() => {
              if (issaved && newnotesaved !== false) {
                setnewtitle("");
                setnewdesc("");
                setisid(null);
              } else if (newnotesaved && issaved !== false) {
                setnewtitle("");
                setnewdesc("");
                setisid(null);
              } else {
                setShowMessage(true);
              }
            }}
          >
            ملاحظة جديدة
          </button>
        </div>
      </div>
      <hr className="border border-solid border-[#e7b34c]" />
      {isid !== null ? (
        notes.map((note) => {
          if (note.id === isid) {
            return (
              <div key={note.id} className="">
                <input
                  type="text-area"
                  placeholder="الموضوع"
                  className="bg-[#313131] p-4 w-full border-b hover:border-b-white outline-none"
                  value={titleinput}
                  onChange={(e) => {
                    setnewtitle(e.target.value);
                    setissaved(false);
                  }}
                />

                <textarea
                  className="bg-[#313131] p-2 w-full outline-none"
                  value={descinput}
                  rows={"15"}
                  placeholder="اكتب ملاحظاتك"
                  onChange={(e) => {
                    setnewdesc(e.target.value);
                    setissaved(false);
                  }}
                />
              </div>
            );
          }
        })
      ) : (
        <div>
          <input
            type="text"
            placeholder="الموضوع"
            className="bg-[#313131] p-4 w-full border-b hover:border-b-white outline-none"
            value={titleinput}
            onChange={(e) => {
              setnewtitle(e.target.value);
              setnewnotesaved(false);
            }}
          />

          <textarea
            className="bg-[#313131] p-2 w-full outline-none"
            value={descinput}
            rows={"15"}
            placeholder="اكتب ملاحظاتك"
            onChange={(e) => {
              setnewdesc(e.target.value);
              setnewnotesaved(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
