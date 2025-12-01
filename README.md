# Valentine Ask — Simple Page

This is a small, static page you can open in a browser to ask someone out on Valentine's Day.

## What it contains
- `index.html` — the page to open
- `styles.css` — styling and animations
- `script.js` — behavior: personalization, overlay, confetti

## How to use
1. Open the folder `valentine-ask` and enter your names in the inputs (or leave blank for defaults).
2. Click **Surprise her** to reveal the question.
3. On a **Yes**, a confetti animation plays; on a **No**, a gentle message is shown.

## Run locally
- Open `index.html` directly in your browser (double-click the file), or run a simple static server:

**PowerShell (recommended):**
```powershell
# from inside the valentine-ask folder
cd 'C:\Users\mackr\OneDrive\Desktop\Projects\valentine-ask'
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

## Customizations you might want
- Change the text to be more personal in `index.html`.
- Add a photo or background image (place it in the folder and update `styles.css`).
- Add a scheduled reveal (server-side) or send the link in a message on Feb 14th.

If you want, I can:
- Add a shareable link or printable card version.
- Add email scheduling or host the page for you.
