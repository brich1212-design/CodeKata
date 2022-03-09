import { User, Note, NoteMention } from "../common/models/kata-types";

export const moqUserList = () => {
  const userList = [
    {
      id: '1',
      name: 'Bill Richardson',
      email: 'bill.jess.richardson@gmail.com',
    },
    {
      id: '2',
      name: 'Marissa Richardson',
      email: 'bill.marissa@gmail.com',
    }
  ] as User[];

  return userList;
}

export const moqNotes = () => {
  const noteList = [
    {
      id: 1,
      content: 'Richardson family reunion @[Bill Richardson](bill.jess.richardson@gmail.com) @[Marissa Richardson](bill.marissa@gmail.com)',
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
      content: 'Index 2, ID 4.',
      mentions: [],
    },
    {
      id: 2,
      content: 'Index 3, ID 2',
      mentions: [],
    },
    {
      id: 3,
      content: 'Index 4, ID 3',
      mentions: [],
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
