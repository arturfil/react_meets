REPO_DIR=/home/ubuntu/Documents/project/client
BUILD_DIR=$REPO_DIR/.next
PM2_APP_NAME=next

cd $REPO_DIR

git pull origin main

npm install

npm run build

pm2 restart $PM2_APP_NAME
