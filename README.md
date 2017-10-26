# Restaurant List
This is a sample application demonstrating the use of React, Node, and RESTful services

## In this project, there are 2 applications, each managing data differently

### React's component states
- this app utilizes reacts very own state management system within each component, and handles ADDs, REMOVEs, and EDITs all on the front end within React

### MongoDB
- this app uses the backend server to GET, POST, PUT, and DELETE the data between a Mongo database. All requests between the application and the server coincide with the standard RESTful protocol. With this app, no data is stored on the frontend within react, all updates come from the database.

## To run the first application:
1. Open a console and run the following
```
git clone https://github.com/sshilal1/restaurantlist.git
cd restaurantlist
npm install
webpack
node react-store-server.js
```
2. Visit localhost:3000 in your browser to see it in action!

**Note**: The command `webpack` requires you to install with the *global* flag `-g` so you can run the command from your console. Run `npm i webpack -g`.

## To run the second application, we assume [MongoDB](https://www.mongodb.com/) installed.
1. Open a console and run `mongod`

2. If you havent run the first application yet, open another console and run
```
git clone https://github.com/sshilal1/restaurantlist.git
cd restaurantlist
npm install
webpack
```
3. then, run
```
node server.js
```
4. Visit localhost:4000 in your browser to see it live as well!
