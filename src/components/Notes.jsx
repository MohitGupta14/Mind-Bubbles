import React, { useState } from 'react';
import { Textarea } from '@nextui-org/react';
import { useEffect } from 'react';
import axios from 'axios';
import { useSession } from "next-auth/react"
import { PulseLoader } from 'react-spinners';


const Notes = () => {
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState([]);
  const [isPrivate, setIsPrivate] = useState(true);
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();

  const handleInputChange = (e) => {
    setNewNote(e.target.value);
  };
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/customers');
        const notesData = await response.json();
        console.log("Length of notes is " + notes.length);
        for(let i = 0 ; i < notesData.length; i++) {
         if(!notes.includes(notesData[i].content)){
          if(notesData[i].token === session.user.email){
           notes.push(notesData[i].content);
          }
         }
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching notes:', error.message);
      }
    };
   if(session){
    fetchNotes();
   }
  }, [session]); 

  const handleAddNote = async () => {
    if (status === "authenticated") {
      console.log(session.user.email);
    
      if (newNote.trim() !== '') {
        setNotes([newNote, ...notes]);
        setNewNote('');
        try {
          const response = await addNoteToDatabase({  status : isPrivate, content: newNote , token :session.user.email});
          if (response.ok) {
            const newNoteData = await response.json();
            console.log('Added note to database:', newNoteData);
          } else {
            console.error('Failed to add note to database');
          }
        } catch (error) {
          console.error('Error adding note to database:', error.message);
        }
      }
    }
  };

  const addNoteToDatabase = async (newNote) => {
    try {
      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote),
      });
      
      return response;
    } catch (error) {
      throw new Error('Error adding note to database');
    }
  };

  const handleDeleteNote = async (index) => {
    setLoading(true);
    const updatedNotes = [...notes];
    const deletedNote = updatedNotes.splice(index, 1)[0];
    setNotes(updatedNotes);
    await deleteNoteFromServer(index)
    setLoading(false);
  };
  
  const deleteNoteFromServer = async (index) => {
    const response = await axios.get('/api/customers');
    const notesData = response.data;
    const customerId = notesData[index]._id;
    try {
      if (!customerId) {
        throw new Error('Customer ID not provided');
      }
  
      await axios.delete(`/api/customers?id=${customerId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(`Customer with ID ${customerId} deleted from the server using axios`);
    } catch (error) {
      console.error('Error deleting customer from the server:', error.message);
      throw error;
    }
  };

  const faintBlue = 'bg-blue-200'; 

  const dustbinSvg = (index) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="cursor-pointer"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M6 6V21a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V6" />
      <path d="M10 3V6" />
      <path d="M14 3V6" />
    </svg>
  );

  const plusSvg = () => (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="blue"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>

  )
  
  return (
    <div className="">
      <div className="flex mt-6 ml-5 w-50%">
        <Textarea
          placeholder="Type your note here..."
          value={newNote}
          onChange={handleInputChange}
        />
        <button onClick={handleAddNote} className="mr-2 bg-blue-400 px-4 py-2 rounded">
           {plusSvg()}
        </button>
      </div>
      <div className="flex mt-4 mx-2 pl-2 w-full lg:w-90p">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {
            notes.map((note, index) => (
            <div
              key={index}
              className={`p-2 rounded-md ${faintBlue}`}
              style={{ height: '350px', width: '350px' }}
            >
              <div className="relative flex flex-col h-full">
                <div className="flex-grow pd-2 mr-2">{note}</div>
                <div className="flex justify-end">
                  <button onClick={async () => { 
                      try {
                        setLoading(true);
                        await handleDeleteNote(index);
                      } catch (error) {
                        console.error('Error deleting note:', error.message);
                      } finally {
                        setLoading(false);
                      }
                    }}>{dustbinSvg(index)}
                  </button>
                </div>
                <div className="justify-start pd-2 mr-2 ">
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {loading && (
        <div className="flex items-center justify-center absolute inset-0 bg-gray-900 bg-opacity-50">
          <PulseLoader color="#5FA5F9" />
      </div>)}
    </div>
  );
};

export default Notes;