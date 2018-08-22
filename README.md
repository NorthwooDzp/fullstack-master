# Test CRM Project

This project was created using MEAN (MongoDB, Express, Angular, Node) stack.

## Api calls

###Auth calls

Action | Method | Path | Request Body | Response
--- | --- | --- | --- | ---
Registration | `POST` | /api/auth/register | email: String, password: String | email: String, password: String (encrypted)
Authorization | `POST` | /api/auth/login | email: String, password: String | token: 'Bearer <token>'