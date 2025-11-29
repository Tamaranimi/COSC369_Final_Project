# 📘 AI Schedule Assistant — Final Project  
A full-stack web application that helps students manage class schedules, view their enrolled courses, talk to an AI assistant, and store chat history & course data in MongoDB.

Built with:

- **Node.js + Express**
- **MongoDB Atlas + Mongoose**
- **Gemini 2.5 Flash API**
- **HTML/CSS/JavaScript**
- **Modular UI components & persistent chat history**

---

## 🚀 Features

### ✅ **AI Chatbot (Gemini)**
- Helps with scheduling questions  
- Understands student’s current classes  
- Shows schedules using auto-generated HTML tables  
- Saves all conversations to MongoDB  
- Sidebar shows chat history  
- Users can delete past chats

### ✅ **MongoDB-Backed Course System**
- Course catalog stored in MongoDB  
- Student schedule stored in MongoDB  
- Add & remove courses dynamically  
- Automatic seeding from JSON on first launch  

### ✅ **Interactive Schedule Page**
- Displays student’s current courses with real data from Mongo  
- Remove course (X button)  
- Add course via modal popup  
- Auto-updates schedule after changes  

---
# 🛠 Installation & Setup

## 1️⃣ Install Node.js
Required version: **Node 18+**

Check your version:
```bash
node -v
```

Download if needed: https://nodejs.org

---

## 2️⃣ Clone the Repository
```bash
git clone <your-repo-url>
cd COSC369_Final_Project/server
```

---

## 3️⃣ Install Backend Dependencies
```bash
npm install
```

---

## 4️⃣ Create a `.env` File
Inside `server/.env`:

```env
MONGO_URL=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
PORT=3001
```

⚠️ Everyone must **your own** keys.
Scroll down to team setup to see how to get keys

---

## 5️⃣ Automatic Database Seeding
On first run, the server will automatically:

- Seed the **course catalog** from `json/course_catalog.json`
- Seed the **student schedule** from `json/student_schedule.json`
- Create a **demo user**:
  - Email: `demo@chat.com`
  - Password: `password`

After this, MongoDB becomes the **source of truth**.

---

## 6️⃣ Start the Backend Server
```bash
node server.js
```

Expected output:

```
Connected to MongoDB
Seeded X courses into MongoDB
Created schedule for demo user
Server listening on http://localhost:3001
```

---

## 7️⃣ Run the Frontend
Simply open:

```
index.html
```

You may open it directly or use VS Code Live Server.

---

---

# 🤝 Team Setup Notes

Each teammate must:

- Install Node  
- Clone the repo  
- Run `npm install` in `/server`  
- Create `server/.env`  
- Start backend with:
  ```bash
  node server.js
  ```
- Open `index.html`

# 🔑 How to Get Your Required API Keys

To run this project, you need **two keys**:

1. **Gemini API Key**  
2. **MongoDB Atlas Connection String**

Follow the steps below.

---

# 🧠 1️⃣ Get Your Gemini API Key (Google AI Studio)

1. Go to **Google AI Studio**:  
   https://aistudio.google.com

2. Sign in with your Google account.

3. Click **Get API Key** (left sidebar  
   → “API Keys”).

4. Click **Create API Key**  
   and choose:
   - **Model: Gemini**  
   - **Platform: Web or Node.js**

5. Copy the generated key.

6. Paste it into your `.env` file as:

```env
GEMINI_API_KEY=YOUR_GENERATED_KEY_HERE
```
**Note: DO NOT COMMIT THIS KEY, DO NOT PASTE THIS KEY ANYWHERE BUT YOUR .ENV FILE**

✔ Gemini key is now ready.

---

# 🗄️ 2️⃣ Get Your MongoDB Atlas Connection String

1. Go to **MongoDB Atlas**:  
   https://www.mongodb.com/cloud/atlas

2. Log in or create a free account.

3. Click **Create** to make a new project.

4. Create a **Shared Cluster** (free tier).

5. Choose:
   - Cloud provider: **AWS (default)**
   - Region: **the cheapest one**

6. When the cluster is ready, click **Connect**.

7. Choose **Driver** → **Node.js**.

8. Copy the connection string, which looks like:

```
mongodb+srv://<username>:<password>@cluster0.xxxxxx.mongodb.net/
```

9. Replace `<username>` and `<password>`  
   with the database user *you created* when setting up the cluster.

10. Add it to your `.env` file:

```env
MONGO_URL=mongodb+srv://<username>:<password>@cluster0.xxxxxx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

11. In Atlas → **Network Access** →  
    Add your IP address:  
    - Click **Add IP Address**  
    - Choose **Allow access from anywhere** (0.0.0.0/0) for development

✔ MongoDB key is now ready.

---

# 📝 Final `.env` Example

```env
MONGO_URL=mongodb+srv://yourUser:yourPass@cluster0.xxxxxx.mongodb.net/?retryWrites=true&w=majority
GEMINI_API_KEY=yourGeminiKeyHere
PORT=3001
```

You must restart the backend after creating or editing the `.env` file.

After this, you’re fully set up.

# 🎯 How to Use the App

## 🧠 Chatbot (AI Schedule Assistant)
- Ask any scheduling question  
- Bot uses real data from MongoDB  
- Chat history is saved  
- Sidebar shows previous conversations  
- Click a conversation to reload it  
- Click the trash icon to delete it  

---

## 📚 Schedule Page

### View Current Courses
Loaded from MongoDB:

- Course ID  
- Name  
- Days  
- Time  
- Professor  
- Location  

### Remove a Course
- Click the **X** on the course card  
- Calls:
  ```http
  POST /api/schedule/drop
  ```
- UI reloads

### Add a Course
- Click **Add Class**  
- Modal popup appears  
- Enter a course ID  
- Calls:
  ```http
  POST /api/schedule/add
  ```
- UI refreshes

---

# 🔧 API Endpoints

## 💬 Chat Endpoints
```http
POST   /api/chat
GET    /api/conversations
GET    /api/conversations/:id
DELETE /api/conversations/:id
```

## 📘 Student Schedule Endpoints
```http
GET    /api/schedule
POST   /api/schedule/add
POST   /api/schedule/drop
```

### Example Add Course Request
```json
{
  "courseId": "ENGR110"
}
```

### Example Drop Course Request
```json
{
  "courseId": "ENGR110"
}
```
---

# 🧪 Troubleshooting

## ❌ “MONGO_URL is missing”
Ensure `.env` exists in `/server`.

## ❌ Can't connect to MongoDB
Check:
- Connection string correctness  
- IP allowlist in MongoDB Atlas  
- Cluster is running  

## ❌ Chat not saving
Check:
- MongoDB permissions  
- `.env` values  
- DevTools console errors  

---

