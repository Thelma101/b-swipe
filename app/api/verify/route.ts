import { NextResponse } from 'next/server';

// Simulated verification service
interface VerificationResult {
  passed: boolean;
  trustScore: number;
  checks: {
    documentFormat: boolean;
    ocrExtracted: boolean;
    amountConsistency: boolean;
    duplicateCheck: boolean;
    userVerified: boolean;
  };
  flags: string[];
  nextSteps: string[];
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { billId, documents, userInfo } = body;
    
    // In production, this would:
    // 1. Run OCR on uploaded documents
    // 2. Extract text and validate bill information
    // 3. Check for duplicates in database
    // 4. Verify user identity against ID
    // 5. Calculate trust score based on multiple factors
    // 6. Flag suspicious submissions
    
    // Simulated automated verification
    const verification: VerificationResult = {
      passed: true,
      trustScore: 85,
      checks: {
        documentFormat: true,
        ocrExtracted: true,
        amountConsistency: true,
        duplicateCheck: true,
        userVerified: true,
      },
      flags: [],
      nextSteps: ['ai_analysis', 'manual_review'],
    };
    
    // Simulate trust score calculation
    let score = 100;
    
    // Reduce score for risk factors
    if (!userInfo.phoneVerified) score -= 10;
    if (!userInfo.emailVerified) score -= 10;
    if (!userInfo.idVerified) score -= 20;
    if (userInfo.accountAge < 30) score -= 15; // New account
    
    verification.trustScore = Math.max(0, score);
    
    // Flag high-risk submissions
    if (verification.trustScore < 60) {
      verification.flags.push('low_trust_score');
      verification.nextSteps.push('additional_documentation_required');
    }
    
    if (body.amount > 10000) {
      verification.flags.push('high_amount');
      verification.nextSteps.push('third_party_verification');
    }
    
    return NextResponse.json({
      success: true,
      billId,
      verification: {
        status: verification.trustScore >= 70 ? 'approved' : 'pending_review',
        trustScore: verification.trustScore,
        automatedChecks: verification.checks,
        flags: verification.flags,
        estimatedApprovalTime: verification.flags.length > 0 ? '48 hours' : '2 hours',
        nextSteps: verification.nextSteps,
      },
      message: verification.trustScore >= 70 
        ? 'Bill passed automated verification. Proceeding to AI analysis.'
        : 'Bill requires additional review. You will be notified of next steps.',
    });
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Verification failed',
      message: 'Unable to verify bill at this time. Please try again.',
    }, { status: 400 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const billId = searchParams.get('billId');
  
  if (!billId) {
    return NextResponse.json({
      success: false,
      error: 'Bill ID required',
    }, { status: 400 });
  }
  
  // In production, fetch from database
  // For demo, return mock verification status
  return NextResponse.json({
    success: true,
    verification: {
      billId,
      status: 'approved',
      trustScore: 92,
      verifiedAt: new Date().toISOString(),
      checks: {
        automated: true,
        aiAnalysis: true,
        manualReview: true,
        providerConfirmed: true,
      },
      verificationBadges: [
        { type: 'identity_verified', label: 'Identity Verified', icon: '✓' },
        { type: 'document_verified', label: 'Document Verified', icon: '📄' },
        { type: 'provider_confirmed', label: 'Provider Confirmed', icon: '🏥' },
      ],
    },
  });
}
