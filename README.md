# 🚀 INBOCART AI / AI Chatbot Backend

AI-powered multi-channel chatbot system for automating customer communication across:

- 📩 Facebook Messenger  
- 📸 Instagram DM  
- 💬 WhatsApp  
- 📧 Email  

Built with **NestJS + Prisma + PostgreSQL + OpenAI**

---

## ✨ Features

### 🤖 AI Automation
- Context-aware AI replies (Layer 2 logic)
- No generic replies (direct answer system)
- Business-aware responses using knowledge base
- Bangla + English auto-detection

### 💬 Multi-channel Messaging
- Facebook Messenger automation
- Instagram DM automation (via Meta)
- WhatsApp Cloud API integration
- Email auto-reply system

### 👤 Customer System
- Auto-create customer from messages
- Unified multi-channel identity
- Conversation history tracking

### 📚 Knowledge Base
- FAQ-based AI answers
- Priority-based matching
- Business rules integration

### 📊 Dashboard
- Total customers
- Conversations
- Open vs resolved chats
- Email threads

### ⚡ Real-time + Scalable
- Webhook-based system
- Queue-ready architecture (BullMQ)
- Async processing ready

---

## 🏗 Tech Stack

| Layer        | Technology                    |
|-------------|------------------------------|
| Backend     | NestJS (Node.js)             |
| Database    | PostgreSQL + Prisma ORM      |
| AI Engine   | OpenAI API                   |
| Queue       | BullMQ + Redis               |
| Email       | Resend API                   |
| Messaging   | Meta Graph API + WhatsApp    |
| Auth        | JWT + bcrypt                 |

---

## 📁 Project Structure
backend/ ├── prisma/ │   ├── schema.prisma │   └── seed.ts │ ├── src/ │   ├── main.ts │   ├── app.module.ts │ │   ├── config/ │   ├── common/ │   ├── database/ │   ├── integrations/ │   ├── queues/ │   ├── modules/ │   └── scripts/

---

## ⚙️ Installation Guide

### 1️⃣ Clone Repository

```bash
git clone https://github.com/mdforhadulislam/ai-chatboot.git
cd ai-chatboot
2️⃣ Install Dependencies
Bash
npm install
3️⃣ Setup Environment
Create .env file:
Environment
PORT=5000

DATABASE_URL=postgresql://postgres:password@localhost:5432/ai_chatbot

JWT_SECRET=supersecret
JWT_EXPIRES_IN=7d

OPENAI_API_KEY=your_openai_key
OPENAI_MODEL=gpt-4.1-mini

META_VERIFY_TOKEN=your_token
META_PAGE_ACCESS_TOKEN=your_page_token

WHATSAPP_VERIFY_TOKEN=your_token
WHATSAPP_ACCESS_TOKEN=your_token
WHATSAPP_PHONE_NUMBER_ID=your_id

RESEND_API_KEY=your_resend_key
EMAIL_FROM=support@yourdomain.com

REDIS_URL=redis://localhost:6379

FRONTEND_URL=http://localhost:3000
4️⃣ Setup Database
Bash
npx prisma generate
npx prisma migrate dev
5️⃣ Seed Database
Bash
npm run prisma:seed
6️⃣ Run Server
Bash
npm run start:dev
🌐 Server URL

http://localhost:5000/api/v1
🔑 Authentication APIs
Register

POST /auth/register
Login

POST /auth/login
📡 Webhook Endpoints
Meta (Messenger + Instagram)

GET  /webhooks/meta
POST /webhooks/meta
WhatsApp

GET  /webhooks/whatsapp
POST /webhooks/whatsapp
Email

POST /webhooks/email/inbound
🤖 AI Message Flow

User Message
   ↓
Webhook Receive
   ↓
Normalize Data
   ↓
Save to Database
   ↓
AI Generate Reply
   ↓
Send Reply to User
   ↓
Store AI Response
💬 Messaging Flow
Messenger / WhatsApp

Webhook → Normalize → Save → AI → Reply
Email

Inbound → Parse → Thread → AI → Reply
📧 Email System
Thread-based conversation
AI auto-reply
Supports subject + reply tracking
Ready for attachments (future)
📊 Dashboard API

GET /dashboard/overview
Returns:
total customers
conversations
open conversations
messages
email threads
🧠 AI Behavior
Detects intent automatically
Uses knowledge base
Avoids generic replies
Handles:
Pricing queries
Tracking queries
Support queries
Complaints
🔐 Security
JWT Authentication
Password hashing (bcrypt)
Environment-based secrets
API token protection
🧪 Development Tips
Use Postman / Thunder Client
Use ngrok for webhook testing
Enable logs for debugging
🚀 Deployment Guide
Recommended setup:
VPS (Ubuntu)
Node.js (v18+)
PM2 (process manager)
Nginx (reverse proxy)
SSL (Let's Encrypt)
🔮 Future Improvements
Queue-based async processing
Admin panel (Next.js)
Multi-tenant SaaS version
Telegram integration
Analytics dashboard
File uploads (Cloudinary)
👨‍💻 Author
Forhadul Islam
Founder – Faster International Express
