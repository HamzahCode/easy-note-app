"use client";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Note from "./components/note";
import { useContext, useEffect } from "react";
import { AppContext } from "./context/appcontext";
import Notification from "./components/notifications";

export default function Home() {
  const {
    isExpanded,
    addedDone,
    deleteDone,
    savedDone,
    toeditor,
    settoeditor,
    setaddedDone,
    setdeleteDone,
    setsavedDone,
  } = useContext(AppContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setaddedDone(false);
      setdeleteDone(false);
      setsavedDone(false);
      settoeditor(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [addedDone, deleteDone, savedDone, toeditor]);

  return (
    <div className={``}>
      <div>
        {addedDone ? (
          <Notification added={addedDone} />
        ) : deleteDone ? (
          <Notification deleted={deleteDone} />
        ) : savedDone ? (
          <Notification saved={savedDone} />
        ) : toeditor ? (
          <Notification editor={toeditor} />
        ) : (
          <Notification added={false} deleted={false} saved={false} />
        )}
      </div>
      <div className="">
        <Header />
      </div>

      <div className="flex">
        <div
          className={` ${
            isExpanded ? "w-full sm:w-2/5" : "w-4"
          } transition-all duration-500 ease-in-out absolute`}
        >
          <Sidebar />
        </div>

        <div className="w-full">
          <Note />
        </div>
      </div>
    </div>
  );
}
