# 🚀 Slooze Fullstack Challenge - Backend

## 📌 Project Overview
This project is a role-based food ordering system built as part of the Slooze take-home challenge.

It allows different users (Admin, Manager, Member) to perform actions based on their roles and country restrictions.

---

## 🛠 Tech Stack

- **Backend:** NestJS
- **API:** GraphQL (Apollo)
- **Database:** PostgreSQL (Local)
- **ORM:** Prisma
- **Language:** TypeScript

---

## 🎯 Features Implemented

- ✅ User creation with role and country
- ✅ Role-based data modeling (Admin, Manager, Member)
- ✅ Country-based access (India, America)
- ✅ GraphQL API setup
- ✅ Prisma ORM integration
- ✅ PostgreSQL local database setup

---

## 🔐 Roles & Permissions

| Feature | Admin | Manager | Member |
|--------|--------|----------|---------|
| View restaurants | ✅ | ✅ | ✅ |
| Create order | ✅ | ✅ | ✅ |
| Checkout & pay | ✅ | ✅ | ❌ |
| Cancel order | ✅ | ✅ | ❌ |
| Manage payment methods | ✅ | ❌ | ❌ |

---

## 🌍 Country Restriction

Users can only access data related to their assigned country:
- INDIA
- AMERICA

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone <your-repo-url>
cd slooze-food-app
cd backend
