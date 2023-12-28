import React, { useState } from 'react';
import { Public, Lock } from '@mui/icons-material';
import { Textarea } from '@nextui-org/react';
import PublicNotes from './PublicNotes';
import { useEffect } from 'react';
import axios from 'axios';
import { useSession } from "next-auth/react"

const Notes = ({ showPublicNotes }) => {
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState([]);
  const [publicNotes, setPublicNotes] = useState([]);
  const [isPrivate, setIsPrivate] = useState(true);
  const { data: session, status } = useSession()

  const handleInputChange = (e) => {
    setNewNote(e.target.value);
  };

  const handleTogglePublic = (index) => {
    const updatedPublicNotes = [...publicNotes];
    updatedPublicNotes[index] = !updatedPublicNotes[index]; // Toggle the public/private status for the specific note
    setPublicNotes(updatedPublicNotes);
  };

  const handleTogglePrivate = (index) => {
    const updatedPublicNotes = [...publicNotes];
    updatedPublicNotes.splice(index, 1);
    setIsPrivate(false);
    setPublicNotes(updatedPublicNotes);
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('/api/customers');
        const notesData = await response.json();
        console.log('Fetched notes:', notesData[0].content);
        for(let i = 0 ; i < notesData.length; i++) {
         if(!notes.includes(notesData[i].content)){
           notes.push(notesData[i].content);
         }
        }
        const publicNotesData = notesData.filter((note) => note.status === true);
        setPublicNotes(publicNotesData);
      } catch (error) {
        console.error('Error fetching notes:', error.message);
      }
    };

    fetchNotes();
  }, []); 


  const handleAddNote = async () => {
    if (status === "authenticated") {
      console.log(session.user.email);
    
      if (newNote.trim() !== '') {
        setNotes([newNote, ...notes]);
        setPublicNotes([newNote, ...publicNotes]); 
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

  const handleDeleteNote = (index) => {
    const updatedNotes = [...notes];
    const updatedPublicNotes = [...publicNotes];
    const deletedNote = updatedNotes.splice(index, 1)[0];
    updatedPublicNotes.splice(index, 1);
    setNotes(updatedNotes);
    deleteNoteFromServer(index)
  };
  
  const deleteNoteFromServer = async (index) => {
    const response = await axios.get('/api/customers');
    const notesData = response.data;
  
    const  customerId = notesData[index]._id;
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
      // Optionally, you can send an error response or rethrow the error here
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
      onClick={() => handleDeleteNote(index)}
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
      {showPublicNotes ?  <PublicNotes notes={publicNotes} /> :
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
                  <div>{dustbinSvg(index)}</div>
                </div>
                <div className="justify-start pd-2 mr-2 ">
                <button onClick={() => {
                      if (!publicNotes[index]) {
                        handleTogglePrivate(index);
                      } else {
                        handleTogglePublic(index);
                      }
                    }}>
                    {!publicNotes[index] ? <Lock /> : <Public />}
                </button>
                </div>
              </div>
            </div>
          )) }
        </div>
      </div>}
    </div>
  );
};

export default Notes;