# BillSwipe 💳

A modern philanthropic platform that gamifies charitable giving by connecting people in need with those who want to help - using a familiar swipe interface.

## 🌿 Branch Deployment

**This app lives on its own branch**: `tee101/billswipe-app-cb32`

- ✅ Main branch: Clean (CV files)
- ✅ App branch: BillSwipe (isolated)
- ✅ Deploy from: `tee101/billswipe-app-cb32` only

See **DEPLOYMENT_FROM_BRANCH.md** for complete deployment instructions.

## 🌟 Features

### For Benefactors (Donors)
- **Swipe Interface**: Intuitive Tinder-like card swiping to browse bills
- **Verified Bills**: All bills are thoroughly verified for authenticity
- **Direct Impact**: See exactly where your money goes
- **Track Contributions**: Monitor your total impact over time
- **Smart Matching**: AI-powered bill recommendations (coming soon)

### For Requesters (Those in Need)
- **Easy Submission**: Simple form to submit bills for review
- **Verification Process**: Secure document upload and verification
- **Privacy Protected**: Personal information kept confidential
- **Real-time Updates**: Get notified when someone helps
- **Multiple Categories**: Medical, Education, Housing, Utilities, Debt, Emergency

### Platform Features
- **Real-time Dashboard**: Live statistics and analytics
- **Category Breakdown**: Visualize bills by type
- **Leaderboard**: Top contributors recognition
- **Mobile Responsive**: Works perfectly on all devices
- **Beautiful UI**: Modern design with smooth animations

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Gestures**: React Swipeable

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project
cd billswipe

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🎯 Usage

1. **Start the dev server**: `npm run dev`
2. **Visit**: http://localhost:3000
3. **Explore**:
   - Home page with platform overview
   - `/swipe` - Swipe through bills to help
   - `/submit` - Submit a bill for review
   - `/dashboard` - View platform statistics

## 🏗️ Project Structure

```
billswipe/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home/landing page
│   ├── swipe/             # Swipe interface page
│   ├── submit/            # Bill submission page
│   ├── dashboard/         # Analytics dashboard
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── BillCard.tsx      # Swipeable bill card
│   ├── SwipeInterface.tsx # Swipe management
│   └── Navigation.tsx     # App navigation
├── lib/                   # Utilities and data
│   ├── mockData.ts       # Sample bills and stats
│   └── utils.ts          # Helper functions
└── types/                 # TypeScript definitions
    └── index.ts          # Type definitions
```

## 🎨 Design Philosophy

### User Experience
- **Familiar Interactions**: Leverages the swipe mechanic users already know
- **Instant Feedback**: Smooth animations and clear visual cues
- **Accessibility**: High contrast, readable fonts, semantic HTML
- **Mobile First**: Designed for mobile, enhanced for desktop

### Trust & Security
- **Verification Required**: All bills must be verified
- **Privacy First**: Personal information is protected
- **Transparency**: Clear communication about the process
- **Community Driven**: Built with user feedback

## 🔐 Security Considerations

This demo includes:
- ✅ Type-safe TypeScript throughout
- ✅ Input validation on forms
- ✅ Sanitized user data
- ✅ Secure file upload placeholders

For production, you would need:
- [ ] Backend API with authentication (JWT/OAuth)
- [ ] Database (PostgreSQL/MongoDB)
- [ ] Payment processing (Stripe/PayPal)
- [ ] Document verification service
- [ ] Email notifications
- [ ] Advanced fraud detection
- [ ] Rate limiting and DDoS protection
- [ ] GDPR/Privacy compliance
- [ ] Audit logging

## 🌐 API Routes (To Be Implemented)

```
POST   /api/bills           # Submit new bill
GET    /api/bills           # Get bills feed
GET    /api/bills/:id       # Get specific bill
POST   /api/swipes          # Record swipe action
POST   /api/payments        # Process payment
GET    /api/stats           # Get platform stats
POST   /api/auth/login      # User login
POST   /api/auth/register   # User registration
```

## 📊 Database Schema (Suggested)

```typescript
Users: id, email, name, type, verified, created_at
Bills: id, user_id, title, amount, category, status, verification_status
Swipes: id, bill_id, user_id, action, timestamp
Payments: id, bill_id, benefactor_id, amount, status
Documents: id, bill_id, file_url, verification_status
```

## 🚧 Roadmap

### Phase 1: MVP ✅
- [x] Landing page
- [x] Swipe interface
- [x] Bill submission form
- [x] Dashboard with statistics
- [x] Responsive design

### Phase 2: Backend Integration
- [ ] User authentication
- [ ] Database integration
- [ ] Payment processing
- [ ] Email notifications
- [ ] Admin panel

### Phase 3: Advanced Features
- [ ] AI-powered bill matching
- [ ] Social sharing
- [ ] Impact stories
- [ ] Recurring donations
- [ ] Team/corporate accounts

### Phase 4: Scale & Optimize
- [ ] Performance optimization
- [ ] Advanced analytics
- [ ] Mobile apps (iOS/Android)
- [ ] API for third-party integrations

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 💡 Inspiration

Inspired by the concept of making charitable giving as easy and engaging as modern dating apps, while maintaining the serious responsibility of helping people in genuine need.

## 🙏 Acknowledgments

- Design inspired by modern fintech and social apps
- Built with modern web technologies
- Created to demonstrate the power of gamification in philanthropy

---

**Note**: This is a demonstration/prototype. For production use, implement proper security, payment processing, and verification systems.
