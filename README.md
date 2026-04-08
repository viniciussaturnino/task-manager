# Task Manager

A simple HTTP server for task management built with pure Node.js, with no external dependencies (except for CSV parsing). The application offers a complete RESTful API to create, read, update, delete, and mark tasks as complete.

## 🌟 Features

- ✅ **Complete CRUD**: Create, Read, Update, Delete tasks
- 🔍 **Search**: Search tasks by title or description
- ✓ **Mark Complete**: Dedicated endpoint to complete tasks
- 💾 **Persistence**: Data stored in local JSON file
- 🚀 **Watch Mode**: Development with automatic reload
- 📦 **Minimalist**: Built with native Node.js, no frameworks

## 📋 Requirements

- Node.js 18+ 
- npm or yarn

## 🚀 Installation and Setup

1. **Clone or access the project:**
   ```bash
   cd task-manager
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   npm run dev
   ```

   The server will be available at: `http://localhost:3333`

## 📡 API Endpoints

### 1. Create Task
**POST** `/tasks`

```json
{
  "title": "My Task",
  "description": "Task description"
}
```

**Response:** `201 Created`

### 2. List Tasks
**GET** `/tasks`

Returns all tasks in JSON format.

**Query Parameters:**
- `search` (optional): Search by title or description

Example: `GET /tasks?search=important`

**Response:**
```json
[
  {
    "id": "uuid-here",
    "title": "My Task",
    "description": "Task description",
    "completed_at": null,
    "created_at": "2026-04-07T10:00:00.000Z",
    "updated_at": "2026-04-07T10:00:00.000Z"
  }
]
```

### 3. Update Task
**PUT** `/tasks/:id`

```json
{
  "title": "Updated Title",
  "description": "Updated Description"
}
```

**Response:** `204 No Content`

### 4. Complete Task
**PATCH** `/tasks/:id/complete`

Marks the task as complete and sets `completed_at` with the current date and time.

**Response:** `204 No Content`

### 5. Delete Task
**DELETE** `/tasks/:id`

**Response:** `204 No Content`

## 📁 Project Structure

```
task-manager/
├── src/
│   └── server.js              # Main HTTP server
├── database/
│   └── db.js                  # Database management class
├── routes/
│   └── routes.js              # All route definitions
├── middlewares/
│   └── json.js                # JSON parsing middleware
├── utils/
│   ├── build-route-path.js    # Route builder with regex
│   ├── extract-query-params.js # Query parameter extractor
│   └── tasks.csv              # Sample CSV file
├── streams/
│   └── upload-to-http-stream.js # HTTP upload utility
├── db.json                    # Database file (auto-created)
├── package.json               # Project dependencies
└── README.md                  # This file
```

## 🛠️ Technologies Used

- **Node.js**: JavaScript runtime
- **HTTP Module (Native)**: Web server
- **File System (Native)**: Data persistence
- **CSV-Parse**: CSV file parsing

## 💻 Available Scripts

- `npm run dev`: Starts the server in watch mode (automatically reloads)

## 📝 Usage Examples

### Create a task:
```bash
curl -X POST http://localhost:3333/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learn Node.js",
    "description": "Study HTTP server models"
  }'
```

### List tasks:
```bash
curl http://localhost:3333/tasks
```

### Search tasks:
```bash
curl "http://localhost:3333/tasks?search=Node"
```

### Complete a task:
```bash
curl -X PATCH http://localhost:3333/tasks/{id}/complete
```

### Delete a task:
```bash
curl -X DELETE http://localhost:3333/tasks/{id}
```

## 📄 License

ISC