### ⚙️ Installation

1. **Fork this repository:** Click the Fork button located in the top-right corner of this page.
2. **Clone the repository:**
   ```bash
   git clone https://github.com/<your-username>/Github-Activity.git
   ```
3. **Create .env.local file In src:**

   ```bash
   VITE_GITHUB_TOKEN=<your_github_token>
   ```
   ```
   Note: To generate your GitHub token, go to Settings → Developer settings → Personal access tokens → Fine-grained tokens, and then generate a new token.
   ```

4. **Install dependencies:**
   ```bash
   npm install    
   ```
5. **Start the servers:**
   ```bash
   npm run dev
   ```
6. **Access the application:**
   ```bash
   http://localhost:5173/
   ```

### 🌐 Deployment Instructions

### Deploying to Vercel:

1. Sign up or log in to [Vercel](https://vercel.com/).
2. Click on **"New Project"**.
3. Select your GitHub repo (the one that contains your forked project) and click **Import**.
4. Configure your environment variables in the Vercel dashboard by adding each key from your `.env` file (e.g., `VITE_GITHUB_TOKEN`).
5. Click on **Deploy**. Vercel will automatically detect your Vite+React app and build it.
6. Once deployment is complete, you can visit your live website!

**Updating After Deployment:**  
Whenever you push changes to your GitHub repo, Vercel will automatically redeploy the app, keeping your project up-to-date.

---

### Deploying to Netlify:

1. Sign up or log in to [Netlify](https://netlify.com/).
2. In the Netlify Dashboard, click **"Add new site"** → **"Import an existing project"**.
3. Select your GitHub repo (the one that contains your forked project) and click **Import**.
4. Configure your environment variables:
   - Go to **Site Settings** → **Build & Deploy** → **Environment**.
   - Add all keys from your `.env` file.
5. Click **Deploy Site**. Netlify will build and deploy your project.

**Updating After Deployment:**  
Whenever you push changes to your GitHub repo, Netlify will automatically redeploy the app, keeping your project up-to-date.


## 🚀 Live Preview

You can view the live preview of the project [here](https://commitpulse.netlify.app/).

## 📧 Contact Information

For questions or inquiries, please contact [Neeraj Gupta](mailto:guptaneeraj2811@gmail.com).
   