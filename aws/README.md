# AWS Deployment Guide for NTHE Customer Management System

This guide covers deploying the NTHE Customer Management System to AWS.

## Architecture Overview

- **Frontend**: React application served from S3 + CloudFront
- **Backend**: Spring Boot application on EC2 or Elastic Beanstalk
- **Database**: MySQL on RDS
- **Optional**: Load Balancer, Auto Scaling

## Prerequisites

- AWS Account
- AWS CLI installed and configured
- Domain name (optional)

## Deployment Steps

### 1. Database Setup (RDS)

1. **Create RDS MySQL Instance**:
   ```bash
   aws rds create-db-instance \
     --db-instance-identifier nthe-customer-db \
     --db-instance-class db.t3.micro \
     --engine mysql \
     --master-username admin \
     --master-user-password <your-password> \
     --allocated-storage 20 \
     --vpc-security-group-ids <security-group-id> \
     --backup-retention-period 7
   ```

2. **Configure Security Group**:
   - Allow inbound traffic on port 3306 from application server
   - Restrict access to specific IP ranges

3. **Initialize Database**:
   ```bash
   mysql -h <rds-endpoint> -u admin -p < database/schema.sql
   ```

### 2. Backend Deployment (Elastic Beanstalk)

1. **Build the application**:
   ```bash
   cd backend
   mvn clean package
   ```

2. **Initialize Elastic Beanstalk**:
   ```bash
   eb init -p java-17 nthe-customer-backend --region us-east-1
   ```

3. **Create environment**:
   ```bash
   eb create nthe-customer-env
   ```

4. **Set environment variables**:
   ```bash
   eb setenv \
     DB_URL=jdbc:mysql://<rds-endpoint>:3306/nthe_customer_db \
     DB_USERNAME=admin \
     DB_PASSWORD=<your-password>
   ```

5. **Deploy**:
   ```bash
   eb deploy
   ```

### 3. Frontend Deployment (S3 + CloudFront)

1. **Build the frontend**:
   ```bash
   cd frontend
   npm run build
   ```

2. **Create S3 bucket**:
   ```bash
   aws s3 mb s3://nthe-customer-frontend
   ```

3. **Configure bucket for static website hosting**:
   ```bash
   aws s3 website s3://nthe-customer-frontend \
     --index-document index.html \
     --error-document index.html
   ```

4. **Upload build files**:
   ```bash
   aws s3 sync dist/ s3://nthe-customer-frontend --delete
   ```

5. **Set bucket policy for public access**:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::nthe-customer-frontend/*"
       }
     ]
   }
   ```

6. **Create CloudFront distribution** (optional but recommended):
   - Origin: S3 bucket
   - Viewer protocol policy: Redirect HTTP to HTTPS
   - Compress objects automatically: Yes

### 4. Environment Configuration

Update frontend environment variables:

Create `.env.production` in frontend directory:
```
VITE_API_URL=http://<elastic-beanstalk-url>/api
```

For CloudFront + HTTPS:
```
VITE_API_URL=https://<your-domain>/api
```

### Alternative: EC2 Deployment

If using EC2 instead of Elastic Beanstalk:

1. **Launch EC2 instance**:
   - AMI: Amazon Linux 2
   - Instance type: t3.micro or larger
   - Configure security group (ports 22, 8080)

2. **Install Java**:
   ```bash
   sudo yum install java-17-amazon-corretto
   ```

3. **Upload and run application**:
   ```bash
   scp backend/target/*.jar ec2-user@<ec2-ip>:~/
   ssh ec2-user@<ec2-ip>
   java -jar customer-management-0.0.1-SNAPSHOT.jar
   ```

4. **Set up as systemd service** for auto-restart

## Security Considerations

1. **Use environment variables** for sensitive data (never commit passwords)
2. **Enable HTTPS** using ACM certificates
3. **Configure CORS** properly in Spring Boot
4. **Use IAM roles** instead of access keys where possible
5. **Enable RDS encryption** at rest
6. **Use VPC** to isolate database from public internet
7. **Enable CloudWatch logs** for monitoring

## Cost Estimation

**Free Tier eligible** (first 12 months):
- RDS db.t3.micro: 750 hours/month
- EC2 t3.micro: 750 hours/month
- S3: 5GB storage
- CloudFront: 50GB data transfer

**After free tier** (approximate monthly costs):
- RDS db.t3.micro: ~$15
- EC2 t3.micro: ~$8
- S3 + CloudFront: ~$2-5
- **Total**: ~$25-30/month

## Monitoring and Maintenance

- Set up CloudWatch alarms for:
  - RDS CPU utilization
  - EC2/EB health checks
  - Application errors
- Enable automated backups for RDS
- Regular security updates

## CI/CD (Optional)

Set up GitHub Actions or AWS CodePipeline for automated deployments:
- Trigger on push to main branch
- Run tests
- Build and deploy to AWS

See `.github/workflows/deploy.yml` for example workflow.
