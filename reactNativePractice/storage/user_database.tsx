export type User = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  dob: string; // yyyy-mm-dd
  portraitUri?: string;
  password?: string;
};

/* Temp hardcoded users */
export const users: User[] = [
  {
    id: '1',
    firstName: 'Anon',
    lastName: 'User',
    username: 'anonuser',
    email: 'anon@email.com',
    phone: '000-000-0000',
    dob: '1990-01-01',
    password: 'password123',
  },
  {
    id: '2',
    firstName: 'J. Robert',
    lastName: 'Oppenheimer',
    username: 'oppenheimer',
    email: 'oppenheimer@email.com',
    phone: '111-111-1111',
    dob: '1904-04-22',
  },
  {
    id: '3',
    firstName: 'Albert',
    lastName: 'Einstein',
    username: 'einstein',
    email: 'einstein@email.com',
    phone: '222-222-2222',
    dob: '1879-03-14',
  },
  {
    id: '4',
    firstName: 'Isaac',
    lastName: 'Newton',
    username: 'newton',
    email: 'newton@email.com',
    phone: '333-333-3333',
    dob: '1643-01-04',
  },
  {
    id: '5',
    firstName: 'Marie',
    lastName: 'Curie',
    username: 'curie',
    email: 'curie@email.com',
    phone: '444-444-4444',
    dob: '1867-11-07',
  },
  {
    id: '6',
    firstName: 'Nikola',
    lastName: 'Tesla',
    username: 'tesla',
    email: 'tesla@email.com',
    phone: '555-555-5555',
    dob: '1856-07-10',
  },
];