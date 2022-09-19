import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faTrash,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
// import Cards from "./Cards";

const Notes = () => {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  const getLocalInfo =() =>
  {
    if (typeof window !== 'undefined'){

        const notes = localStorage.getItem("MyNotes");
        if(notes){
            return JSON.parse(notes);
        }
        else{
            return []
        }
    }
  }
//   const [AllNotes, setAllNotes] = useState(JSON.parse(localStorage.getItem)("MyNotes"));
  const [AllNotes, setAllNotes] = useState(getLocalInfo());

  useEffect(()=>{
    localStorage.setItem("MyNotes",JSON.stringify(AllNotes))
  },[AllNotes]);

  const handleClick = () => {
    if (!note) alert("cannot add empty node");
    else {
      const newNote = {
        id: new Date().getTime().toString(),
        title: note.title,
        content: note.content,
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
          <FontAwesomeIcon
            icon={faPlusCircle}
            className="h-9 -mt-10 hover:scale-125 duration-300"
          />
        </a>
      </div>
      {(typeof window !== 'undefined') &&

      <div className="flex flex-wrap w-[80%] m-auto">
        {AllNotes.map((cur) => {
          return (
            <div
              className="whitespace-pre-wrap break-words   relative w-1/4    p-3 m-5 border shadow-lg rounded-lg"
              key={cur.id}
            >
              <p className="text-xl">{cur.title}</p>
              <hr />
              <p className="">
                
              {cur.content}
              </p>
              <div className="absolute right-0 bottom-0 space-x-4 mr-4 ">
                <a
                  className="text-red-500 cursor-pointer "
                  onClick={() => deleteNote(cur.id)}
                >
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="hover:scale-125 duration-300"
                  />
                </a>
                <a className="text-green-500 cursor-pointer ">
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    className="hover:scale-125 duration-300"
                  />
                </a>
              </div>
            </div>
          );
        })}
      </div>
      }
    </>
  );
};

export default Notes;
