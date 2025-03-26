Order & Expense Tracker
Overview
This is a full-stack web application built with Next.js 15, TypeScript, and Tailwind CSS. It allows users to manage order issues and track expenses, featuring drag-and-drop functionality for an enhanced user experience.

This project follows best practices in folder structure and state management using Redux Toolkit. Authentication will be added in the future.

Features
✅ Order Management: Track and manage order issues in real time.
✅ Expense Tracker: Log and categorize expenses efficiently.
✅ Drag-and-Drop: Interactive drag-and-drop functionality for better UX.
✅ State Management: Global state handling with Redux Toolkit.
✅ Dynamic UI: Built with Tailwind CSS and ShadCN for a modern design.
✅ Form Handling & Validation: Formik + Yup integration.
✅ Charts & Insights: Visualize expense and order data with Chart.js.

📦 project-root
├── 📂 app
│   ├── 📜 page.tsx
│   ├── 📜 layout.tsx
│   ├── 📜 global.css
│   ├── 📂 (pages)
│   │   ├── 📂 expenseTracker
│   │   │   ├── 📜 page.tsx
│   │   ├── 📂 orders
│   │   │   ├── 📜 page.tsx
│   │   │   ├── 📂 [id]
│   │   │   │   ├── 📜 page.tsx
│   │   ├── 📂 statistics
│   │   │   ├── 📜 page.tsx
├── 📂 components
│   ├── 📂 Theme
│   ├── 📂 Sidebar
│   ├── 📂 MyComponent
│   ├── 📂 Expense
│   ├── 📂 Orders
│   ├── 📂 UI (ShadCN components)
├── 📂 lib
│   ├── 📜 hooks.ts
│   ├── 📜 types.ts
│   ├── 📜 utils.ts
├── 📂 Redux
│   ├── 📂 slices
│   ├── 📜 store.ts
│   ├── 📜 storeProvider.tsx

Create a .env.local file in the root directory and add:
NEXT_PUBLIC_MAIN_URL=https://67d8653300348dd3e2a75668.mockapi.io/Expenses

Install with npm install/npm i or yarn
run the app with npm run dev or yarn 