# Branch Structure & Deployment

## 📂 Repository Structure

```
Thelma101/CV (Repository)
│
├── main (branch) ← YOUR CV & ORIGINAL FILES
│   ├── CV files
│   ├── Job application bot
│   ├── Scholarships tracker
│   └── (No BillSwipe code)
│
└── tee101/billswipe-app-cb32 (branch) ← BILLSWIPE APP
    └── billswipe/
        ├── app/
        ├── components/
        ├── lib/
        ├── types/
        ├── Documentation
        └── All app code
```

## ✅ What's Set Up

### Main Branch (CLEAN)
```bash
git checkout main
# Contains:
✓ Thelma_Akpata_CV_2026.pdf
✓ apply-for-jobs/
✓ scholarships/
✓ (Original content preserved)
✗ No BillSwipe code
```

### BillSwipe Branch (ISOLATED)
```bash
git checkout tee101/billswipe-app-cb32
# Contains:
✓ Everything from main
✓ billswipe/ (complete app)
✓ Ready to deploy
```

## 🚀 Deployment Options

### Option 1: Vercel (Recommended - FREE)

**One-Click Deploy:**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Thelma101/CV/tree/tee101/billswipe-app-cb32&project-name=billswipe&root-directory=billswipe)

**Manual Setup:**
1. Go to https://vercel.com/new
2. Import `Thelma101/CV`
3. Select branch: `tee101/billswipe-app-cb32`
4. Root directory: `billswipe`
5. Deploy!

**Auto-deploys on push** ✨

---

### Option 2: Netlify

```bash
# Install CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy from branch
git checkout tee101/billswipe-app-cb32
cd billswipe
netlify deploy --prod
```

---

### Option 3: Railway (FREE Tier)

1. Visit https://railway.app
2. New Project → Deploy from GitHub
3. Select: `Thelma101/CV`
4. Branch: `tee101/billswipe-app-cb32`
5. Root: `billswipe`
6. Deploy!

---

### Option 4: Docker (Self-Host)

```bash
# Clone branch
git clone -b tee101/billswipe-app-cb32 \
  https://github.com/Thelma101/CV.git billswipe-app

cd billswipe-app/billswipe

# Run with Docker Compose
docker-compose up -d

# Access at http://localhost:3000
```

---

### Option 5: DigitalOcean App Platform

1. https://cloud.digitalocean.com/apps
2. Create App → GitHub
3. Repository: `Thelma101/CV`
4. Branch: `tee101/billswipe-app-cb32`
5. Source Directory: `billswipe`
6. Deploy!

---

## 🔄 Development Workflow

### Working on BillSwipe

```bash
# Switch to BillSwipe branch
git checkout tee101/billswipe-app-cb32

# Make changes
cd billswipe
# ... edit files ...

# Commit and push
git add .
git commit -m "feat: your changes"
git push origin tee101/billswipe-app-cb32

# Auto-deploys if connected to Vercel/Netlify
```

### Working on CV (Main Branch)

```bash
# Switch to main
git checkout main

# Make changes
# ... edit CV files ...

# Commit and push
git add .
git commit -m "update: CV changes"
git push origin main

# BillSwipe is unaffected
```

## 🎯 Branch Rules

### ✅ DO:
- Deploy from `tee101/billswipe-app-cb32`
- Keep both branches separate
- Work on BillSwipe in its branch
- Keep main clean with CV

### ❌ DON'T:
- Merge BillSwipe to main (unless you want to)
- Deploy main branch (has no app)
- Mix CV and app code

## 📊 Current Status

```
Repository: Thelma101/CV
├─ Main Branch:      Clean ✅
├─ BillSwipe Branch: Ready ✅
├─ PR #1:            Open (not merged) ✅
└─ Deployment:       Configured ✅
```

## 🌐 After Deployment

Once deployed, you'll get a URL like:

**Vercel:**
- Preview: `https://billswipe-git-tee101-billswipe-app-cb32.vercel.app`
- Production: `https://billswipe.vercel.app`
- Custom: `https://yourdomain.com` (if you add domain)

**Railway:**
- `https://billswipe-production.up.railway.app`

**Netlify:**
- `https://billswipe.netlify.app`

## 🔗 Links

- **Repository**: https://github.com/Thelma101/CV
- **Main Branch**: https://github.com/Thelma101/CV/tree/main
- **App Branch**: https://github.com/Thelma101/CV/tree/tee101/billswipe-app-cb32
- **Pull Request**: https://github.com/Thelma101/CV/pull/1

## 📝 Summary

✅ **Main branch is completely untouched** - Your CV files are safe
✅ **BillSwipe lives on its own branch** - Isolated and deployable
✅ **Deploy from branch** - No need to merge to main
✅ **Both can coexist forever** - Work on either independently

**Ready to deploy!** Choose any option above and you're live in minutes. 🚀
