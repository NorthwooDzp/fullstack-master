# Test CRM Project

This project was created using MEAN (MongoDB, Express, Angular, Node) stack.

## Api calls

###Auth calls

Action | Method | Path | Request Body | Response
--- | --- | --- | --- | ---
Registration | `POST` | /api/auth/register | email: String, \r\n password: String | email: String, \r\n  password: String (encrypted)
Authorization | `POST` | /api/auth/login | email: String, password: String | token: 'Bearer <token>'