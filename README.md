# Puterbench

**Puterbench** is a full-stack E-Commerce platform specialized for computer hardware enthusiasts. It features a robust product catalog, user authentication, and shopping cart functionality with admin dashboard and orders. Built with the **MERN** stack (MongoDB, Express.js, React/Next.js, Node.js).

## Key Features

- **User Authentication**: Secure login and registration using JWT (JSON Web Tokens) and secure password hashing.
- **Product Management**: Browse, search, and filter computer parts.
- **Shopping Cart & Checkout**: Full cart functionality with order processing and shipping details.
- **Admin Dashboard**: Manage products, categories, and view all orders.
- **Image Uploads**: Integrated with Cloudinary.
- **Responsive UI**: Modern interface built with **Next.js**, **Tailwind CSS** and **Reusable Components**.

## Tech Stack

### Frontend

- **Framework**: Next.js 14+
- **Styling**: Tailwind CSS

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (using Mongoose ODM)
- **Storage**: Cloudinary (Multer storage)

---

## ⚙️ Running Locally

Follow these steps to run the project locally.

### Prerequisites

- MongoDB (Local or Atlas URI)
- Cloudinary Account (for image uploads)

### 1. Clone the Repository

```bash
git clone [https://github.com/mohammadmohid/puterbench.git](https://github.com/mohammadmohid/puterbench.git)
cd puterbench
```

### 2. Backend Setup

Navigate to the backend folder, and install dependencies.

```bash
cd backend
npm install

```

**Create a `.env` file in the `backend/` directory:**

```env
PORT=5000
MONGO_URL=ENTER_YOUR_MONGO_URI_HERE
JWT_SECRET=your_super_secret_jwt_key
CLIENT_URL=http://localhost:3000

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

```

**Start the Backend:**

```bash
npm start
# or for development:
npm run dev

```

### 3. Frontend Setup

Navigate to the frontend folder, and install dependencies.

```bash
cd frontend
npm install

```

**Create a `.env.local` file in the `frontend/` directory:**

```env
NEXT_PUBLIC_API_URL=http://localhost:5000

```

**Start the Frontend:**

```bash
npm run dev

```

Visit `http://localhost:3000` to view the application.

---

## 📡 API Documentation

The backend exposes a RESTful API. Below are the key endpoints accessible at `http://localhost:5000/`.

### Users (`/user`)

- `POST /user/register` - Register a new user
- `POST /user/auth` - Login user & get token
- `POST /user/logout` - Logout user
- `GET /user/profile` - Get user profile details
- `PUT /user/profile` - Update user profile

### Products (`/products`)

- `GET /products/getProducts` - Fetch all products
- `GET /products/getProduct/:id` - Fetch single product details
- `POST /products/addProduct` - Create a new product (Admin only, Form Data)
- `PUT /products/updateProduct/:id` - Update a product (Admin only)
- `DELETE /products/deleteProduct/:id` - Remove a product (Admin only)
- `POST /products/:id/reviews` - Add a review to a product

### Categories (`/categories`)

- `GET /categories/getCategory` - Fetch all categories
- `POST /categories/createCategory` - Create a new category (Admin only)

### Cart (`/cart`)

- `GET /cart/:userId` - Get user's cart
- `POST /cart/addToCart` - Add item to cart
- `PUT /cart/updateCart` - Update item quantity
- `DELETE /cart/removeFromCart` - Remove item from cart

### Orders (`/orders`)

- `POST /orders` - Create a new order
- `GET /orders/myorders` - Get logged-in user's order history
- `GET /orders` - Get all orders (Admin only)

---

## 📂 Project Structure

```
puterbench/
├── backend/                # Express.js API
│   ├── config/             # DB & Cloudinary config
│   ├── controllers/        # Request logic
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API Routes
│   └── index.js            # Server entry point
│
├── frontend/               # Next.js Application
│   ├── src/
│   │   ├── app/            # App Router pages
│   │   ├── components/     # Reusable UI components
│   │   └── utils/          # API helper functions
│   └── public/             # Static assets
└── README.md

```

## Deployment

This project is deployed using **Vercel**.

- **Frontend**: Hosted on Vercel.
- **Backend**: Hosted as a Vercel Serverless Function.
