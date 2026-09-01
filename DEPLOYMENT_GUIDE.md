# 🚀 100% Free (Zero-Cost) Deployment Guide

You can deploy this portfolio to showcase to global recruiters with **$0 cost** and get a live, custom HTTPS URL (e.g. `https://vetrivel-portfolio.onrender.com` or `https://vetrivel.vercel.app`).

---

## 🥇 Option 1: Render.com (Recommended for Full-Stack Node + React)
> **Cost:** $0.00 / month (Free Tier)  
> **Includes:** Full Node.js Express server + React 19 Frontend + Real-Time Gemini AI endpoints (`/api/generate-cv`, `/api/chat`).

### Steps (Takes 2 Minutes):
1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Deploy production ready portfolio"
   git push origin main
   ```
2. **Go to [Render.com](https://render.com/)** and sign in with GitHub (Free).
3. Click **New +** → **Web Service**.
4. Select your repository: `My-personal-portfolio` (or your repo name).
5. Fill in the basic settings:
   - **Name:** `vetrivel-portfolio` (or your choice)
   - **Environment:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Instance Type:** `Free`
6. Click **Advanced** → **Add Environment Variable**:
   - `NODE_ENV` = `production`
   - `GEMINI_API_KEY` = `your_gemini_api_key_here` (Optional for live Gemini AI)
7. Click **Create Web Service**.
8. Render will build and launch your live site with free SSL (e.g., `https://vetrivel-portfolio.onrender.com`).

---

## 🥈 Option 2: Vercel (Fastest Global CDN Deployment)
> **Cost:** $0.00 / month (Hobby Plan)  
> **Includes:** Global Edge CDN distribution, instant build, free custom domain.

### Steps (Takes 1 Minute):
1. **Go to [Vercel.com](https://vercel.com/)** and sign in with GitHub.
2. Click **Add New...** → **Project**.
3. Import your GitHub repository.
4. Framework Preset will auto-detect as **Vite**.
5. (Optional) Under **Environment Variables**, add `GEMINI_API_KEY`.
6. Click **Deploy**.
7. In ~30 seconds, your site is live at `https://vetrivel-portfolio.vercel.app`!

---

## 🥉 Option 3: Netlify
> **Cost:** $0.00 / month  
> **Includes:** 100GB monthly bandwidth, continuous git deployments.

### Steps:
1. Go to [Netlify.com](https://www.netlify.com/) and sign in with GitHub.
2. Click **Add new site** → **Import an existing project**.
3. Select your repository.
4. **Build command:** `npm run build`
5. **Publish directory:** `dist`
6. Click **Deploy Site**.

---

## 💡 How to Add a Custom Domain (e.g., `www.vetrivelmuthusamy.com`)
All options above allow you to attach your own custom domain (e.g. from GoDaddy/Namecheap) for **free**:
1. Go to your project settings in Render/Vercel/Netlify.
2. Click **Custom Domains** → Type your domain (e.g., `vetrivel.tech` or `vetrivel.dev`).
3. Add the 2 DNS records (CNAME/A) shown on the screen to your domain registrar.
4. SSL certificate (HTTPS) is generated automatically at zero cost!
