# BillSwipe Payment System

## Overview
A secure, transparent payment system that ensures funds go directly to paying bills, not to users' personal accounts (reducing fraud).

## Payment Flow Architecture

### The Escrow Model (Recommended)

```
┌─────────────┐      ┌──────────────┐      ┌──────────────┐      ┌─────────────┐
│ Benefactor  │─────>│  BillSwipe   │─────>│   Service    │─────>│ Beneficiary │
│  (Donor)    │      │   Platform   │      │   Provider   │      │   Helped    │
└─────────────┘      └──────────────┘      └──────────────┘      └─────────────┘
                            │
                            ↓
                     ┌──────────────┐
                     │   Escrow     │
                     │   Account    │
                     └──────────────┘
```

## Payment Methods

### Method 1: Direct Platform Payment (Best)

**How It Works:**
1. Benefactor sees verified bill on platform
2. Clicks "Pay This Bill" button
3. Payment held in escrow
4. Platform verifies one final time
5. Platform pays service provider directly
6. Provider confirms receipt
7. Both parties get receipt

**Benefits:**
- ✅ Most secure
- ✅ Guaranteed bill payment
- ✅ Tax receipt automatic
- ✅ No cash to user
- ✅ Provider confirmation

**Implementation:**
```typescript
// Payment intent creation
POST /api/payments/create-intent
{
  billId: string,
  benefactorId: string,
  amount: number,
  paymentMethod: 'card' | 'bank_transfer' | 'crypto'
}

// Direct payment to provider
POST /api/payments/pay-provider
{
  paymentIntentId: string,
  providerDetails: {
    type: 'hospital' | 'university' | 'utility' | 'landlord',
    accountNumber: string,
    routingNumber?: string,
    reference: string
  }
}
```

### Method 2: Guided Direct Payment

**How It Works:**
1. Benefactor commits to pay
2. Platform provides secure payment portal
3. Benefactor logs into provider's website via our iframe/redirect
4. Pays directly on provider's secure site
5. Provider confirms to platform via API
6. Receipt shared with all parties

**Benefits:**
- ✅ Benefactor controls payment
- ✅ Provider's own security
- ✅ No platform liability for funds
- ✅ Direct confirmation

### Method 3: Charitable Tax-Deductible Payment

**How It Works:**
1. BillSwipe operates as 501(c)(3) non-profit
2. Benefactor donates to BillSwipe
3. Gets tax deduction receipt
4. BillSwipe pays bills as charitable aid
5. Annual tax form provided

**Benefits:**
- ✅ Tax deductible for donor
- ✅ Non-profit oversight
- ✅ Grant eligibility
- ✅ Corporate matching programs

## Service Provider Integration

### Supported Provider Types

#### Medical Providers
```typescript
interface MedicalPayment {
  provider: {
    name: string;
    npi: string; // National Provider Identifier
    taxId: string;
    address: Address;
  };
  patient: {
    accountNumber: string;
    dateOfBirth: string; // for verification
  };
  bill: {
    invoiceNumber: string;
    amount: number;
    serviceDate: string;
  };
}
```

**Integration Partners:**
- Epic Systems
- Cerner
- Allscripts
- Direct hospital billing departments

#### Education Providers
```typescript
interface EducationPayment {
  institution: {
    name: string;
    id: string; // IPEDS or similar
    financialAidOffice: ContactInfo;
  };
  student: {
    studentId: string;
    name: string;
  };
  payment: {
    type: 'tuition' | 'fees' | 'books';
    semester: string;
    amount: number;
  };
}
```

**Integration Partners:**
- National Student Clearinghouse
- University bursar offices
- Nelnet Campus Commerce

#### Utility Companies
```typescript
interface UtilityPayment {
  utility: {
    company: string;
    accountNumber: string;
    serviceAddress: string;
  };
  payment: {
    amount: number;
    billDate: string;
    dueDate: string;
  };
}
```

**Integration Partners:**
- Local utility companies
- Utility bill payment aggregators
- Check by mail services

#### Landlords/Property Management
```typescript
interface HousingPayment {
  landlord: {
    name: string;
    taxId?: string;
    address: Address;
  };
  tenant: {
    name: string;
    unit: string;
    leaseVerification: string;
  };
  rent: {
    amount: number;
    month: string;
    propertyAddress: string;
  };
}
```

## Payment Processing Services

### Primary: Stripe Connect

**Why Stripe:**
- Escrow account management
- Direct bank transfers
- International support
- Robust API
- Compliance built-in

**Setup:**
```javascript
// Create connected account for each provider
const account = await stripe.accounts.create({
  type: 'express',
  country: 'US',
  email: provider.email,
  business_type: 'company',
  company: {
    name: provider.name,
    tax_id: provider.taxId
  }
});

// Transfer funds to provider
const transfer = await stripe.transfers.create({
  amount: billAmount,
  currency: 'usd',
  destination: providerAccountId,
  metadata: {
    billId: bill.id,
    benefactorId: benefactor.id,
    type: 'bill_payment'
  }
});
```

### Alternative: Bank Transfers (ACH)

**For Large Amounts:**
- Lower fees (vs credit cards)
- Direct bank-to-bank
- 2-3 day processing
- Higher limits

**Integration:**
```javascript
// Using Plaid + Dwolla
const achTransfer = await dwolla.transfers.create({
  _links: {
    source: { href: escrowAccountUrl },
    destination: { href: providerBankAccountUrl }
  },
  amount: {
    value: billAmount.toString(),
    currency: 'USD'
  },
  metadata: {
    billId: bill.id,
    billType: 'medical'
  }
});
```

### For International: Wire Transfers

**SWIFT/IBAN:**
- International providers
- 24-48 hour settlement
- Currency conversion
- Higher fees ($15-50)

## Security & Fraud Prevention

### Multi-Layer Security

1. **Before Payment**
   - Re-verify bill status
   - Confirm provider details
   - Check for duplicates
   - Validate benefactor funds

2. **During Payment**
   - 3D Secure for cards
   - 2FA for large amounts
   - Real-time fraud detection
   - Velocity checks

3. **After Payment**
   - Provider confirmation required
   - Receipt generation
   - Reconciliation
   - Dispute monitoring

### Escrow Protection

```typescript
interface EscrowAccount {
  id: string;
  benefactorId: string;
  billId: string;
  amount: number;
  status: 'pending' | 'held' | 'released' | 'refunded';
  holdUntil: Date;
  releaseConditions: {
    providerConfirmation: boolean;
    verificationComplete: boolean;
    noDisputes: boolean;
  };
}

// Hold funds for 3-7 days
const holdPeriod = 7 * 24 * 60 * 60 * 1000; // 7 days

// Release only when all conditions met
async function releaseEscrow(escrowId: string) {
  const escrow = await getEscrow(escrowId);
  
  if (
    escrow.releaseConditions.providerConfirmation &&
    escrow.releaseConditions.verificationComplete &&
    escrow.releaseConditions.noDisputes &&
    Date.now() >= escrow.holdUntil.getTime()
  ) {
    await transferToProvider(escrow);
    await sendReceipts(escrow);
  }
}
```

## Large Donations (for "Billionaires")

### Bulk Payment Options

#### Option A: Monthly Commitment
```typescript
interface MonthlyCommitment {
  benefactorId: string;
  monthlyAmount: number; // e.g., $100,000/month
  allocation: {
    medical: 40%,     // $40k
    education: 30%,   // $30k
    housing: 20%,     // $20k
    emergency: 10%    // $10k
  };
  autoApprove: {
    enabled: boolean;
    maxPerBill: number; // e.g., $5,000
    criteria: VerificationCriteria;
  };
}
```

#### Option B: Impact Fund
```typescript
interface ImpactFund {
  benefactorId: string;
  initialDeposit: number; // e.g., $1,000,000
  disbursementRules: {
    dailyLimit: number;
    perBillMax: number;
    priorityCategories: string[];
    requireManualApproval: boolean;
  };
  balance: number;
  deployed: number;
  impact: {
    billsPaid: number;
    livesSaved: number;
    averageAmount: number;
  };
}
```

#### Option C: Matching Program
```typescript
interface MatchingProgram {
  benefactorId: string;
  matchRatio: number; // e.g., 2:1 (donor pays 2x what others contribute)
  totalMatchPool: number; // e.g., $10,000,000
  conditions: {
    minDonors: number; // e.g., match only if 5+ people contribute
    maxMatchPerBill: number; // e.g., match up to $10k per bill
    categories: string[];
  };
}
```

### VIP Benefactor Features

1. **Dedicated Dashboard**
   - Real-time impact metrics
   - Bills paid visualization
   - Community testimonials
   - Tax documentation

2. **Concierge Service**
   - Dedicated account manager
   - Custom allocation strategies
   - Impact reports
   - Meet beneficiaries (if agreed)

3. **Corporate Programs**
   - Employee matching
   - Team building (employees vote)
   - CSR reporting
   - Press releases/PR support

## Tax Documentation

### For Benefactors

**Receipt Example:**
```
BillSwipe, Inc. (501c3 Tax ID: XX-XXXXXXX)
Tax-Deductible Donation Receipt

Donor: John Smith
Date: November 3, 2026
Amount: $5,000.00

Description: Charitable contribution to medical bill assistance
Patient: Anonymous (Beneficiary ID: xxxxxx)
Provider: City Hospital

This donation is tax-deductible to the full extent of the law.
No goods or services were provided in exchange for this donation.

Thank you for your generosity!
```

### For Beneficiaries

**Not Taxable Income:**
- Payments made directly to service providers
- Considered charitable gifts
- No 1099 issued
- Must be documented properly

## API Implementation

### Create Payment Flow

```typescript
// Step 1: Create payment intent
app.post('/api/payments/intent', async (req, res) => {
  const { billId, benefactorId, amount } = req.body;
  
  // Verify bill
  const bill = await getBill(billId);
  if (bill.status !== 'approved') {
    return res.status(400).json({ error: 'Bill not approved' });
  }
  
  // Create Stripe payment intent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100, // cents
    currency: 'usd',
    metadata: { billId, benefactorId },
    payment_method_types: ['card', 'us_bank_account'],
  });
  
  // Create escrow record
  await createEscrow({
    paymentIntentId: paymentIntent.id,
    billId,
    benefactorId,
    amount,
    status: 'pending'
  });
  
  res.json({
    clientSecret: paymentIntent.client_secret,
    escrowId: escrow.id
  });
});

// Step 2: Confirm payment
app.post('/api/payments/confirm', async (req, res) => {
  const { paymentIntentId } = req.body;
  
  // Verify payment with Stripe
  const payment = await stripe.paymentIntents.retrieve(paymentIntentId);
  
  if (payment.status === 'succeeded') {
    // Update escrow to 'held'
    await updateEscrow(payment.metadata.escrowId, { status: 'held' });
    
    // Notify all parties
    await sendNotifications({
      benefactor: 'Payment received and held in escrow',
      beneficiary: 'Good news! Someone is helping with your bill',
      admin: 'New payment to process'
    });
    
    // Schedule provider payment (after hold period)
    await scheduleProviderPayment(payment.metadata.billId);
  }
  
  res.json({ success: true });
});

// Step 3: Pay provider
app.post('/api/payments/pay-provider', async (req, res) => {
  const { escrowId } = req.body;
  const escrow = await getEscrow(escrowId);
  const bill = await getBill(escrow.billId);
  
  // Get provider payment details
  const provider = bill.providerDetails;
  
  // Execute transfer
  const transfer = await stripe.transfers.create({
    amount: escrow.amount * 100,
    currency: 'usd',
    destination: provider.stripeAccountId,
    metadata: {
      billId: bill.id,
      reference: bill.invoiceNumber
    }
  });
  
  // Update records
  await updateBill(bill.id, { 
    status: 'paid',
    paidAt: new Date(),
    paidBy: escrow.benefactorId 
  });
  
  await updateEscrow(escrowId, { status: 'released' });
  
  // Generate receipts
  await generateReceipts(escrow);
  
  res.json({ success: true, transferId: transfer.id });
});
```

## Transparency & Reporting

### Public Impact Dashboard
- Total amount paid
- Bills helped
- Average time to help
- Success stories (anonymized)
- Top categories helped

### Individual Tracking
- Benefactor sees all their contributions
- Recipients see who helped (if donor allows)
- Platform shows fund flow
- Independent audits

## Dispute Resolution

### If Payment Issues Occur

1. **Escrow Hold Period** (7 days)
   - Time to catch problems
   - Provider verification
   - User confirmation

2. **Dispute Process**
   - Either party can file
   - Evidence reviewed
   - Mediation available
   - Refund if fraud proven

3. **Insurance Coverage**
   - Platform insured for fraud
   - Benefactors protected
   - Provider payment guaranteed

---

## Summary

**Best Practice:** Direct platform-to-provider payment via escrow ensures:
- ✅ Bill actually gets paid
- ✅ Benefactor gets tax receipt
- ✅ Beneficiary gets help
- ✅ Fraud is minimized
- ✅ Everyone has proof

This system works whether someone donates $10 or $10 million.
