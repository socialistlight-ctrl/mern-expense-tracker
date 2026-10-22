# Minimalist Expense & Budget Tracker

A secure, full-stack personal finance web application designed to help users track income, monitor expenses, and manage budgets cleanly and efficiently.

## Features
- Secure Authentication: User registration and login powered by JWT (JSON Web Tokens) and bcrypt password hashing.
- Isolated User Data: Strict backend authorization ensuring users can only view, add, and delete their own financial records.
- Dynamic Dashboard: Real-time calculation of net balance, total income, and total expenses with a 4-state UI handling (Loading, Success, Empty, and Error).
- Responsive Design: Clean and structured layout for managing transactions.

## Tech Stack
- Frontend: React (Vite), React Router, Lucide React
- Backend: Node.js, Express.js
- Database: MongoDB Atlas, Mongoose
- Security: JWT, Bcryptjs, CORS, Environment Variables

## Setup & Installation

1. Clone the repository:
   ```bash
   git clone [https://github.com/YOUR_USERNAME/your-repo-name.git](https://github.com/YOUR_USERNAME/your-repo-name.git)
   cd your-repo-name
2. Configure the Backend :
in bash-
cd server
npm install

Create a .env file in the server/ directory based on .env.example :

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET = your_jwt_secret_key

4. Configure the Frontend :
in bash -
cd ../client
npm install

Create a .env file in the client/ directory based on .env.example:

VITE_API_URL=http://localhost:5000/api

5. Run the Application:

Start the backend: cd server && npm run dev

Start the frontend: cd client && npm run dev

----Known Limitations & Future Improvements----

Limitations: Currently does not include graphical data visualization (like pie charts or expense breakdown graphs) or multi-currency support.

Future Improvements: Add Chart.js for visual spending analytics, export transactions to CSV, and add category budgeting limits.