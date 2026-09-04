# HRMS (Human Resource Management System)

A modern, responsive, and visually stunning Human Resource Management System (HRMS) dashboard designed to manage employee data, track key metrics, and provide a seamless user experience. 

The application utilizes a premium design system with playful aesthetics, micro-animations, and fluid components for a top-tier look and feel.

## 🛠️ Tech Stack

This application is built upon a robust and modern monolithic architecture:

- **Backend:** [Laravel](https://laravel.com/) (PHP) - For robust routing, server-side processing, and security.
- **Frontend:** [React](https://reactjs.org/) - For building a highly dynamic and interactive user interface.
- **Bridge:** [Inertia.js](https://inertiajs.com/) - Seamlessly connects Laravel and React without the complexity of a standalone REST/GraphQL API.
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first CSS framework for rapid UI development.
- **UI System:** [1st-Pouf](https://1st-pouf.worksonmy.dev/) - A premium component design system delivering rich aesthetics (cushions, stats, charts, buttons, datatables).
- **Form Handling:** [React Hook Form](https://react-hook-form.com/) - For performant and flexible form validations.
- **Icons:** [Lucide React](https://lucide.dev/) & [@tabler/icons-react](https://tabler.io/icons).
- **Build Tool:** [Vite](https://vitejs.dev/) - Lightning fast frontend tooling and Hot Module Replacement (HMR).

## ✨ Features (Current Prototype)

- **Interactive Dashboard:** Features KPI metric cards and a dynamic Department Distribution Donut Chart (powered by Recharts).
- **Employee Management (CRUD UI):**
  - Interactive data table with employee listings.
  - Dedicated forms for adding new employees and editing existing data.
- **Dynamic Navigation:** Beautiful Sidebar and Top Navbar complete with dynamic active-state routing and breadcrumb trails.

## 🗄️ Database

This project requires a relational database (defaulting to **MySQL**).
- **Default Database Name:** `hrms`
- *Note: As this is the initial frontend/prototype phase utilizing dummy data on the UI, specific migration tables for the employees are pending the backend logic implementation.*

---

## 🚀 Installation & Setup

Follow these instructions to clone and run the project locally.

### Prerequisites
Make sure your local environment meets the following requirements:
- **PHP** >= 8.2
- **Composer**
- **Node.js** & **npm**
- **MySQL Server**

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd hrms
```

### 2. Install Backend Dependencies
```bash
composer install
```

### 3. Environment Configuration
Duplicate the example environment file and rename it to `.env`:
```bash
cp .env.example .env
```
Open `.env` and configure your database credentials to match your local setup:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=hrms
DB_USERNAME=root
DB_PASSWORD=your_password
```
*(Ensure you have created an empty database named `hrms` in your MySQL server before proceeding).*

### 4. Generate Application Key
```bash
php artisan key:generate
```

### 5. Install Frontend Dependencies
```bash
npm install
```

### 6. Run the Application
You will need two separate terminal windows to run both the backend server and the frontend build tool simultaneously.

**Terminal 1 (Backend Server):**
```bash
php artisan serve
```
*This runs the PHP server, typically accessible at `http://localhost:8000`.*

**Terminal 2 (Frontend Vite Server):**
```bash
npm run dev
```
*This boots Vite to handle asset compilation and Hot Module Replacement (HMR).*

Once both servers are running, open your browser and navigate to:
**👉 `http://localhost:8000/admin/dashboard`**

---
*Built with ❤️ utilizing Laravel + React + 1st-Pouf.*
