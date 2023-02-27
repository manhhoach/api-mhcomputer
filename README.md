# API MHComputer

## Name
API MHComputer

## Description
REST API using Node.js, Express, Sequelize with functions: 
`````````````````
Authentication and Authorization by JWT
Send mail with NodeMailer
Use Joi to validate data
Upload image to Cloudinary

`````````````````



## Set up

1. Run project with the following command
``````
cd project
npm i
``````
2. Config environment variables
``````
Jwt
SECRET_KEY_ACCESS_TOKEN=your-key-access-token 
SECRET_KEY_REFRESH_TOKEN=your-key-refresh-token
``````
`````` 
Cloudinary
CLOUDINARY_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
``````
``````
Database
DB_HOST=your-host
DB_PORT=your-port
DB_USERNAME=your-username
DB_PASSWORD=your-password
DB_DBNAME=your-dbname
``````
``````
Google cloud project
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-id
REFRESH_TOKEN=your-refresh-token
GMAIL=your-gmail
``````

3. Run project

In development mode

`````````
npm run dev
`````````

In production mode
 
`````````
 npm start
`````````
    
## Author
Manh Hoach




