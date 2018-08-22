# Test CRM Project

This project was created using MEAN (MongoDB, Express, Angular, NodeJS) stack.

## Data Structures

--- | ---
User | `email: string,      password: string`
Category |


## Api calls

### Auth

Action | Method | Path | Request Body | Response
--- | --- | --- | --- | ---
Registration | `POST` | `/api/auth/register` | `email: string,      password: string` | `email: String,     password: String (encrypted)`
Authorization | `POST` | `/api/auth/login` | `email: string,         password: string` | `token: Bearer <token>`

### Category

Action | Method | Path | Request Body | Response
--- | --- | --- | --- | ---
Get list of all categories | `GET` | `/api/category/` |  | `Category[]`
