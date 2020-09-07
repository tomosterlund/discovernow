# To run this project:

## npm install
Run *npm i --save* in main directory, and in the client folder.

## DB
In order for the application to work, you need a MongoDB Atlas connection string.
This needs to be assigned as the value for **const dbUri** in server/app.js.

## AWS
In order to connect to an external file storage, you would need to create an S3 bucket, and somehow load your own security credentials.
In server/routes/api/content-creation.js and in
server/routes/api/base-routes.js, the way these credentials are loaded would also have to change.

## Run dev servers
Run *npm run dev* in main- and client directory.