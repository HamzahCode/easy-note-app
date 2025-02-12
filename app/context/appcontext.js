"use client";
import { useState, createContext } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isid, setisid] = useState(null);
  const [nextid, setnextid] = useState(1);
  const [notes, setnotes] = useState([]);
  const [searchnote, setsearchnote] = useState("");
  const [searchedcontent, setsearchedcontent] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [isedited, setisedited] = useState(false);
  const [addedDone, setaddedDone] = useState(false);
  const [deleteDone, setdeleteDone] = useState(false);
  const [savedDone, setsavedDone] = useState(false);
  const [toeditor, settoeditor] = useState(false);

  return (
    <AppContext.Provider
      value={{
        isExpanded,
        setIsExpanded,
        notes,
        setnotes,
        isid,
        setisid,
        nextid,
        setnextid,
        searchnote,
        setsearchnote,
        searchedcontent,
        setsearchedcontent,
        showMessage,
        setShowMessage,
        isedited,
        setisedited,
        addedDone,
        setaddedDone,
        deleteDone,
        setdeleteDone,
        savedDone,
        setsavedDone,
        toeditor,
        settoeditor,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
