/**
 * Hardcoded initial orders data for Farsly healthy-food ordering system.
 * Schema:
 * - id: string
 * - customerName: string
 * - orderType: "Dine-in" | "Takeaway" | "Delivery"
 * - createdAt: ISO 8601 string (sortable timestamp)
 * - items: Array<{ id: string, name: string, quantity: number, price: number }>
 * - totalPrice: number
 * - status: "pending" | "processing" | "completed"
 * - notes: string
 */

export const initialOrders = [
  {
    id: "ORD-1006",
    customerName: "Fajar Nugraha",
    orderType: "Delivery",
    createdAt: "2026-09-28T10:50:00.000Z",
    items: [
      { id: "item-6a", name: "Almond Berry Acai Bowl", quantity: 1, price: 62000 },
      { id: "item-6b", name: "Immunity Boost Orange Ginger", quantity: 1, price: 34000 }
    ],
    totalPrice: 96000,
    status: "pending",
    notes: "Leave package at reception desk"
  },
  {
    id: "ORD-1005",
    customerName: "Elena Wijaya",
    orderType: "Dine-in",
    createdAt: "2026-09-28T10:35:00.000Z",
    items: [
      { id: "item-5a", name: "Grilled Salmon Poke Bowl", quantity: 1, price: 78000 },
      { id: "item-5b", name: "Matcha Chia Seed Pudding", quantity: 1, price: 35000 }
    ],
    totalPrice: 113000,
    status: "processing",
    notes: "Table 05. Less dressing on salmon"
  },
  {
    id: "ORD-1004",
    customerName: "Dimas Anggara",
    orderType: "Takeaway",
    createdAt: "2026-09-28T10:20:00.000Z",
    items: [
      { id: "item-4a", name: "Mediterranean Herb Chicken Wrap", quantity: 2, price: 52000 },
      { id: "item-4b", name: "Cold-Pressed Green Detox Juice", quantity: 2, price: 32000 }
    ],
    totalPrice: 168000,
    status: "pending",
    notes: "Cut wrap into halves"
  },
  {
    id: "ORD-1003",
    customerName: "Citra Dewi",
    orderType: "Dine-in",
    createdAt: "2026-09-28T09:55:00.000Z",
    items: [
      { id: "item-3a", name: "Tofu Tempeh Teriyaki Bowl", quantity: 1, price: 48000 },
      { id: "item-3b", name: "Coconut Water Hydrator", quantity: 1, price: 25000 }
    ],
    totalPrice: 73000,
    status: "completed",
    notes: "Table 02. No peanuts due to allergy"
  },
  {
    id: "ORD-1002",
    customerName: "Budi Pratama",
    orderType: "Delivery",
    createdAt: "2026-09-28T09:40:00.000Z",
    items: [
      { id: "item-2a", name: "Warm Quinoa Veggie Bowl", quantity: 1, price: 55000 },
      { id: "item-2b", name: "Turmeric Ginger Tonic", quantity: 1, price: 30000 }
    ],
    totalPrice: 85000,
    status: "completed",
    notes: "Ring door bell upon arrival"
  },
  {
    id: "ORD-1001",
    customerName: "Aulia Rahma",
    orderType: "Dine-in",
    createdAt: "2026-09-28T09:15:00.000Z",
    items: [
      { id: "item-1a", name: "Avocado Quinoa Salad Bowl", quantity: 1, price: 58000 },
      { id: "item-1b", name: "Cold-Pressed Green Detox Juice", quantity: 1, price: 32000 }
    ],
    totalPrice: 90000,
    status: "completed",
    notes: "Table 04. Extra virgin olive oil"
  }
];

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
