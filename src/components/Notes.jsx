import React, { useState } from 'react';
import { Textarea } from '@nextui-org/react';
import { useEffect } from 'react';
import axios from 'axios';
import { useSession } from "next-auth/react"
import { PulseLoader } from 'react-spinners';


const Notes = ({userId}) => {
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { data: session } = useSession();
  const handleInputChange = (e) => {
    setNewNote(e.target.value);
  };
  useEffect(() => {
    const fetchNotes = async () => {
      if (!session) return;
      setLoading(true);
      try {
        const response = await axios.get('/api/content', { params: { userId: userId } });
        const notesData = response.data;
        setNotes(prevNotes => {
          const uniqueNotes = notesData.reduce((accumulator, note) => {
              const exists = accumulator.some(existingNote => existingNote.content === note.content);
                  if (!exists) {
                  return [...accumulator, note];
              }
              return accumulator;
          }, prevNotes);
      
          return uniqueNotes;
      });
      
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, [session, notes, deleting]);
  

  const handleAddNote = async () => {
    if (newNote.trim() !== '') {
      setNotes([...notes, { content: newNote }]);
      setNewNote('');
      try {
        const response = await addNoteToDatabase({  content: newNote , email :session.user.email});
        if (response.ok) {
          await response.json();
        } 
      } catch (error) {
        console.error('Error adding note to database:', error.message);
      }
    }
  };

  const addNoteToDatabase = async (newNote) => {
    try {
      const response = await axios.post(`/api/content?createdBy=${userId}`, newNote, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      return response;
    } catch (error) {
      throw new Error('Error adding note to database');
    }
  };

  const handleDeleteNote = async (index, note) => {
    setLoading(true);
    let updatedNotes = [...notes];
    const deletedNote = updatedNotes.splice(index, 1);
    setDeleting(true);
    try {
        await deleteNoteFromServer(note); 
        setNotes(updatedNotes);
        console.log("After Deletion", updatedNotes);
    } catch (error) {
        console.error("Error deleting note:", error);
    }
    setDeleting(false);
    setLoading(false);
  };

  const deleteNoteFromServer = async (content) => {
      try{
      await axios.delete('/api/content', { params: { content: content.content || content }});
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
          {notes.map((note, index) => {
            return (
              <div
                key={index}
                className={`p-2 rounded-md ${faintBlue}`}
                style={{ height: '350px', width: '350px' }}
              >
                <div className="relative flex flex-col h-full">
                  <div className="flex-grow pd-2 mr-2">{note?.content || note}</div>
                  <div className="flex justify-end">
                    <button
                      onClick={async () => {
                        try {
                          setLoading(true);
                          await handleDeleteNote(index , note);
                        } catch (error) {
                          console.error('Error deleting note:', error.message);
                        } finally {
                          setLoading(false);
                        }
                      }}
                    >
                      {dustbinSvg(index)}
                    </button>
                  </div>
                  <div className="justify-start pd-2 mr-2">{/* Additional content */}</div>
                </div>
              </div>
            );
          })}
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