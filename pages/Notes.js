import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faTrash,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
// import Cards from "./Cards";

const Notes = () => {
  // const ISSERVER = typeof window === "undefined";
  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  const [toggleButton, setToggleButton] = useState(false);
  const [isEditItem, setIsEditItem] = useState("");

  const [local, setLocal] = useState(false);

  const getLocalInfo = () => {
    if (typeof window !== "undefined") {
      const notes = localStorage.getItem("MyNotes");
      if (notes) {
        return JSON.parse(notes);
      }
    } else {
      return [];
    }
  };
  const [AllNotes, setAllNotes] = useState(getLocalInfo());
  useEffect(() => {
    localStorage.setItem("MyNotes", JSON.stringify(AllNotes));
  }, [AllNotes]);
  //   const [AllNotes, setAllNotes] = useState(JSON.parse(localStorage.getItem)("MyNotes"));
  useEffect(() => {
    if (AllNotes) {
      setLocal(true);
    }
  }, []);

  const handleClick = () => {
    if (!note) {
      alert("cannot add empty node");
    } 
    else if (note && toggleButton) {
      
      setAllNotes(
        AllNotes.map((cur) => {
          if (cur.id === isEditItem) {
            const newNote = {
              // id: new Date().getTime().toString(),
              title: note.title,
              content: note.content,
              date:new Date().toLocaleString()
            };
            return  {...cur,title:note.title,content: note.content,
              date:new Date().toLocaleString()} ;
            // return {...cur,newNote}
          }
          return cur;
        })
      );
      setNote({
        title: "",
        content: "",
      });
      setIsEditItem(null);
      setToggleButton(false);
    } 
    else {
      const newNote = {
        id: new Date().getTime().toString(),
        title: note.title,
        content: note.content,
        date: new Date().toLocaleString(),
      };
      setAllNotes([...AllNotes, newNote]);
      setNote({
        title: "",
        content: "",
      });
    }
  };

  const deleteNote = (index) => {
    const newNotes = AllNotes.filter((cur) => {
      return cur.id !== index;
    });
    setAllNotes(newNotes);
  };

  const edit = (index) => {
    const editItem = AllNotes.find((cur) => {
      return cur.id === index;
    });
    setNote({ title: editItem.title, content: editItem.content });
    setIsEditItem(index);
    setToggleButton(true);
  };

  return (
    <>
      <div className="m-auto w-1/2">
        <textarea
          rows="1"
          className=" p-4 mt-5 w-full  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Title"
          name="title"
          value={note.title}
          onChange={(e) => {
            setNote((prev) => {
              return { ...prev, [e.target.name]: e.target.value };
            });
          }}
        ></textarea>
        <textarea
          id="notes"
          rows="4"
          className=" p-4 mt-5 w-full  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Your Notes..."
          name="content"
          value={note.content}
          onChange={(e) => {
            setNote((prev) => {
              return { ...prev, [e.target.name]: e.target.value };
            });
          }}
        ></textarea>
        <a className="text-yellow-500 cursor-pointer  " onClick={handleClick}>
          {!toggleButton ? (
            <FontAwesomeIcon
              icon={faPlusCircle}
              className="h-9 -mt-10 hover:scale-125 duration-300"
            />
          ) : (
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="h-9 -mt-10 hover:scale-125 duration-300"
            />
          )}
        </a>
      </div>

      <div className="flex justify-center items-baseline flex-wrap w-[80%] m-auto">
        {local &&
          AllNotes?.map((cur) => {
            return (
              <div
                className="whitespace-pre-wrap break-words   relative w-1/4    p-3 m-5 border shadow-lg rounded-lg"
                key={cur.id}
              >
                <p className="text-xl">{cur.title}</p>
                <hr />
                <p className="mb-4">{cur.content}</p>
                <div className="flex  space-x-4">
                  <p className="text-gray-500 text-sm">{cur.date}</p>
                  <div className="absolute right-0 space-x-4">
                    <a
                      className="text-red-500 cursor-pointer "
                      onClick={() => deleteNote(cur.id)}
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="hover:scale-125 duration-300"
                      />
                    </a>
                    <a
                      className="text-green-500 cursor-pointer "
                      onClick={() => edit(cur.id)}
                    >
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        className="hover:scale-125 duration-300 mr-4"
                      />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Notes;
