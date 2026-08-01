# Letters for S 💌

A small Flask web app for writing and sharing letters  built with Python on the backend and a simple HTML/CSS/JS frontend.

## ✨ Features

- Write and view personal letters through a clean web interface
- Flask-based backend for handling routes and logic
- Custom styling for a warm, personal feel

## 🛠️ Tech Stack

- **Backend:** Python, Flask
- **Frontend:** HTML, CSS, JavaScript
- **Templating:** Jinja2 (via Flask `templates/`)

## 📁 Project Structure

```
letters-for-s/
├── app.py              # Main Flask application entry point
├── letters.py           # Logic for handling letters
├── requirements.txt     # Python dependencies
├── templates/            # HTML templates (Jinja2)
├── static/               # CSS, JS, images
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- pip

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/unnatissrivastava/letters-for-s.git
   cd letters-for-s
   ```

2. Create a virtual environment (recommended)
   ```bash
   python -m venv venv
   source venv/bin/activate   # On Windows: venv\Scripts\activate
   ```

3. Install dependencies
   ```bash
   pip install -r requirements.txt
   ```

4. Run the app
   ```bash
   python app.py
   ```

5. Open your browser and go to `http://127.0.0.1:5000`

## 🌐 Deployment

This is a Flask app, so it **cannot** be hosted on GitHub Pages (which only supports static sites). To deploy it live, use a platform that supports Python, such as:

- [Render](https://render.com)
- [Railway](https://railway.app)
- [PythonAnywhere](https://www.pythonanywhere.com)

## 📄 License

This project currently has no license specified.

## 🙋 Author

**unnatissrivastava**
