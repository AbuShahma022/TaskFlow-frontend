# TaskFlow Frontend 🚀

TaskFlow is a modern project management SaaS frontend built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui.

The application provides a complete interface for authentication, organizations, teams, projects, sprints, tasks, activity logs, subscriptions, profile management, and administrative user management.

## 🌐 Live Demo
https://task-flowmanage.vercel.app

## 🔗 Backend Repo
https://github.com/AbuShahma022/TaskFlow-Backend

TaskFlow uses a separate Node.js/Express backend API.

The backend repository contains the REST API, Prisma database layer, authentication, authorization, Stripe integration, Redis support, email services, and other server-side functionality.

---

# ✨ Features

## 🔐 Authentication

- Email/password registration
- Email/password login
- Google OAuth login
- Email verification with OTP
- Forgot password
- Password reset with OTP
- Change password
- JWT authentication
- Automatic access-token refresh
- HttpOnly cookie authentication
- Logout
- Protected routes

## 👤 User Profile

- View profile information
- Update profile
- Upload profile picture
- View platform role
- View account status
- Email verification status

## 🏢 Organizations

- Create organizations
- View organizations
- Switch between organizations
- Organization member management
- Manager and member roles
- Organization invitations
- Accept invitations
- Reject invitations
- Cancel pending invitations



## 📁 Project Management

Managers can:

- Create projects
- Update projects
- Archive projects
- Add project members
- Remove project members

Project members can access projects they belong to.

## 📝 Task Management

- Create tasks
- Update tasks
- Assign tasks
- Change task status
- Set task priority
- Set due dates
- Search tasks
- Filter tasks
- Pagination
- Sprint-based task management

Supported task statuses:

- TODO
- IN_PROGRESS
- IN_REVIEW
- DONE

Supported priorities:

- LOW
- MEDIUM
- HIGH
- URGENT

## 🏃 Sprint Management

- Create sprints
- Update sprints
- Start sprints
- Complete sprints
- Archive sprints
- View sprint tasks

## 📊 Activity Logs

Managers can view organization activity logs including important actions such as:

- Project creation
- Project updates
- Member invitations
- Member changes
- Team creation
- Task creation
- Task assignment
- Task status changes
- Sprint actions
- Subscription changes
- Payment events

## 💳 Subscription & Payments

TaskFlow supports:

- FREE subscription
- PRO subscription
- Stripe Checkout
- Payment verification
- Payment history
- Subscription status

The frontend provides the subscription and payment management interface while payment processing is handled by the backend.

## 🛡️ Admin Panel

Platform administrators have access to a separate admin area.

Admin features include:

- Admin dashboard
- User management
- View users
- View user status
- View platform roles
- View email verification status
- Block users
- Activate users
- User pagination

Platform roles:

- ADMIN
- USER

Organization roles:

- MANAGER
- MEMBER

---

# 🛠️ Tech Stack

## Frontend

| Technology | Purpose |
|---|---|
| Next.js | React framework |
| TypeScript | Type-safe development |
| React | UI development |
| Tailwind CSS | Styling |
| shadcn/ui | UI components |
| React Query | Server-state management |
| Axios | HTTP client |
| React Hook Form | Form management |
| Zod | Form validation |
| Sonner | Toast notifications |
| react-icons | Icons |
| @react-oauth/google | Google authentication |
| React Paginate | Pagination |

## Backend

TaskFlow uses a separate backend built with:

- Node.js
- TypeScript
- Express.js
- Prisma 7
- PostgreSQL
- Redis
- JWT
- bcrypt
- Zod
- Stripe
- Cloudinary
- Nodemailer
- Google OAuth

---

## Role System
```
//Platform level
ADMIN
USER

//Organization
MANAGER
MEMBER
```

## install
```
git clone https://github.com/AbuShahma022/TaskFlow-frontend.git

cd taskflow
npm install

//Configure environment variables
.env.local
NEXT_PUBLIC_API_URL=your_backend_api_url
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id

npm run dev

```

# 🏗️ Frontend Architecture

The frontend follows a modular Next.js App Router architecture.

```text
src/
│
├── app/
│   ├── (admin)/
│   │   └── admin/
│   │
│   ├── (dashboardGroup)/
│   │   ├── dashboard/
│   │   ├── organizations/
│   │   ├── projects/
│   │   ├── tasks/
│   │   ├── invitations/
│   │   ├── activity-logs/
│   │   ├── subscription/
│   │   ├── profile/
│   │   └── settings/
│   │
│   ├── (public)/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── (auth)/
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   │
│   ├── globals.css
│   ├── layout.tsx
│   └── providers.tsx
│
├── components/
│   ├── admin/
│   ├── auth/
│   ├── dashboard/
│   ├── home/
│   ├── layout/
│   ├── settings/
│   └── ui/
│
├── constants/
│   └── query-keys.ts
│
├── hooks/
│   ├── mutations/
│   └── queries/
│
├── lib/
│   ├── axios.ts
│   ├── query-client.ts
│   ├── utils.ts
│   └── validations/
│
├── providers/
│   ├── auth-provider.tsx
│   └── organization-provider.tsx
│
├── services/
│   ├── auth.service.ts
│   ├── organization.service.ts
│   ├── project.service.ts
│   ├── task.service.ts
│   ├── subscription.service.ts
│   └── ...
│
├── types/
│   ├── auth.ts
│   ├── organization.ts
│   ├── task.ts
│   └── ...
│
└── store/