let storedUsers = [];
try {
  const data = localStorage.getItem('farsly_registered_users');
  if (data) {
    storedUsers = JSON.parse(data);
  }
} catch (e) {
  console.error('Failed to load registered users', e);
}

export const mockUsers = [
  {
    id: 1,
    name: 'Sarah Customer',
    email:  'customer@farsly.com',
    password: 'password123',
    role: 'customer'
  },
  {
    id: 2,
    name: 'Farsly Admin',
    email: 'restaurant@farsly.com',
    password: 'password123',
    role: 'restaurant'
  },
  ...storedUsers
];

export const addUser = (newUser) => {
  mockUsers.push(newUser);
  storedUsers.push(newUser);
  localStorage.setItem('farsly_registered_users', JSON.stringify(storedUsers));
};