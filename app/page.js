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
    setaddedDone,
    setdeleteDone,
    setsavedDone,
  } = useContext(AppContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setaddedDone(false);
      setdeleteDone(false);
      setsavedDone(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [addedDone, deleteDone, savedDone]);

  return (
    <div className={``}>
      <div>
        {addedDone ? (
          <Notification added={addedDone} />
        ) : deleteDone ? (
          <Notification deleted={deleteDone} />
        ) : savedDone ? (
          <Notification saved={savedDone} />
        ) : (
          <Notification added={false} deleted={false} saved={false} />
        )}
      </div>
      <div className="z-50">
        <Header />
      </div>

      <div className="flex">
        <div
          className={` ${
            isExpanded ? "w-2/5" : "w-4"
          } transition-all duration-500 ease-in-out`}
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
