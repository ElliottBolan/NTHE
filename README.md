# NTHE Customer Management System

A full-stack customer database management application built with Spring Boot, React, MySQL, and designed for AWS deployment.

## 🚀 Technology Stack

- **Backend**: Spring Boot 3.2.1 (Java 17)
- **Frontend**: React 18 with Vite
- **Database**: MySQL 8.0+
- **Cloud**: AWS (RDS, EC2/Elastic Beanstalk, S3, CloudFront)

## 📋 Features

- ✅ Complete CRUD operations for customer management
- ✅ RESTful API with Spring Boot
- ✅ Modern, responsive React UI
- ✅ MySQL database with JPA/Hibernate
- ✅ Form validation
- ✅ Real-time data updates
- ✅ Error handling and user feedback
- ✅ AWS deployment ready

## 🏗️ Project Structure

```
NTHE/
├── backend/              # Spring Boot application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/nthe/customermanagement/
│   │   │   │   ├── controller/      # REST controllers
│   │   │   │   ├── model/           # Entity classes
│   │   │   │   ├── repository/      # JPA repositories
│   │   │   │   └── service/         # Business logic
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   └── pom.xml
├── frontend/             # React + Vite application
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── services/     # API services
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── database/            # Database scripts and docs
│   ├── schema.sql
│   └── README.md
└── aws/                 # AWS deployment guides
    └── README.md
```

## 🛠️ Prerequisites

- Java 17 or higher
- Maven 3.6+
- Node.js 18+ and npm
- MySQL 8.0+
- Git

## 🚦 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/ElliottBolan/NTHE.git
cd NTHE
```

### 2. Database Setup

```bash
# Start MySQL service
# macOS: brew services start mysql
# Ubuntu: sudo service mysql start

# Create database and tables
mysql -u root -p < database/schema.sql
```

**Important**: Update `backend/src/main/resources/application.properties` with your MySQL password:
```properties
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

### 3. Backend Setup

```bash
cd backend

# Build the application
mvn clean install

# Run the application
mvn spring-boot:run
```

The backend server will start at `http://localhost:8080`

### 4. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 🧪 Testing

### Backend Tests
```bash
cd backend
mvn test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📡 API Endpoints

### Customer Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/customers` | Get all customers |
| GET | `/api/customers/{id}` | Get customer by ID |
| POST | `/api/customers` | Create new customer |
| PUT | `/api/customers/{id}` | Update customer |
| DELETE | `/api/customers/{id}` | Delete customer |

### Example Request

```bash
# Create a customer
curl -X POST http://localhost:8080/api/customers \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "555-0100",
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  }'
```

## 🏗️ Building for Production

### Backend
```bash
cd backend
mvn clean package
# JAR file will be in target/customer-management-0.0.1-SNAPSHOT.jar
```

### Frontend
```bash
cd frontend
npm run build
# Build files will be in dist/
```

## ☁️ AWS Deployment

See detailed deployment instructions in [aws/README.md](aws/README.md)

**Quick Overview**:
1. Deploy MySQL database to AWS RDS
2. Deploy backend to Elastic Beanstalk or EC2
3. Deploy frontend to S3 + CloudFront
4. Configure environment variables and security groups

## 🔒 Security Notes

- Never commit sensitive data (passwords, API keys) to version control
- Use environment variables for configuration
- Enable HTTPS in production
- Configure CORS appropriately
- Use strong passwords for database
- Keep dependencies updated

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

- NTHE Development Team

## 🙏 Acknowledgments

- Spring Boot team for the excellent framework
- React team for the amazing frontend library
- Vite for blazing fast build tooling

## 📞 Support

For issues and questions, please open an issue on GitHub.

---

**Made with ❤️ by NTHE**