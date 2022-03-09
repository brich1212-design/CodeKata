import React, { useState, useRef } from 'react';
import { moqUserList, moqNotes } from './services/kataService';
import MentionsCard from './MentionsCard';
import { Note } from './common/models/kata-types';
import './App.css';
import './mention-style.scss';

function App() {
  const [users] = useState(moqUserList);
  const [notes, setNotes] = useState(moqNotes);
  const [newnote, setNote] = useState({} as Note);
  const lastCardDiv = useRef<HTMLDivElement>(null);
  
  const createNote = React.useCallback(() => {
    let myArray = [...notes];
    const myNote = Object.create(newnote);

    // Insert note to db, set state on return
    // upsertNote(myNote)
    //  .then((data) => {
    //    myArray.push(data);
    //    setNotes(myArray);
    //  });

    // fake a next id
    const maxId = myArray.reduce((a, b) => (a.id > b.id) ? a : b, {id: 1}).id;
    myNote.id = maxId + 1;

    myArray.push(myNote);
    setNotes(myArray);
    setNote({} as Note);

    if(lastCardDiv.current){
      lastCardDiv.current.scrollIntoView({ 
         behavior: "smooth", 
         block: "nearest"
      });
    }
  }, [newnote, notes]);

  React.useEffect(() => {
    document.addEventListener("actionButton:create", createNote);

    return () => { 
      document.removeEventListener("actionButton:create", createNote) 
    };    
  }, [createNote]);

  const clickMention = React.useCallback((e) => {
    const clickName = e.detail.username.substring(1);
    let existingUser = users.find((u) => u.name === clickName);
    if (existingUser) {
      console.log(existingUser);
    } else {
      console.log('No user found...');
    }
  }, [users]);

  React.useEffect(() => {
    document.addEventListener("mention:click", clickMention);

    return () => { 
      document.removeEventListener("mention:click", clickMention) 
    };    
  }, [clickMention]);

  return (
    <div className="App">
      <div className='card-wrapper'>
        <div className="card-container">
          {notes.map((note, index) => (
            <div className='kata-comp' key={note.id} {...(index+1 === notes.length ? {ref:lastCardDiv} : {})}>
              <MentionsCard allNotes={notes}
                userList={users}
                onChangeCb={setNotes}
                note={note}/>
            </div>
          ))}
        </div>
        <div className='card-container'>
          <div className='kata-comp'>
            <MentionsCard allNotes={notes}
              userList={users}
              onChangeCb={setNote}
              note={newnote}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
