🚀 INBOCART AI / AI Chatbot Backend

AI-powered multi-channel chatbot system for automating customer communication across:

- 📩 Facebook Messenger
- 📸 Instagram DM
- 💬 WhatsApp
- 📧 Email

Built with NestJS + Prisma + PostgreSQL + OpenAI

---

📌 Features

🤖 AI Automation

- Context-aware AI replies
- No generic responses (Layer 2 logic)
- Business-aware replies using knowledge base
- Multi-language support (Bangla + English)

💬 Multi-channel Messaging

- Messenger automation
- Instagram DM automation
- WhatsApp Cloud API integration
- Email auto-reply system

📊 Dashboard

- Total customers
- Conversations
- Open vs resolved chats
- Email threads

👤 Customer Management

- Auto create customer from messages
- Track history
- Multi-channel identity support

📚 Knowledge Base

- FAQ-based AI responses
- Custom business rules
- Priority-based answers

⚡ Real-time Processing

- Webhook-based message handling
- Queue-ready architecture (BullMQ)

---

🏗 Tech Stack

Layer| Tech
Backend| NestJS (Node.js)
Database| PostgreSQL + Prisma
AI| OpenAI API
Queue| BullMQ + Redis
Email| Resend API
Messaging| Meta Graph API + WhatsApp
Auth| JWT + bcrypt

---

📁 Project Structure

backend/
├── prisma/
├── src/
│   ├── config/
│   ├── common/
│   ├── database/
│   ├── integrations/
│   ├── queues/
│   ├── modules/
│   └── scripts/

---

⚙️ Installation

1️⃣ Clone Repository

git clone https://github.com/mdforhadulislam/ai-chatboot.git
cd ai-chatboot

---

2️⃣ Install Dependencies

npm install

---

3️⃣ Setup Environment

Create ".env" file:

PORT=5000

DATABASE_URL=postgresql://postgres:password@localhost:5432/ai_chatbot

JWT_SECRET=supersecret
OPENAI_API_KEY=your_openai_key

META_VERIFY_TOKEN=your_token
META_PAGE_ACCESS_TOKEN=your_page_token

WHATSAPP_ACCESS_TOKEN=your_token
WHATSAPP_PHONE_NUMBER_ID=your_id

RESEND_API_KEY=your_resend_key
EMAIL_FROM=support@yourdomain.com

REDIS_URL=redis://localhost:6379

---

4️⃣ Setup Database

npx prisma generate
npx prisma migrate dev

---

5️⃣ Seed Database

npm run prisma:seed

---

6️⃣ Run Server

npm run start:dev

Server will run on:

http://localhost:5000/api/v1

---

🔑 Authentication

Register

POST /auth/register

Login

POST /auth/login

---

📡 Webhook Endpoints

Messenger / Instagram

GET /webhooks/meta
POST /webhooks/meta

WhatsApp

GET /webhooks/whatsapp
POST /webhooks/whatsapp

Email

POST /webhooks/email/inbound

---

🤖 AI Flow

User Message
   ↓
Webhook Receive
   ↓
Save to DB
   ↓
AI Generate Reply
   ↓
Send Response
   ↓
Save Reply

---

📧 Email System

- Thread-based email handling
- AI auto-reply
- Supports:
  - subject
  - reply-to
  - attachments (future)

---

🧠 AI Behavior

- Understands customer intent
- Uses knowledge base
- Avoids generic replies
- Handles:
  - pricing queries
  - tracking queries
  - support queries

---

🔄 Message Flow

Messenger / WhatsApp

Webhook → Normalize → Save → AI → Send Reply

Email

Inbound → Parse → Thread → AI → Reply

---

📊 Dashboard API

GET /dashboard/overview

Returns:

- total customers
- conversations
- messages
- email threads

---

🧩 Future Improvements

- Queue-based async processing
- File uploads (Cloudinary)
- Admin panel (Next.js)
- Multi-tenant SaaS version
- Telegram integration
- Analytics dashboard

---

🔐 Security

- JWT Authentication
- Password hashing (bcrypt)
- Environment-based config
- API token protection

---

🧪 Development Tips

- Use Postman for API testing
- Use ngrok for webhook testing
- Enable logs for debugging

---

🌍 Deployment

Recommended:

- VPS (Ubuntu)
- PM2 for process management
- Nginx reverse proxy
- SSL (Let's Encrypt)

---

👨‍💻 Author

Forhadul Islam
Founder - Faster International Express

---

📄 License

MIT License

---

⭐ Final Note

This system is designed for:

✔ Business automation
✔ Customer support AI
✔ Courier/logistics communication
✔ E-commerce support systems

---

🔥 Build once → automate everything
