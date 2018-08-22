# Test CRM Project

This project was created using MEAN (MongoDB, Express, Angular, Node) stack.

## Api calls

###Auth calls

Method | Path | Request Body | Response
--- | --- | --- | ---
`POST` | /api/auth/register | ```javascript
{
    email: String,
    password: String
}
```
| ```javascript
{
    email: String,
    password: String (encrypted)
}
