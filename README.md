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
- **Dark mode toggle**
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


### Project Structure
src/
  components/   # Reusable UI components (Navbar, Toolbar, Tabs, PostList, etc.)
  store/        # Redux slices (postsSlice, uiSlice)
  mockData.js   # Initial mock posts
  App.js        # Main app logic
  App.css       # Global styles
public/
  favicon.ico   # App icon (⚖️ ModQueue symbol)
  index.html    # Entry point


### How to Use
Open the app

Navigate between Pending / Approved / Rejected tabs

Select posts → Approve or Reject them

Preview posts with more details

Use the search bar or sorting dropdown

