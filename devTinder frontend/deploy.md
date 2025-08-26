instance name = devTinder
key pair name= devTinder-secret

connect to instance
1:go to windows powershell

2:change the location to where your pem file located

3: icacls "devTinder-sercret.pem" /reset

4:run the connection command => ssh -i "devTinder-sercret.pem" ubuntu@ec2-13-201-75-159.ap-south-1.compute.amazonaws.com


5:install the same version of node inside ec2 that is inside your local system

6: clone the project from github => git clone <https url>

7: install dependencies of the project in the project
    --fronetend 
        npm install
        npm run build
        sudo apt update
        apt sudo install nginx
        sudo systemctl start nginx
        sudo systemctl enable nginx
        copy code form dist (build file) to /var/www/html/
        sudo scp -r dist/* /var/www/html/
        enable port 80 of your instance
    -- backend 
        npm install

mongodb+srv://anandrajoriya03:<db_password>@namestenode.cuxwa6h.mongodb.net/?retryWrites=true&w=majority&appName=namesteNode


