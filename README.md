# Test CRM Project

This project was created using MEAN (MongoDB, Express, Angular, NodeJS) stack.

## Data Structures

Name | Fields
--- | ---
User | {email: string, password: string}
Category | {name: string, imageSrc: string, user: string (UserId)}
Position | {name: string, cost: number, category: string (CategoryId), user: string (UserId)}
Order | {date: number (Date), order: number, list: {name: string, quantity: number, cost: number}[]}

###

## Api calls

All request bodies should be in JSON format (if another format is not specified)

### Auth

Action | Method | Path | Request Body | Response
--- | --- | --- | --- | ---
Registration | `POST` | `/api/auth/register` | {email: string, password: string} | User
Authorization | `POST` | `/api/auth/login` | {email: string, password: string} | {token: Bearer \<token\>}

### Category

Action | Method | Path | Request Body | Response
--- | --- | --- | --- | ---
Get list of all Categories | `GET` | `/api/category/` | -- | Category[]
Get Category | `GET` | `/api/category/{category_id}` | -- | Category
Delete Category | `DELETE` | `/api/category/{category_id}` | -- | --
Create Category | `POST` (multipart/form-data) | `/api/category/`| {name: string, image: file, user: string (UserId)} | Category
