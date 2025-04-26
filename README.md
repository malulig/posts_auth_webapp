
# Backend - Authenticated User and simple posts

This project is the backend part of a simple forum application developed using **NestJS** and **MySQL**. It supports user authentication, post creation, commenting, and basic CRUD operations with role-based permissions.

## Features

- User registration and login
- JWT authentication
- Create, view, and delete posts
- Commenting on posts
- Only the post or comment owner can delete their content
- Seeding the database with demo posts
- TypeORM integration with MySQL
- Environment variables for configuration
- API ready for connecting to a React frontend

## Technologies Used

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [MySQL](https://www.mysql.com/)
- [JWT](https://jwt.io/)
- [TypeScript](https://www.typescriptlang.org/)

## Project Structure

```
back/
├── src/
│   ├── auth/         # Authentication and authorization (JWT)
│   ├── posts/        # Post management (CRUD)
│   ├── seed/         # Seeding demo data
│   ├── user/         # User entity and service
│   ├── common/       # Common utilities and strategies
│   ├── app.module.ts # Main application module
│   └── main.ts       # Application entry point
├── .env              # Environment configuration
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MySQL database
- pnpm or npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/your-repository.git
cd ajs-21-homework-92-task-2-auth-user/back
```

2. Install dependencies:

```bash
pnpm install
# or
npm install
```

3. Create a `.env` file in the `back/` directory and configure:

```
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name
JWT_SECRET=your_jwt_secret
```

4. Run the application in development mode:

```bash
pnpm run start:dev
# or
npm run start:dev
```

### Database Migration

Tables are auto-synchronized using TypeORM (`synchronize: true`), but for production it is recommended to disable it and manage migrations manually.

### Seeding the Database

You can call the seeding service to populate the database with demo posts.

## API Endpoints

| Method | Route              | Description                       | Auth Required |
| :----- | :----------------- | :-------------------------------- | :------------ |
| POST   | /auth/register      | Register a new user               | No            |
| POST   | /auth/login         | Login with credentials            | No            |
| GET    | /posts              | Get all posts                     | No            |
| GET    | /posts/:id          | Get single post details           | No            |
| POST   | /posts              | Create a new post                 | Yes           |
| DELETE | /posts/:id          | Delete a post (only owner)         | Yes           |
| POST   | /posts/:id/comments | Add a comment to a post           | Yes           |
| DELETE | /comments/:id       | Delete a comment (only owner)      | Yes           |

## License

This project is licensed for educational purposes.
