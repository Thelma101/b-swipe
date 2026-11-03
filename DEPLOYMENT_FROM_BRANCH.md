# Deploying BillSwipe from Branch

## ✅ Current Setup

- **Main Branch**: Your CV and original files (untouched)
- **BillSwipe Branch**: `tee101/billswipe-app-cb32` (isolated app)

The BillSwipe app lives ONLY on its own branch and will deploy separately.

---

## 🚀 Quick Deploy to Vercel

### Option 1: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Thelma101/CV/tree/tee101/billswipe-app-cb32&project-name=billswipe&root-directory=billswipe)

### Option 2: Manual Vercel Deploy

1. **Visit Vercel Dashboard**: https://vercel.com/dashboard
2. **Import Project** → Select your GitHub repo
3. **Configure:**
   - **Branch**: `tee101/billswipe-app-cb32`
   - **Root Directory**: `billswipe`
   - **Framework**: Next.js (auto-detected)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

4. **Environment Variables**: Add these in Vercel dashboard
   ```
   NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
   ```

5. **Deploy**: Click "Deploy"

**Result**: Your app will be live at `https://billswipe-[random].vercel.app`

---

## 🐳 Docker Deployment

### Build from Branch

```bash
# Clone the specific branch
git clone -b tee101/billswipe-app-cb32 https://github.com/Thelma101/CV.git billswipe-app
cd billswipe-app/billswipe

# Build Docker image
docker build -t billswipe:latest .

# Run container
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  -e NEXT_PUBLIC_APP_URL=http://localhost:3000 \
  billswipe:latest
```

### Docker Compose from Branch

```bash
# Clone branch
git clone -b tee101/billswipe-app-cb32 https://github.com/Thelma101/CV.git billswipe-app
cd billswipe-app/billswipe

# Start all services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f app
```

---

## 🌐 Deploy to Other Platforms

### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy from branch
netlify deploy --prod \
  --dir=billswipe/.next \
  --build-command="cd billswipe && npm run build"
```

### Railway

1. Visit https://railway.app
2. **New Project** → **Deploy from GitHub**
3. Select repository
4. **Configure:**
   - Branch: `tee101/billswipe-app-cb32`
   - Root: `billswipe`
   - Build: `npm install && npm run build`
   - Start: `npm start`

### DigitalOcean App Platform

1. Go to https://cloud.digitalocean.com/apps
2. **Create App** → GitHub
3. Select repo and branch `tee101/billswipe-app-cb32`
4. **Configure:**
   - Source Directory: `billswipe`
   - Build Command: `npm run build`
   - Run Command: `npm start`

---

## 📱 Custom Domain Setup

After deploying to Vercel (or any platform):

### Add Custom Domain

1. Buy domain (e.g., billswipe.com)
2. In Vercel: **Settings** → **Domains** → Add domain
3. Update DNS records:
   ```
   A     @       76.76.21.21
   CNAME www     cname.vercel-dns.com
   ```

### SSL Certificate
- Automatically provisioned by Vercel
- HTTPS enabled immediately
- Force HTTPS redirect configured

---

## 🔄 Continuous Deployment

### GitHub Actions (Vercel)

The workflow in `.github/workflows/ci.yml` automatically:
1. Runs tests on PR
2. Deploys preview on PR to `tee101/billswipe-app-cb32`
3. Deploys production when branch is updated

### Manual Trigger

To redeploy:
```bash
# Update branch
git checkout tee101/billswipe-app-cb32
git pull origin tee101/billswipe-app-cb32

# Trigger Vercel redeploy
vercel --prod
```

---

## 🎯 Branch Management

### Keep Main Clean ✅

```bash
# Work on BillSwipe
git checkout tee101/billswipe-app-cb32
git pull
# Make changes
git add .
git commit -m "feat: update"
git push origin tee101/billswipe-app-cb32

# Main branch stays untouched
git checkout main
# Still has your CV files only
```

### Never Merge to Main

The BillSwipe app lives permanently on its own branch:
- ✅ Deploy from `tee101/billswipe-app-cb32`
- ✅ Main stays clean with CV
- ✅ Both can coexist forever

---

## 🔐 Environment Variables

### Required for Production

```bash
# App Configuration
NEXT_PUBLIC_APP_URL=https://your-domain.com
NODE_ENV=production

# Database (when you add it)
DATABASE_URL=postgresql://user:pass@host:5432/billswipe

# Authentication (when you add it)
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=https://your-domain.com

# Stripe (for payments)
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...

# AWS S3 (for file uploads)
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_S3_BUCKET=billswipe-prod

# Email (SendGrid)
SENDGRID_API_KEY=your-key
EMAIL_FROM=noreply@your-domain.com
```

---

## 📊 Monitoring Deployment

### Check Build Status

**Vercel:**
```bash
vercel ls
```

**Check Live Site:**
```bash
curl -I https://your-app.vercel.app
```

### View Logs

**Vercel:**
- Dashboard → Project → Deployments → View logs

**Docker:**
```bash
docker logs billswipe
```

---

## 🆘 Troubleshooting

### Build Fails

```bash
# Test build locally first
cd billswipe
npm install
npm run build
npm start
```

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm start
```

### Out of Memory

```bash
# Increase Node memory
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

---

## ✨ Deployment Checklist

Before deploying to production:

- [ ] Environment variables set
- [ ] Domain configured (if using custom domain)
- [ ] SSL certificate active
- [ ] Database connected (when adding DB)
- [ ] Payment processor configured (when adding Stripe)
- [ ] Email service configured (when adding SendGrid)
- [ ] Analytics added (optional)
- [ ] Error tracking enabled (Sentry optional)
- [ ] Performance monitoring (optional)

---

## 🎉 You're All Set!

**Your Setup:**
- Main branch: CV (untouched) ✅
- App branch: `tee101/billswipe-app-cb32` (ready to deploy) ✅
- Isolated deployment: No conflicts ✅

**Deploy Now:**
1. Push to `tee101/billswipe-app-cb32`
2. Vercel auto-deploys (if connected)
3. Or use any deployment method above

**Live URL will be:**
- Vercel: `https://billswipe-xyz.vercel.app`
- Custom: `https://billswipe.com` (if you set up domain)

---

Need help with deployment? Check:
- Vercel Docs: https://vercel.com/docs
- Docker Docs: https://docs.docker.com
- Railway Docs: https://docs.railway.app
