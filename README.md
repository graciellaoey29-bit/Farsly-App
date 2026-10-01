# FARSLY — Healthy Food Ordering Web Application

## Overview

Farsly is a role-based React web application for a healthy food restaurant. It provides customers with a simple interface to browse healthy food, manage their cart and favorites, and place orders.

The application also provides a dedicated interface for restaurant staff to manage incoming orders and maintain menu items.

Farsly is developed as a **frontend-focused academic project** using React. The current implementation uses hardcoded/mock data and browser-based state management without a backend database.

### User Roles

- **Customer** — Browse the menu, manage favorites and cart, place orders, and view order information.
- **Restaurant Staff** — Manage incoming orders, update order status, and perform CRUD operations on menu items.

---

## Features

### Customer

- Register and login
- Role-based authentication
- Customer dashboard
- Browse healthy food menu
- View food details
- Search and filter menu items
- Add food to favorites
- Add food to cart
- Place orders
- View personal orders
- Track order status
- Logout

### Restaurant Staff

- Staff login
- Restaurant dashboard
- View incoming customer orders
- Update order status
- Kitchen/order management
- View menu and inventory
- Add menu items
- Edit menu items
- Delete menu items
- Update menu item availability
- Upload menu item images
- Preview menu item images

### System

- Role-based navigation
- Protected routes
- Different dashboards for each role
- Form validation
- Controlled React forms
- Empty states
- Responsive interface
- Reusable React components
- React Router navigation
- 404 Not Found page

---

## What is Implemented

The current frontend implementation includes:

| Feature | Status |
|---|---|
| React frontend | ✅ Implemented |
| Customer login | ✅ Implemented |
| Restaurant staff login | ✅ Implemented |
| Role-based access | ✅ Implemented |
| Customer dashboard | ✅ Implemented |
| Restaurant dashboard | ✅ Implemented |
| Menu browsing | ✅ Implemented |
| Favorites | ✅ Implemented |
| Shopping cart | ✅ Implemented |
| Customer ordering | ✅ Implemented |
| Order management | ✅ Implemented |
| Menu item CRUD | ✅ Implemented |
| Menu image upload | ✅ Implemented |
| Form validation | ✅ Implemented |
| Protected routes | ✅ Implemented |
| Role-based navigation | ✅ Implemented |
| Responsive design | ✅ Implemented |
| Empty states | ✅ Implemented |
| 404 page | ✅ Implemented |
| Backend / database | ❌ Not implemented |
| Real-time order processing | ❌ Not implemented |
| Online payment integration | ❌ Not implemented |

---

## Current Limitations

Farsly is currently a **frontend-only academic project**. The following limitations apply:

- No backend server is connected.
- No external database is used.
- User accounts are represented using demo/hardcoded data.
- Order data is simulated on the frontend.
- Restaurant order management does not communicate with a real restaurant system.
- Payment processing is not connected to a real payment gateway.
- Menu inventory is simulated using frontend data.
- Image uploads are handled locally in the browser and are not uploaded to a remote server.
- Real-time kitchen capacity monitoring is not connected to actual restaurant hardware or live data.
- External delivery services and GPS tracking are not integrated.
- Data persistence is limited to frontend/browser storage where applicable.

---

## Demo Accounts

Use the following accounts to test the different roles:

### Customer

```text
Email: customer@farsly.com
Password: password123
Role: Customer

Email:restaurant@farsly.com
passowrd:password123
Role:Admin
