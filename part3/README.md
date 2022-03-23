# Part 3

In this part our focus shifts towards the backend, that is, towards implementing functionality on the server side of the stack. We will implement a simple REST API in Node.js by using the Express library, and the application's data will be stored in a MongoDB database. At the end of this part, we will deploy our application to the internet.

[You can check here the app deployed to Heroku](https://enigmatic-woodland-00170.herokuapp.com/)

## Run the application locally

```
# Navigate into the root directory 
$ cd phonebook-backend

// Install the required dependencies
npm install 

//Create a .env file with your MONGODB_URI to connect with your mongodb database
echo "MONGODB_URI=<YOUR-MONGODB-URI>" > .env

//Add the port the application will be using to the .env file
echo "PORT=<PORT NUMBER>" > .env

//Run the application
npm start
```
