# BiliDL

A simple Bilibili downloader web app with:

- GitHub Pages frontend
- Flask backend
- yt-dlp for video extraction
- Mobile-friendly interface

## Important

Use this project only for videos you own or have permission to download. Respect Bilibili's terms, copyright, and creator rights.

## Project structure

```text
bilibili-downloader/
├── index.html
├── style.css
├── script.js
├── .gitignore
├── README.md
└── backend/
    ├── app.py
    ├── requirements.txt
    └── render.yaml
```

## 1. Put the project on GitHub

Create a GitHub repository, then upload all files.

Enable:

Settings → Pages → Deploy from branch → main → / (root)

Your frontend will then be available at your GitHub Pages URL.

## 2. Deploy the backend

One easy option is Render.

Create a new Web Service from your GitHub repository.

Use:

- Root Directory: `backend`
- Build Command: `pip install -r requirements.txt`
- Start Command: `gunicorn app:app`

The included `render.yaml` can also be used with Render Blueprint deployment.

## 3. Connect the frontend

Open `script.js` and replace:

```js
const API_BASE = "https://YOUR-BACKEND-URL.onrender.com";
```

with your real backend URL, for example:

```js
const API_BASE = "https://bilidl-backend.onrender.com";
```

Commit the change.

## 4. Test

Open your GitHub Pages site, paste an allowed Bilibili URL, and press Get Video.

## Notes

The backend downloads the selected file to temporary server storage before returning it. Large videos can use significant server storage and bandwidth.

Some Bilibili videos may not be downloadable because they are private, unavailable, region-restricted, or unsupported by the current yt-dlp version.
