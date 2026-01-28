# Customer Management API Documentation

## Base URL
```
http://localhost:8080/api
```

For production: Replace with your deployed backend URL.

## Authentication
Currently, the API does not require authentication. For production, consider implementing:
- JWT tokens
- OAuth2
- API keys

## Data Models

### Customer

```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "555-0100",
  "address": "123 Main St",
  "city": "New York",
  "state": "NY",
  "zipCode": "10001",
  "country": "USA",
  "createdAt": "2026-01-28T04:00:00.000+00:00",
  "updatedAt": "2026-01-28T04:00:00.000+00:00"
}
```

### Field Descriptions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | Long | Auto-generated | Unique identifier |
| firstName | String | Yes | Customer's first name |
| lastName | String | Yes | Customer's last name |
| email | String | Yes | Unique email address |
| phone | String | No | Phone number |
| address | String | No | Street address |
| city | String | No | City |
| state | String | No | State/Province |
| zipCode | String | No | Postal/ZIP code |
| country | String | No | Country |
| createdAt | Timestamp | Auto-generated | Creation timestamp |
| updatedAt | Timestamp | Auto-updated | Last update timestamp |

## Endpoints

### 1. Get All Customers

**Request**
```http
GET /api/customers
```

**Response**
```json
[
  {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "555-0100",
    "city": "New York",
    "state": "NY",
    "country": "USA",
    "createdAt": "2026-01-28T04:00:00.000+00:00",
    "updatedAt": "2026-01-28T04:00:00.000+00:00"
  }
]
```

**Status Codes**
- `200 OK`: Success

---

### 2. Get Customer by ID

**Request**
```http
GET /api/customers/{id}
```

**Path Parameters**
- `id` (required): Customer ID

**Response**
```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "555-0100",
  "address": "123 Main St",
  "city": "New York",
  "state": "NY",
  "zipCode": "10001",
  "country": "USA",
  "createdAt": "2026-01-28T04:00:00.000+00:00",
  "updatedAt": "2026-01-28T04:00:00.000+00:00"
}
```

**Status Codes**
- `200 OK`: Customer found
- `404 Not Found`: Customer not found

**Example**
```bash
curl http://localhost:8080/api/customers/1
```

---

### 3. Create Customer

**Request**
```http
POST /api/customers
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane.smith@example.com",
  "phone": "555-0102",
  "address": "456 Oak Ave",
  "city": "Portland",
  "state": "OR",
  "zipCode": "97201",
  "country": "USA"
}
```

**Response**
```json
{
  "id": 2,
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane.smith@example.com",
  "phone": "555-0102",
  "address": "456 Oak Ave",
  "city": "Portland",
  "state": "OR",
  "zipCode": "97201",
  "country": "USA",
  "createdAt": "2026-01-28T05:00:00.000+00:00",
  "updatedAt": "2026-01-28T05:00:00.000+00:00"
}
```

**Status Codes**
- `201 Created`: Customer created successfully
- `400 Bad Request`: Validation error or duplicate email

**Validation Rules**
- `firstName`: Required, not empty
- `lastName`: Required, not empty
- `email`: Required, valid email format, unique

**Example**
```bash
curl -X POST http://localhost:8080/api/customers \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane.smith@example.com",
    "phone": "555-0102",
    "city": "Portland",
    "state": "OR",
    "country": "USA"
  }'
```

---

### 4. Update Customer

**Request**
```http
PUT /api/customers/{id}
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Smith-Johnson",
  "email": "jane.smith@example.com",
  "phone": "555-0999",
  "address": "789 New St",
  "city": "Portland",
  "state": "OR",
  "zipCode": "97202",
  "country": "USA"
}
```

**Path Parameters**
- `id` (required): Customer ID to update

**Response**
```json
{
  "id": 2,
  "firstName": "Jane",
  "lastName": "Smith-Johnson",
  "email": "jane.smith@example.com",
  "phone": "555-0999",
  "address": "789 New St",
  "city": "Portland",
  "state": "OR",
  "zipCode": "97202",
  "country": "USA",
  "createdAt": "2026-01-28T05:00:00.000+00:00",
  "updatedAt": "2026-01-28T06:00:00.000+00:00"
}
```

**Status Codes**
- `200 OK`: Customer updated successfully
- `400 Bad Request`: Validation error or duplicate email
- `404 Not Found`: Customer not found

**Example**
```bash
curl -X PUT http://localhost:8080/api/customers/2 \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jane",
    "lastName": "Smith-Johnson",
    "email": "jane.smith@example.com",
    "phone": "555-0999",
    "city": "Portland",
    "state": "OR",
    "country": "USA"
  }'
```

---

### 5. Delete Customer

**Request**
```http
DELETE /api/customers/{id}
```

**Path Parameters**
- `id` (required): Customer ID to delete

**Response**
```
(Empty response body)
```

**Status Codes**
- `200 OK`: Customer deleted successfully
- `404 Not Found`: Customer not found

**Example**
```bash
curl -X DELETE http://localhost:8080/api/customers/2
```

---

## Error Responses

### Validation Error (400 Bad Request)
```
Customer with email jane.smith@example.com already exists
```

### Not Found (404 Not Found)
```
Customer not found with id: 999
```

### Server Error (500 Internal Server Error)
```json
{
  "timestamp": "2026-01-28T06:00:00.000+00:00",
  "status": 500,
  "error": "Internal Server Error",
  "message": "An unexpected error occurred",
  "path": "/api/customers"
}
```

## CORS Configuration

The API is configured to accept requests from any origin (`@CrossOrigin(origins = "*")`).

For production, update the CORS configuration in `CustomerController.java`:
```java
@CrossOrigin(origins = "https://your-frontend-domain.com")
```

## Rate Limiting

Currently not implemented. Consider adding rate limiting for production:
- Spring Cloud Gateway
- Bucket4j
- API Gateway (AWS)

## Testing the API

### Using cURL

```bash
# Get all customers
curl http://localhost:8080/api/customers

# Get customer by ID
curl http://localhost:8080/api/customers/1

# Create customer
curl -X POST http://localhost:8080/api/customers \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@example.com"}'

# Update customer
curl -X PUT http://localhost:8080/api/customers/1 \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Updated","lastName":"User","email":"test@example.com"}'

# Delete customer
curl -X DELETE http://localhost:8080/api/customers/1
```

### Using Postman

1. Import the API collection
2. Set base URL: `http://localhost:8080/api`
3. Test each endpoint

### Using HTTPie

```bash
# Get all customers
http GET localhost:8080/api/customers

# Create customer
http POST localhost:8080/api/customers \
  firstName=Test lastName=User email=test@example.com
```

## Future Enhancements

- [ ] Authentication and authorization
- [ ] Pagination and filtering
- [ ] Search functionality
- [ ] Sorting options
- [ ] Bulk operations
- [ ] Import/Export (CSV, Excel)
- [ ] Customer notes and history
- [ ] File attachments
- [ ] Activity logging
- [ ] API versioning
