const orders = [
  {
    id: 'FRS-1024',
    customerId: 1,
    items: [
      { menuItemId: 'salmon-signature', name: 'Salmon Signature', quantity: 1, price: '$16.90' },
      { menuItemId: 'matcha-lemonade', name: 'Iced Matcha Lemonade', quantity: 2, price: '$5.50' },
    ],
    total: '$27.90',
    status: 'preparing',
    createdAt: '2026-09-28',
    estimatedReady: '15–20 min',
  },
  {
    id: 'FRS-1021',
    customerId: 1,
    items: [
      { menuItemId: 'shrimp-garden', name: 'Shrimp Garden', quantity: 1, price: '$15.50' },
    ],
    total: '$15.50',
    status: 'completed',
    createdAt: '2026-09-27',
    estimatedReady: null,
  },
  {
    id: 'FRS-1018',
    customerId: 1,
    items: [
      { menuItemId: 'earth-bowl', name: 'Earth Bowl', quantity: 1, price: '$14.50' },
      { menuItemId: 'ginger-kombucha', name: 'Ginger Peach Kombucha', quantity: 1, price: '$6.00' },
    ],
    total: '$20.50',
    status: 'completed',
    createdAt: '2026-09-25',
    estimatedReady: null,
  },
  {
    id: 'FRS-1015',
    customerId: 1,
    items: [
      { menuItemId: 'teriyaki-chicken', name: 'Teriyaki Chicken', quantity: 2, price: '$14.90' },
    ],
    total: '$29.80',
    status: 'completed',
    createdAt: '2026-09-22',
    estimatedReady: null,
  },
];

export default orders;
