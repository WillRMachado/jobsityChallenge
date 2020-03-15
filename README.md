# jobsityChallenge
 
![alt text][logo]

[logo]: https://www.jobsity.com/themes/custom/jobsity/images/logo/brand-jobsity.svg "Logo Title Text 2"

This is a Challenge project for Jobsity



## Introduction

This repo contains a web-chat with a bot accessible through chat commands, it's built with Node.js
As asked in the challenge documentation the front end was keep as simple as possible, not using any css ou styling


### Project Contents

It's divided in 3 different parts:

* Backend
* Bot
* Frontend

In order to created services as self-sustainable as possible, EVERY part will need to be initialized individually

### User Perspective

As an user you can access the bot by typing in the chat the following command:

`/stock={StockName}`

in a practical example:

`/stock=aapl.us`

every message starting with `/` will be interpreted as an command, at the moment (March 15, 2020) only `/stock=` is readily available

You can also navigate between 2 different chat rooms by clicking the "change chat" button

## Pre-requisites

You need to have installed:

* [Node.js](https://nodejs.org/en/ "Node's webpage")
* [MongoDB](https://www.mongodb.com/ "Mongo's webpage")
* [RabbitMQ](https://www.rabbitmq.com/ "Rabbit's webpage")
* NPM (automatically installed with node)
 alternatively you can you [yarn](https://yarnpkg.com/ "Yarn's webpage"), but it's optional

## Configuring your project

Since this project is divided in 3 parts, There is 3 places to configure your dependencies

Keep in mind that our bot uses amqp protocol to send messages back to our backend, using RabbitMQ

### Configuring the backend

There is a `.env.example` file, you can use it as example to set your `.env` file
you *can* simple copy/edit it to be a `.env`, but it is recommended to set your own configurations here

> **Path to Backend .env: /backend/.env**
> 
> **Path to Backend env.example: /backend/.env.example**

```dotenv
# .env
PORT=3333

MONGO_URI = 'mongodb://localhost:27017/jobsityChat'

AMQP_ADDRESS = 'amqp://localhost'

QUEUE_NAME = 'BOT'

BOT_PORT=8302

BOT_ADDRESS='http://localhost'

SECRET_TOKEN_KEY='secretkey'
```

Item | Functionality  | Observation
---: | --- | ---
PORT | Port in which your backend will be hosted
MONGO_URI | URI for your MongoDB collection of choice
AMQP_ADDRESS | path to host your AMQP | (*do keep 'amqp://localhost' if not deploying to web*)
QUEUE_NAME | Queue name for communicating with our bot | Make sure it matches QUEUE in bot
BOT_PORT | Port which will be used to access bot | Make sure it matches BOT_PORT in bot
BOT_ADDRESS | Address where out bot is hosted |(*do keep 'http://localhost' if not deploying to web*)
SECRET_TOKEN_KEY | secret key that will be used to authenticate our access token 

### Configuring the bot

Just like backend there is a `.env.example` file, you can use it as example to set your `.env` file
you *can* simple copy/edit it to be a `.env`, but it is recommended to set your own configurations here

> **Path to Bot .env: /bot/.env**
> 
> **Path to Bot env.example: /bot/.env.example**

```dotenv
BOT_PORT=8302

QUEUE='BOT'
```

Item | Functionality  | Observation
---: | --- | ---
BOT_PORT | Port in which the bot will be hosted | Make sure it matches BOT_PORT in backend
QUEUE | Queue name for communicating with our backend | Make sure it matches QUEUE_NAME in backend


### Configuring the Frontend
Here it will be slightly different, we will be editing a `Json` instead of a `.env`

>**Path settings.json: /frontend/src/settings.json**

```Json
{
    "API_PORT":3333,
    "API_URL":"http://localhost"
}
```
Item | Functionality  | Observation
---: | --- | ---
API_PORT| Port which will be used to access our Backend though API call | Make sure it matches PORT in backend
API_URL | Path which will be used to access our Backend though API call | (*do keep 'http://localhost' if not deploying to web*)

## Installation & Running

Now we need to start our project, as most Node and React projects we will need to install a couple of dependencies.

Again, as we hare this project divided in 3 parts, we will be using 3 terminals, one for each part of our web chat

Open the terminal and use the commands as intructed bellow

### Quick Approach

#### To start the backend

Open your terminal and run `npm run start-backend`

#### To start the bot

Open your terminal and run `npm run start-bot`

#### To start the frontend

Open your terminal and run `npm run start-frontend`

### Detailed Approach

#### To start the backend

* First, we need to navigate to backend folder: `cd backend`
* Then, install our dependencies `npm i`
* Finally start our server, I recommend using `nodemon` but you can also use `node loader.js` if hot reloading is not important

#### To start the bot

* First, we need to navigate to bot folder `cd bot`
* Then, install our dependencies `npm i`
* Finally start our bot, I recommend using `nodemon` but you can also use `node server.js` if hot reloading is not important

#### To start the frontend

* First, we need to navigate to frontend folder: `cd frontend`
* Then, install our dependencies `npm i`
* Finally start our frontend `npm start`

## What is used in here:

**This project backend uses:**

* Node.js
* Express
* RabbitMQ
* SocketIO
* dotenv
* jwt
* restAPI
* amqp protocol
* bcrypt
* mongoDB

**This project bot uses:**

* Node.js
* Express
* RabbitMQ
* dotenv
* restAPI
* amqp protocol

**This project frontend uses:**

* React.js
* Typescript
* SocketIO
* Axios
* React-router

###### Next Steps

This project can make good of of the following updates:

* Better handling secret access key for access token
* Be deployed to web
* Code refactor, specially in /bot
* Frontend development
