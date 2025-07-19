# 🧠 Code Compiler API

A lightweight backend API built with **Node.js**, **TypeScript**, and **Docker** to compile and run user-submitted code securely inside isolated containers. Supports `C++`, `Python`, `Java`, and `JavaScript`.

---

## 🚀 Features

* 🐳 Docker-based isolated code execution
* 📥 Accepts code and input via JSON
* 🧾 Input redirection support via `input.txt`
* ☕ Multi-language support: `C++`, `Python`, `Java`, `JavaScript`
* 🔐 Memory-limited and network-restricted containers
* 🧼 Temp directory auto-cleanup after execution
* 📦 Clean and modular folder structure

---

## 🧱 Folder Structure

```
src/
├── config/              # Configuration files (if any)
├── controller/          # Handles HTTP logic (e.g., compileCode.ts)
├── db/                  # Placeholder for DB config
├── middleware/          # Custom error handlers
├── repository/          # Placeholder for DB queries
├── routes/              # API route handlers (codeRoutes.ts)
├── service/             # Core logic (codeRunner.ts)
├── utils/               # Helpers like Docker/file management
├── temp/                # Runtime code execution workspace
└── index.ts             # Entry point
```

---

## 🛠️ Tech Stack

* **Node.js**
* **TypeScript**
* **Express.js**
* **Docker**
* **fs-extra** for file operations
* **uuid** for generating temp folder names

---

## 📦 Installation

```bash
git clone https://github.com/your-username/code-compiler-api.git
cd code-compiler-api/server
npm install
```

---

## ▶️ Development

```bash
npm run dev
```

Make sure Docker is installed and running.

---

## 🌐 Routing

```ts
app.use('/api/code', router);
```

This means the compile endpoint is available at:

```
POST /api/code/compile
```

---

## 🧪 API Usage

### 📌 Endpoint

`POST /api/code/compile`

### 📤 Request Body

```json
{
  "language": "java",
  "code": "import java.util.*; class Main { public static void main(String[] args) { Scanner sc = new Scanner(System.in); String name = sc.nextLine(); System.out.println(\"Hello, \" + name + \"!\"); } }",
  "input": "Pramoth"
}
```

### 📥 Response

Success:

```json
{
  "success": true,
  "output": "Hello, Pramoth!\n",
  "error": "",
  "message": "Code compiled successfully"
}
```

Compilation/Runtime Error:

```json
{
  "success": false,
  "output": "",
  "error": "main.cpp: error: expected ‘}’ at end of input",
  "message": "Code compilation failed"
}
```

---

## ✅ Supported Languages & Base Docker Images

| Language   | Docker Image | Compile Command        | Run Command       |
| ---------- | ------------ | ---------------------- | ----------------- |
| C++        | `gcc`        | `g++ main.cpp -o main` | `./main`          |
| Python     | `python:3`   | *N/A*                  | `python3 main.py` |
| Java       | `openjdk`    | `javac Main.java`      | `java Main`       |
| JavaScript | `node`       | *N/A*                  | `node main.js`    |

---

## ⚙️ Docker Execution Behavior

* Memory-limited (`100MB`)
* Network disabled (`--network none`)
* Mounted volume: `/app` (temporary code folder)
* Auto-removes container on exit (`--rm`)
* Shell-based execution using `/bin/sh -c`

---

## 🧹 Cleanup

Temporary directories are deleted automatically after code execution using:

```ts
await fs.remove(dir);
```

---

## 📜 License

MIT

---

## ✨ Author

**Pramoth N**
[GitHub](https://github.com/Pramothsgp) | [LinkedIn](https://linkedin.com/in/pramoth-sgp-8263372a0)

---
## 📝 Contributing
Contributions are welcome! Please open an issue or submit a pull request.