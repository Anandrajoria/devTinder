# 🚀 Deploy Your Full Stack MERN Project on AWS EC2

This guide walks you through deploying a MERN stack (MongoDB, Express, React, Node.js) project on an AWS EC2 instance.

---

## ✅ Prerequisites

Before starting, make sure you have:

1. An **AWS Account**
2. Your **code pushed to GitHub**
3. A **MongoDB Atlas cluster created** (or your own DB)
4. A **PEM key pair** generated while creating the EC2 instance

---

## ⚙️ Step 1: Launch an EC2 Instance

1. Log in to your AWS account → Go to **EC2 Dashboard**
2. Click **Launch Instance**
   - Choose Ubuntu (free tier eligible)
   - Select **t2.micro** (free tier)
   - Create/download a new **key pair** (PEM file) and store it securely
   - Configure security group → Allow:
     - **Port 22 (SSH)**
     - **Port 80 (HTTP)**
3. Launch the instance ✅

---

## ⚙️ Step 2: Connect to EC2 via SSH

1. Open **PowerShell / Terminal**
2. Navigate to the folder where PEM file is stored:
   ```sh
   cd path/to/pem/file
3. Fix file permissions (Windows PowerShell):
   ```sh
   icacls "your_pem_file_name.pem" /reset
4. Connect to EC2 (replace with your instance details):
    ```sh
    ssh -i "your_pem_file_name.pem" ubuntu@ec2-XX-XX-XX-XX.ap-south-1.compute.amazonaws.com
    (go to your instance => go to connect => go to ssh client => copy the last command just below example:)
## ⚙️ Step 3: Install Node.js (Same Version as Local)
1. Run the following commands inside EC2:
    ```sh
    curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
    sudo apt-get install -y nodejs
2. check the version
    ```sh
    node -v
## ⚙️ Step 4: Clone Your Project
1. clone project from github
    ```sh    
    git clone <your-github-repo-url>
    cd your-project
---
## 🌐 Frontend Deployment
1. Navigate to frontend folder:
    ```sh
    cd frontend
2. Install dependencies:
    ```sh
    npm install
    npm run build
👉 This creates a dist (or build) folder.

3. Install and configure Nginx:
    ```sh
    sudo apt update
    sudo apt install nginx -y
    sudo systemctl start nginx
    sudo systemctl enable nginx
4. Deploy build files:
    ```sh
    sudo rm -rf /var/www/html/*
    sudo cp -r dist/* /var/www/html/
(Use build/* if React build generates build/ instead of dist/)

5. Open browser → 
    ```sh
    http://<EC2-Public-IP> 
# 🚀 Backend Deployment Guide (MERN + AWS + PM2 + Nginx)

### 1. Start Backend Locally on EC2
1. Locate to your backend project directory:
   ```sh
   cd ~/devTinder/Dev\ Tinder\backend
2. Install dependencies:
    ```sh
    npm install
3. Start backend to check if it runs:
    ```sh
    npm start
If it fails due to database connection → check MongoDB Atlas.


### 2. Fix MongoDB Atlas Connection
1. Go to MongoDB Atlas → Network Access.
2. Add your EC2 Public IP and allow Access from Anywhere (0.0.0.0/0).
3. Update your backend .env to include the new connection string.

### 3. Access Backend from Browser
1. Copy EC2 Public IP and test in browser:
    ```sh
    http://<awsPublicIp>:<local_port_number>
2. If it doesn’t work:
    
    - Add a new Inbound Rule in your EC2 Security Group:
        
        - Type: Custom TCP
        - Port: your backend port (e.g., 7777)
        - Source: 0.0.0.0/0
3. Test again → you should now see:
    ```sh
    Cannot GET /
Means your backend is running but only as long as the terminal session is active.

### 4.Run Backend 24/7 with PM2

1. Install PM2 globally:
    ```sh
    sudo npm install pm2 -g
2. Start backend with PM2:
    ```sh
    pm2 start npm -- start
3. Rename process for clarity:
    ```sh
    pm2 start npm --name "devTinder_backend" -- start
3. View logs if issues occur:
    ```sh
    pm2 logs
### 5. Configure Nginx for Reverse Proxy

1. Open Nginx config:
    ```sh
    sudo nano /etc/nginx/sites-available/default
2. Update server_name:
    ```sh
    server_name <your-public-ip>;
3. Add reverse proxy rules for backend:
    ```sh
    location /api/ {
    proxy_pass http://localhost:7777/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;}
4. Save file → exit nano.
5. Restart Nginx:
    ```sh
    sudo systemctl restart nginx
### 6. Test Backend API
1. Open in browser:
    ```sh
    http://<public_ip>/api
2. You should now see:
    ```sh
    Cannot GET /
✅ This confirms Nginx is proxying requests correctly.

### 7 Connect Frontend with Backend

1. Update your frontend base URL:
    
    - Change from:
        ```sh
        http://localhost:7777 
    - to:
        ```sh
        /api
2. Rebuild frontend:
    ```sh
    npm run build
3. Deploy frontend to Nginx:
    ```sh
    sudo rm -rf /var/www/html/*
    sudo cp -r dist/* /var/www/html/
### 🎉 Final Setup
- Backend runs on PM2 (always online).
- Frontend served by Nginx.
- API requests go through:
    ```sh
    http://<your-public-ip>/api
Now your MERN app is fully deployed on AWS EC2 🚀