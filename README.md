# ⚖️ ModQueue – Moderation Dashboard

A React-based moderation dashboard where pending posts can be **approved**, **rejected**, or **previewed**.  
Built with **React, Redux Toolkit, and simple CSS**.

---

🌐 **Live Demo:** [https://moderation-queue-nine.vercel.app/](https://moderation-queue-nine.vercel.app/)

## 🚀 Features
- View posts in **Pending, Approved, and Rejected** tabs
- Batch select with **Approve / Reject / Clear** actions
- Confirmation dialogs for batch actions
- **Undo support** for approvals/rejections
- **Search & Sort** (by title, author, date)
- Smart **pagination** with "jump" feature
- **Preview modal** with full post details
- Persistent data (stored in browser localStorage)

---

## 🛠️ Tech Stack
- **Frontend:** React + Redux Toolkit
- **Styling:** CSS
- **State Management:** Redux
- **Mock Data:** `mockData.js` (simulated posts)

---

## 📦 Getting Started

### 1. Clone the repo
git clone https://github.com/jatin283/moderation_queue.git
cd moderation_queue

### 2. Install Dependencies
npm install

### 3. Run the development server
npm start


### How to Use
Open the app

Navigate between Pending / Approved / Rejected tabs

Select posts → Approve or Reject them

Preview posts with more details

Use the search bar or sorting dropdown

