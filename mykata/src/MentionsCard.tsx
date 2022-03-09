import React, { useState } from 'react';
import { Note, NoteMention } from './common/models/kata-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { IconButton } from '@mui/material';
import { Delete, Edit, Add, Undo } from '@mui/icons-material';
import { MentionsInput, MentionItem, Mention } from 'react-mentions';

function MentionsCard({ allNotes, userList, onChangeCb, note } : {allNotes:any, userList:any[], onChangeCb:any, note:any}) {
  let textAreaControl = React.createRef<HTMLTextAreaElement>();
  const [isReadOnly, setInputState] = useState(!note.id ? false : true);
  const [isListenerAttached, setListener] = useState(false);
  const [isClickListenerAttached, setClickListener] = useState(false);

  React.useEffect(() => {
    if (!note.id && !isListenerAttached) {
      const saveButton = document.getElementById('create-button');
      saveButton?.addEventListener('click', function() {
        document.dispatchEvent(new CustomEvent('actionButton:create'));
      });
      setListener(true);
    }
  }, [note.id, isListenerAttached]);

  React.useEffect(() => {
    if (!note.id && !isClickListenerAttached) {
      const noteMentions = Array.from(document.getElementsByClassName('my-mention'));
      if (noteMentions) {
        noteMentions.forEach((nm) => {
          nm?.addEventListener('click', function() {
            document.dispatchEvent(new CustomEvent('mention:click', {
              detail: {
                username: nm.innerHTML,
              }
            }));
          });
        });
      }
      
      setClickListener(true);
    }
  }, [note.id]);
   
  const handleChange = (note:any, event:any, newValue:string, newPlainTextValue:string, mentions:MentionItem[] ) => {
    if (note.id > 0) {
      let myArray = [...allNotes];
      let existingNote = myArray.find((ma) => ma.id === note.id);

      if (existingNote) {
        existingNote.content = event.target.value;
        onChangeCb(myArray);
      }
    }
    else {
      const newNote = {
        id: 0,
        content: newValue,
        mentions: []
      } as Note;

      let myMentions = [...mentions];
      if (myMentions) {
        newNote.mentions = myMentions.map((mm) => {
          const foundUser = userList.find((u) => u.email === mm.id);          
          return {
            id: parseInt(mm.id) || 0,
            userId: parseInt(foundUser.id) || 0,
            user: foundUser
          } as NoteMention
        });
      }

      onChangeCb(newNote);
    }
  }
  const handleDelete = () => {
    let myArray = [...allNotes];

    if (note.id > 0) {
      let existingNoteIndex = myArray.findIndex((ma) => ma.id === note.id);

      if (existingNoteIndex >= 0) {
        myArray.splice(existingNoteIndex, 1);
        onChangeCb(myArray);
      }
    }
  }
  const clearCard = () => {
    onChangeCb({} as Note);
  }
  const deleteCard = () => {
    handleDelete();
  }
  const editCard = () => {
    setInputState(false);
    console.log(note);
    if (textAreaControl.current) {
      textAreaControl.current.focus();
    }
  }
  const blurInput = (event:any, clickedSuggestion:boolean) => {
    console.log('blurred...');
    console.log(event);
    console.log(clickedSuggestion);
    setInputState(!note.id ? false : true);
  }
  const focusInput = () => {
    if (textAreaControl.current) {
      textAreaControl.current.selectionStart=textAreaControl.current.value.length;
      textAreaControl.current.selectionEnd=textAreaControl.current.value.length;
    }
  }

  return <Box>
    <Card>
      <CardContent>
        <MentionsInput
          value={ note.content }
          inputRef={textAreaControl}
          className="my-mentions-input"
          onChange={(e, nv, nptv, m) =>{ handleChange(note, e, nv, nptv, m) }}
          onFocus={focusInput}
          onBlur={(e, cs) => { blurInput(e, cs) }}
          spellCheck="false"
          readOnly={isReadOnly}>
          <Mention
            trigger="@"
            className="my-mention"
            data={userList.map((ul) => ({
              id: ul.email,
              display: ul.name,
              user: ul,
            }))}
            displayTransform={(id, display) => `@${display}`} />
        </MentionsInput>
      </CardContent>
      {(!note.id) && (
        <CardActions>
          <IconButton size="small" id='create-button'>
            <Add />
          </IconButton>
          <IconButton size="small" onClick={clearCard}>
            <Undo />
          </IconButton>
        </CardActions>
      )}
      {(note.id > 0) && (
        <CardActions>
          <IconButton size="small" onClick={editCard}>
            <Edit />  
          </IconButton>
          <IconButton size="small" onClick={deleteCard}>
            <Delete />  
          </IconButton>
        </CardActions>
      )}
    </Card>
  </Box>
}

export default MentionsCard;
