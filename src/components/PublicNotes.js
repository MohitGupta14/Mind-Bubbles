import React from 'react';

const PublicNotes = (props) => {
  return (
    <div className="flex mt-4 mx-2 pl-2 w-full lg:w-90p">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {props.notes.map((note, index) => (
          <div
            key={index}
            className={`p-2 rounded-md bg-blue-300`}
            style={{ height: '350px', width: '350px' }}
          >
            <div className="relative flex flex-col h-full">
              <div className="flex-grow pd-2 mr-2">{note}</div>
              <div className="flex justify-end">
                <div></div>
              </div>
              <div className="justify-start pd-2 mr-2">
                <button onClick={() => handleTogglePublic(index)}></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicNotes;
