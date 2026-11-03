# Deployment Guide

This guide covers deploying BillSwipe to various platforms.

## Prerequisites

- Node.js 18+ installed
- Git repository set up
- Environment variables configured
- Domain name (optional but recommended)

---

## Option 1: Vercel (Recommended for Next.js)

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Manual Deployment

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
cd billswipe
vercel
```

4. Set environment variables in Vercel dashboard:
   - Go to Project Settings > Environment Variables
   - Add all variables from `.env.example`

5. Deploy to production:
```bash
vercel --prod
```

### Configuration

Create `vercel.json` if you need custom configuration:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/api/:path*"
    }
  ]
}
```

---

## Option 2: Netlify

1. Install Netlify CLI:
```bash
npm i -g netlify-cli
```

2. Login:
```bash
netlify login
```

3. Initialize:
```bash
netlify init
```

4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`

5. Set environment variables:
```bash
netlify env:set NEXT_PUBLIC_APP_URL "your-url"
```

6. Deploy:
```bash
netlify deploy --prod
```

---

## Option 3: Docker

### Dockerfile

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner

WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

### Build and Run

```bash
# Build image
docker build -t billswipe .

# Run container
docker run -p 3000:3000 \
  -e DATABASE_URL="your-db-url" \
  -e NEXTAUTH_SECRET="your-secret" \
  billswipe
```

### Docker Compose

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
    depends_on:
      - postgres

  postgres:
    image: postgres:15
    environment:
      - POSTGRES_DB=billswipe
      - POSTGRES_USER=billswipe
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

Run with:
```bash
docker-compose up -d
```

---

## Option 4: AWS (EC2 + RDS)

### Prerequisites
- AWS account
- AWS CLI configured
- EC2 instance (t3.medium or higher)
- RDS PostgreSQL database

### Steps

1. SSH into EC2 instance:
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

2. Install Node.js:
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. Clone repository:
```bash
git clone https://github.com/your-username/billswipe.git
cd billswipe
```

4. Install dependencies and build:
```bash
npm ci
npm run build
```

5. Set up PM2 for process management:
```bash
sudo npm install -g pm2
pm2 start npm --name "billswipe" -- start
pm2 save
pm2 startup
```

6. Set up Nginx as reverse proxy:
```bash
sudo apt install nginx

# Create nginx config
sudo nano /etc/nginx/sites-available/billswipe
```

Nginx configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

7. Enable site and restart Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/billswipe /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

8. Set up SSL with Let's Encrypt:
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## Option 5: Railway

1. Visit [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Connect your repository
5. Add environment variables
6. Deploy!

Railway will automatically detect Next.js and configure build settings.

---

## Option 6: DigitalOcean App Platform

1. Create account at [digitalocean.com](https://digitalocean.com)
2. Go to Apps section
3. Click "Create App"
4. Connect GitHub repository
5. Configure:
   - Build Command: `npm run build`
   - Run Command: `npm start`
   - Port: 3000
6. Add environment variables
7. Deploy

---

## Database Setup

### PostgreSQL (Recommended)

#### Local Development
```bash
# Install PostgreSQL
sudo apt install postgresql

# Create database
sudo -u postgres psql
CREATE DATABASE billswipe;
CREATE USER billswipe WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE billswipe TO billswipe;
```

#### Production (Railway/Heroku/AWS RDS)
1. Create PostgreSQL database instance
2. Get connection string
3. Add to environment variables:
```
DATABASE_URL=postgresql://user:pass@host:5432/dbname
```

#### Run Migrations
```bash
# After setting up Prisma or your ORM
npx prisma migrate deploy
```

---

## Environment Variables Setup

### Required Variables
```bash
# App
NEXT_PUBLIC_APP_URL=https://your-domain.com
DATABASE_URL=postgresql://...

# Auth
NEXTAUTH_SECRET=generate-random-string
NEXTAUTH_URL=https://your-domain.com

# Stripe
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...

# AWS S3
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_S3_BUCKET=billswipe-prod

# Email
SENDGRID_API_KEY=...
EMAIL_FROM=noreply@your-domain.com
```

### Generate Secrets
```bash
# Generate random secret
openssl rand -base64 32
```

---

## Performance Optimization

### 1. Enable Caching
```typescript
// next.config.js
module.exports = {
  headers: async () => [
    {
      source: '/static/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ],
}
```

### 2. Image Optimization
- Use Next.js Image component
- Store images in CDN (AWS S3 + CloudFront, Cloudinary, etc.)

### 3. Database Optimization
- Add indexes on frequently queried columns
- Use connection pooling (PgBouncer)
- Enable query caching

### 4. API Rate Limiting
```typescript
// middleware.ts
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})
```

---

## Monitoring & Logging

### Sentry (Error Tracking)
```bash
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
```

### Vercel Analytics
Built-in for Vercel deployments:
```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### LogRocket (Session Replay)
```bash
npm install logrocket
```

---

## Security Checklist

- [ ] HTTPS enabled (SSL certificate)
- [ ] Environment variables secured
- [ ] API rate limiting implemented
- [ ] CORS properly configured
- [ ] SQL injection prevention (use parameterized queries)
- [ ] XSS protection enabled
- [ ] CSRF protection enabled
- [ ] Content Security Policy configured
- [ ] Regular dependency updates
- [ ] Database backups enabled
- [ ] User authentication implemented
- [ ] Payment processing secured (PCI compliance)
- [ ] File upload validation
- [ ] Webhook signature verification
- [ ] Logging and monitoring active

---

## Backup Strategy

### Database Backups
```bash
# Automated daily backups
0 2 * * * pg_dump billswipe > /backups/billswipe-$(date +\%Y\%m\%d).sql
```

### File Storage Backups
- Enable versioning on S3 bucket
- Set up cross-region replication
- Regular backup testing

---

## Continuous Deployment

### GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm test
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID}}
          vercel-project-id: ${{ secrets.PROJECT_ID}}
          vercel-args: '--prod'
```

---

## Scaling Considerations

### Horizontal Scaling
- Use load balancer (AWS ELB, Nginx)
- Deploy multiple app instances
- Database read replicas
- Redis for session storage

### Vertical Scaling
- Upgrade server resources
- Optimize queries
- Enable caching layers

### CDN Setup
- CloudFront (AWS)
- Cloudflare
- Fastly

---

## Support & Maintenance

### Regular Tasks
- Monitor error logs daily
- Review performance metrics weekly
- Update dependencies monthly
- Security patches as needed
- Database optimization quarterly

### Emergency Procedures
1. Roll back to previous deployment
2. Check error tracking service
3. Review server logs
4. Contact support if needed

---

## Cost Estimation

### Vercel (Hobby)
- Free for personal projects
- $20/month for Pro

### AWS (Small Scale)
- EC2 t3.medium: $30/month
- RDS PostgreSQL: $25/month
- S3 Storage: $5/month
- **Total: ~$60/month**

### AWS (Medium Scale)
- EC2 t3.large (x2): $120/month
- RDS PostgreSQL (Multi-AZ): $100/month
- S3 + CloudFront: $50/month
- Load Balancer: $20/month
- **Total: ~$290/month**

---

For questions or issues, please refer to the main README or open an issue on GitHub.
