# Natours

Natours is a tours management system for browsing and booking tours.

## Main Features

- Browse all available tours and get all the details on each one.
- A map functionality to preview the exact tour route.
- Reviewing system to rate the tours.
- User authentication system with JWTs.
- Update user info with file uploading and password changeing functionalities.
- Mailing service with Nodemailer.

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
