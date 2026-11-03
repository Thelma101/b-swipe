# BillSwipe API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication
For production, all endpoints (except public ones) should require authentication using JWT tokens.

```http
Authorization: Bearer <your-jwt-token>
```

---

## Endpoints

### Bills

#### Get Bills Feed
Get a paginated list of bills.

```http
GET /api/bills?limit=10&category=medical
```

**Query Parameters:**
- `limit` (optional): Number of bills to return (default: 10)
- `category` (optional): Filter by category (medical, education, housing, utilities, debt, emergency, other)
- `offset` (optional): Pagination offset
- `status` (optional): Filter by status (pending, approved, paid, rejected)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "userId": "user1",
      "userName": "Sarah Johnson",
      "userLocation": "Austin, TX",
      "title": "Emergency Medical Surgery",
      "description": "I need help with...",
      "amount": 15750.00,
      "category": "medical",
      "imageUrl": "https://...",
      "status": "approved",
      "verificationStatus": "verified",
      "urgency": "critical",
      "createdAt": "2024-11-01T00:00:00.000Z"
    }
  ],
  "count": 10
}
```

#### Submit New Bill
Submit a bill for verification.

```http
POST /api/bills
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Emergency Medical Surgery",
  "description": "I need help with...",
  "amount": 15750.00,
  "category": "medical",
  "location": "Austin, TX",
  "urgency": "critical",
  "documents": ["file-id-1", "file-id-2"]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Bill submitted successfully",
  "data": {
    "id": "bill_1234567890",
    "status": "pending",
    "submittedAt": "2024-11-03T12:00:00.000Z"
  }
}
```

---

### Swipes

#### Record Swipe Action
Record a user's swipe action on a bill.

```http
POST /api/swipes
Content-Type: application/json
```

**Request Body:**
```json
{
  "billId": "1",
  "action": "swipe_right"
}
```

**Actions:**
- `swipe_right`: User wants to help pay this bill
- `swipe_left`: User wants to skip this bill
- `super_like`: User wants to pay the full amount

**Response:**
```json
{
  "success": true,
  "message": "Swipe recorded successfully",
  "data": {
    "swipeId": "swipe_1234567890",
    "billId": "1",
    "action": "swipe_right",
    "timestamp": "2024-11-03T12:00:00.000Z"
  }
}
```

#### Get User Swipe History
Get a user's swipe statistics.

```http
GET /api/swipes?userId=user123
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalSwipes": 127,
    "swipedRight": 45,
    "swipedLeft": 82,
    "totalDonated": 15750.00
  }
}
```

---

### Stats

#### Get Platform Statistics
Get overall platform statistics.

```http
GET /api/stats
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalBills": 1247,
    "totalPaid": 892,
    "totalAmount": 8947250.00,
    "activeUsers": 15432,
    "verificationRate": 94.5
  },
  "timestamp": "2024-11-03T12:00:00.000Z"
}
```

---

### Payments (To Be Implemented)

#### Create Payment Intent
Initiate a payment for a bill.

```http
POST /api/payments/intent
Content-Type: application/json
```

**Request Body:**
```json
{
  "billId": "1",
  "amount": 15750.00,
  "paymentMethod": "card"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "paymentIntentId": "pi_1234567890",
    "clientSecret": "pi_1234567890_secret_xyz",
    "amount": 15750.00
  }
}
```

#### Confirm Payment
Confirm a payment after user completes payment flow.

```http
POST /api/payments/confirm
Content-Type: application/json
```

**Request Body:**
```json
{
  "paymentIntentId": "pi_1234567890",
  "billId": "1"
}
```

---

### Authentication (To Be Implemented)

#### Register User
Create a new user account.

```http
POST /api/auth/register
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "secure-password",
  "name": "John Doe",
  "type": "benefactor"
}
```

#### Login
Authenticate a user and receive JWT token.

```http
POST /api/auth/login
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "secure-password"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "user123",
      "email": "user@example.com",
      "name": "John Doe",
      "type": "benefactor"
    }
  }
}
```

---

### Users (To Be Implemented)

#### Get User Profile
Get the authenticated user's profile.

```http
GET /api/users/me
```

#### Update User Profile
Update the authenticated user's profile.

```http
PATCH /api/users/me
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Doe",
  "bio": "Passionate about helping others",
  "avatar": "avatar-url"
}
```

---

### Notifications (To Be Implemented)

#### Get User Notifications
Get notifications for the authenticated user.

```http
GET /api/notifications?limit=20&unreadOnly=true
```

#### Mark Notification as Read
Mark a notification as read.

```http
PATCH /api/notifications/:id/read
```

---

## Error Responses

All endpoints return errors in the following format:

```json
{
  "success": false,
  "error": "Error message description",
  "code": "ERROR_CODE"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Internal Server Error

---

## Webhooks (For Payment Processing)

### Stripe Webhook
Handle Stripe payment events.

```http
POST /api/webhooks/stripe
```

This endpoint receives webhooks from Stripe for payment events like:
- `payment_intent.succeeded`
- `payment_intent.failed`
- `charge.refunded`

---

## Rate Limiting

For production, implement rate limiting:
- Authentication endpoints: 5 requests per minute per IP
- Bill submission: 10 requests per hour per user
- Swipe actions: 100 requests per minute per user
- General API: 1000 requests per hour per user

---

## Best Practices

1. **Always validate input** on the server side
2. **Use HTTPS** in production
3. **Implement proper authentication** for all protected endpoints
4. **Log all payment transactions** for audit purposes
5. **Verify webhooks** from payment processors
6. **Rate limit** to prevent abuse
7. **Sanitize user data** before storing or displaying
8. **Use database transactions** for payment operations
9. **Send email confirmations** for important actions
10. **Monitor API performance** and errors

---

## Testing

Use the following test accounts in development:

**Benefactor Account:**
- Email: benefactor@test.com
- Password: test123

**Requester Account:**
- Email: requester@test.com
- Password: test123

**Test Credit Card (Stripe):**
- Card: 4242 4242 4242 4242
- Expiry: Any future date
- CVC: Any 3 digits
