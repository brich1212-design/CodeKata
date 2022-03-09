import { User, Note, NoteMention } from "../common/models/kata-types";

export const moqUserList = () => {
  const userList = [
    {
      id: '1',
      name: 'Bill Richardson',
      email: 'bill@gmail.com',
    },
    {
      id: '2',
      name: 'Marissa Richardson',
      email: 'marissa@gmail.com',
    },
    {
      id: '3',
      name: 'Brooklyn Richardson',
      email: 'brooklyn@gmail.com',
    },
    {
      id: '4',
      name: 'Tristan Carlson-Inks',
      email: 'tristan@gmail.com',
    },
    {
      id: '5',
      name: 'William Richardson',
      email: 'baquines@gmail.com',
    }
  ] as User[];

  return userList;
}

export const moqNotes = () => {
  const noteList = [
    {
      id: 1,
      content: 'Richardson family reunion @[Bill Richardson](bill@gmail.com) @[Marissa Richardson](marissa@gmail.com)',
      mentions: [
        {
          id: 1,
          userId: 1,
          user: {
            id: '1',
            name: 'Bill Richardson',
            email: 'bill.jess.richardson@gmail.com',
          },
        },
        {
          id: 2,
          userId: 2,
          user: {
            id: '2',
            name: 'Marissa Richardson',
            email: 'bill.marissa@gmail.com',
          },
        }
      ],
    },
    {
      id: 4,
      content: 'Are you coming? @[William Richardson](baquines@gmail.com)',
      mentions: [
        {
          id: 3,
          userId: 5,
          user: {
            id: '5',
            name: 'William Richardson',
            email: 'baquines@gmail.com',
          },
        }
      ],
    },
    {
      id: 2,
      content: '@[Tristan Carlson-Inks](tristan@gmail.com) are you going to be able to make it? It starts at 6pm.',
      mentions: [
        {
          id: 4,
          userId: 4,
          user: {
            id: '4',
            name: 'Tristan Carlson-Inks',
            email: 'tristan@gmail.com',
          },
        }
      ],
    },
    {
      id: 3,
      content: 'And @[Brooklyn Richardson](tristan@gmail.com) you need to get to bed. Turn off the iPad.',
      mentions: [{
        id: 5,
        userId: 3,
        user: {
          id: '3',
          name: 'Brooklyn Richardson',
          email: 'brooklyn@gmail.com',
        },
      }],
    },
  ] as Note[];

  return noteList;
}

export const getNoteMentions = () => {
  const noteMentionList = [
    {
      id: 1,
      userId: 1,
      user: {
        id: '1',
        name: 'Bill Richardson',
        email: 'bill.jess.richardson@gmail.com',
      },
    },
    {
      id: 2,
      userId: 2,
      user: {
        id: '2',
        name: 'Marissa Richardson',
        email: 'bill.marissa@gmail.com',
      },
    },
  ] as NoteMention[];

  return noteMentionList;
}

export async function deleteNote(data:Note) {
  try {
    const response = await fetch(`/api/note/delete/${data.id}`, {
      method: 'DELETE'
    });
    return await response.text();
  } catch(error) {
    return Promise.resolve(data);
  }
}

export async function getAllUsers() {

  try {
      const response = await fetch('/api/users');
      return await response.json() as User[];
  } catch(error) {
      return [];
  }
}

export async function getAllNotes() {
  try {
      const response = await fetch('/api/notes');
      return await response.json() as Note[];
  } catch(error) {
      return [];
  }
}

export async function upsertNote(data:Note) {
  try {
    // Backend would insert or update based on id
    const response = await fetch(`/api/note`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({note: data})
    });
    return await response.json() as Note;
  } catch(error) {
    return Promise.resolve(data);
  }
}
