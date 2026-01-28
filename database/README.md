# Database Setup Guide

## MySQL Database Configuration

### Prerequisites
- MySQL Server 8.0 or higher installed
- MySQL client or workbench for running SQL scripts

### Local Development Setup

1. **Install MySQL** (if not already installed):
   - **macOS**: `brew install mysql`
   - **Ubuntu**: `sudo apt-get install mysql-server`
   - **Windows**: Download from [MySQL Downloads](https://dev.mysql.com/downloads/mysql/)

2. **Start MySQL Service**:
   ```bash
   # macOS
   brew services start mysql
   
   # Ubuntu
   sudo service mysql start
   
   # Windows
   # Start MySQL service from Services panel
   ```

3. **Access MySQL**:
   ```bash
   mysql -u root -p
   ```

4. **Run the schema script**:
   ```bash
   mysql -u root -p < database/schema.sql
   ```

   Or from MySQL shell:
   ```sql
   source /path/to/database/schema.sql;
   ```

5. **Verify the database**:
   ```sql
   USE nthe_customer_db;
   SHOW TABLES;
   SELECT * FROM customers;
   ```

### Configuration for Backend

The backend application connects to MySQL using the configuration in:
- `backend/src/main/resources/application.properties`

Default connection settings:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/nthe_customer_db
spring.datasource.username=root
spring.datasource.password=password
```

**Important**: Update the `spring.datasource.password` in `application.properties` with your actual MySQL root password.

### AWS RDS Setup (Production)

For production deployment on AWS:

1. **Create RDS MySQL Instance**:
   - Engine: MySQL 8.0
   - Instance class: db.t3.micro (or as needed)
   - Storage: 20 GB General Purpose SSD
   - Enable automated backups
   - Set up security groups to allow access from application server

2. **Update application.properties for production**:
   ```properties
   spring.datasource.url=jdbc:mysql://<RDS-ENDPOINT>:3306/nthe_customer_db
   spring.datasource.username=<RDS-USERNAME>
   spring.datasource.password=<RDS-PASSWORD>
   ```

3. **Run schema on RDS**:
   ```bash
   mysql -h <RDS-ENDPOINT> -u <USERNAME> -p < database/schema.sql
   ```

### Environment Variables (Recommended)

For better security, use environment variables:

```bash
export DB_URL=jdbc:mysql://localhost:3306/nthe_customer_db
export DB_USERNAME=root
export DB_PASSWORD=your_password
```

Then update `application.properties`:
```properties
spring.datasource.url=${DB_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
```

### Database Migration

The application uses Spring Data JPA with Hibernate. The `spring.jpa.hibernate.ddl-auto=update` setting automatically creates and updates tables based on entity definitions.

For production, consider:
- Setting `ddl-auto=validate` or `ddl-auto=none`
- Using database migration tools like Flyway or Liquibase
