# Natours

Natours is a tours management system for browsing and booking tours.

## Main Features

This App implements almost all the necessary Backend tasks and functionalities and more:

- REST API with multiple resource endpoints.
- Conrollers for all the CRUD operations on every resource.
- Schema design and configuration with Mongoose.
- Multiple API features like Pagination, filtering, sorting, fields limiting ...
- Robust error handling mechanism with express.
- Authentication and Authorization with JsonWebTokens (JWT) and Cookies.
- Email functionality with Nodemailer.
- Map functionality with Mapbox
- File uploading with multer and image processing with Sharp.

## Stack

- Node.js with Express.js
- MongoDB with Mongoose.
- Pug for server-side rendering.

## Paraquisites

- Node.js : https://nodejs.org/en/download/
- MongoDb : https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/
- MongoDB cluster : create your own at https://www.mongodb.com/atlas/database
- For production create a config.env with these params:  
  DATABASE= //your mongoDB cluster url (connect to app)  
  DATABASE_PASSWORD= //your database password  
  NODE_ENV=development
- Nodemon for a dev server : npm install nodemon

## Quick Start

```shell
$ git clone https://github.com/omaralshayeb/Natours.git
$ cd Natours
$ npm install
$ npm start
```

That will start the app in the development environment.

## Demo

This app is deployed to Heroku, check it out:  
https://natoursos.herokuapp.com/  
log in:  
email: laura@example.com // password:test1234

## REST API

This app uses the Natours REST API :
https://documenter.getpostman.com/view/16602447/UV5TEeiJ
