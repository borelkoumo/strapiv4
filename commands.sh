mkdir strapiv4
cd strapiv4
npx create-strapi-app@latest app --quickstart
docker build -t strapi:v4 .

# Dump production database https://simkimsia.com/how-to-restore-database-dumps-for-postgres-in-docker-container/
# Connect to production VM and run commands
docker exec postgres pg_dump -U strapi_user -d strapi > strapi-backup.dump
aws s3 cp strapi-backup.dump s3://androrat-bucket
# Donwload dump file to local environment then upload it to /tmp folder in ocal container
docker cp strapi-backup.dump postgres:/tmp
# Run a terminal session in local container
docker exec -it postgres bash
# Dump database
psql -U strapi_user strapi < /tmp/strapi-backup.dump 


# To know all services, run 
strapi services:list



# Create Strapi app
cd ~/strapiv4
npx create-strapi-app@latest app --quickstart

# As we use PostgreSQL as database, we need to install pg module from npm
cd app
npm install pg

# Update /config/database.js. We will change sqlite database to PostgreSQL
cd ~/strapiv4
nano ./app/config/database.js

# Create docker-compose.yaml
nano docker-compose.yaml

# Create .env file at root directory
nano .env

# Launch services
docker-compose up -d

# Only delete services
docker-compose down

# Delete services, and also remove images and volumes
docker-compose down --rmi all --volumes

# Install GraphQL plugin
npm install @strapi/plugin-graphql


# Create zip from app folder
cd ~/strapiv4
zip -r strapiv4 app -x "app/node_modules/*" -x "app/build/*" -x "app/.cache/*" -x "app/.tmp"




# Initialize git repo
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:borelkoumo/strapiv4.git
git push -u origin main

# Strapi v4 setup with Docker Compose and MySQL : https://blog.brazdeikis.io/today-i-learned/strapi-v4-setup-with-docker-compose-and-mysql
# Docker with Strapi V4: https://blog.dehlin.dev/docker-with-strapi-v4
# Compose file version 3 reference: https://docs.docker.com/compose/compose-file/compose-file-v3




MANUALLY

# Bridge networks are isolated networks on a single Engine installation. 
docker network create --driver bridge strapi-network
docker build --tag strapiv4 --file ./app/Dockerfile --build-arg NODE_ENV=development .
docker run -itd --env-file .env --network strapi-network --name strapiv4 -p1337:1337 strapiv4
docker run -itd --env-file .env --network strapi-network --name postgresDB -p5432:5432 postgres

# run postgres on localhost
docker run -itd --name postgresDB --hostname localhost --publish 5432:5432 --volume ./data:/var/lib/postgresql/data --env-file .env-postgres  postgres
