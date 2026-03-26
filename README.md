# 🚀 INBOCART AI – Multi-Channel AI Chatbot Backend

> Build once → automate all customer communication

INBOCART AI is a powerful backend system designed to automate business communication across multiple platforms using AI.

Supports:
- 📩 Facebook Messenger  
- 📸 Instagram DM  
- 💬 WhatsApp  
- 📧 Email  

---

## 🎯 Purpose

This system is designed for:

✔ Courier / Logistics Business  
✔ E-commerce Customer Support  
✔ Service-based businesses  
✔ Automated lead handling  
✔ AI-powered support system  

---

## ✨ Features

### 🤖 AI Automation
- Context-aware AI replies  
- Layer 2 smart reply system  
- No generic replies  
- Knowledge-base driven answers  
- Bangla + English support  
- Intent detection  

---

### 💬 Multi-Channel Messaging
- Facebook Messenger automation  
- Instagram DM automation  
- WhatsApp Cloud API integration  
- Email auto-reply system  

---

### 👤 Customer System
- Auto-create customer  
- Multi-channel identity  
- Conversation history tracking  
- Last activity tracking  

---

### 📚 Knowledge Base
- FAQ-based answers  
- Business rules integration  
- Priority-based matching  

---

### 📊 Dashboard
- Total customers  
- Conversations  
- Open / Closed chats  
- Email threads  

---

## 🧠 AI Flow

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
Send Response  
↓  
Store Reply  

---

## 💬 Messaging Flow

Messenger / WhatsApp  
Webhook → Normalize → Save → AI → Reply  

Email  
Inbound → Parse → Thread → AI → Reply  

---

## 🏗 Tech Stack

| Layer        | Technology                    |
|-------------|------------------------------|
| Backend     | NestJS (Node.js)             |
| Database    | PostgreSQL + Prisma ORM      |
| AI          | OpenAI API                   |
| Queue       | BullMQ + Redis               |
| Email       | Resend API                   |
| Messaging   | Meta API + WhatsApp          |
| Auth        | JWT + bcrypt                 |

---

## 📁 Project Structure

backend/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── config/
│   ├── common/
│   ├── database/
│   ├── integrations/
│   ├── queues/
│   ├── modules/
│   └── scripts/

---

## ⚙️ Installation

### 1. Clone
```
git clone https://github.com/mdforhadulislam/ai-chatboot.git  
cd ai-chatboot  ```

### 2. Install
npm install  

### 3. Setup .env

PORT=5000  
DATABASE_URL=postgresql://postgres:password@localhost:5432/ai_chatbot  
JWT_SECRET=supersecret  
OPENAI_API_KEY=your_key  

META_VERIFY_TOKEN=token  
META_PAGE_ACCESS_TOKEN=token  

WHATSAPP_ACCESS_TOKEN=token  
WHATSAPP_PHONE_NUMBER_ID=id  

RESEND_API_KEY=key  
EMAIL_FROM=support@yourdomain.com  

REDIS_URL=redis://localhost:6379  

---

### 4. Database
npx prisma generate  
npx prisma migrate dev  

### 5. Seed
npm run prisma:seed  

### 6. Run
npm run start:dev  

---

## 🌐 API URL

http://localhost:5000/api/v1  

---

## 🔑 Auth APIs

POST /auth/register  
POST /auth/login  

---

## 📡 Webhooks

Meta  
GET /webhooks/meta  
POST /webhooks/meta  

WhatsApp  
GET /webhooks/whatsapp  
POST /webhooks/whatsapp  

Email  
POST /webhooks/email/inbound  

---

## 📊 Dashboard

GET /dashboard/overview  

---

## 🔐 Security

- JWT Authentication  
- bcrypt password hashing  
- Environment config  

---

## 🚀 Deployment

- VPS (Ubuntu)  
- Node.js  
- PM2  
- Nginx  
- SSL  

---

## 👨‍💻 Author

Forhadul Islam  
Founder – InboCart.Ai

---

## 📄 License

MIT License  

---

## ⭐ Final Note

✔ Automate business communication  
✔ Handle all channels in one system  
✔ AI-powered smart replies  

🔥 Build once → automate everything