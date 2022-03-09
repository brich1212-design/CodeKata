export type User = {
  id: string;
  name: string;
  email: string;
}

export type NoteMention = {
  id: number;
  userId: number;
  user: User;
}

export type Note = {
  id: number;
  content: string;
  mentions: NoteMention[];
}
