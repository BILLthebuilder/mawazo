# auth-api

A simple blog api with jwt authentication

### Tech stack
- NodeJs
- MongoDb

## Getting started
- Clone the repo
- Install [nodejs](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-18-04)
- Install [mongodb](https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-18-04)
- Create a new `.env` file and refer to `.env.example` for details on how to set up your database

```
npm install or yarn install

open your browser at http://localhost:5000 

```
#### User Endpoints

| Request | Endpoint              | Function                                                                   |
| ------- | --------------------- | -------------------------------------------------------------------------- |
| POST    | `/users/signup`       | Register a new user                                                        |
| POST    | `/users/login`        | Login a registered user                                                    |
| POST    | `/users/logout`       | Logout current user                                                        |
| POST    | `/users/logoutall`    | Logout all registered users and revoke tokens(admin)                       |
| GET     | `/users/me`           | View current user details                                                  |
| GET     | `/users/all`          | View all registered user details(admin)                                    |
| DELETE  | `/users/delete/me`     | Delete a user(admin)                                                      |


#### Blogposts Endpoints

| Request | Endpoint                 | Function                                       |
| ------- | ------------------------ | ---------------------------------------------- |
| POST    | `/post`                  | Create a blogpost                              |
| GET     | `/posts`                 | View all blogposts                             |
| PATCH   | `/posts/:id`             | Edit a blogpost                                |
| DELETE  | `/posts`                 | Delete a blogpost                              |

#### Commenting Endpoints

| Request | Endpoint                 | Function                                   |
| ------- | ------------------------ | ------------------------------------------ |
| POST    | `/posts/:id/comment`     | Comment on a blogpost                      |
| GET     | `/posts/:id/comment`     | Get all comments on a blogpost             |
| PATCH   | `/` being made           | Edit a comment                             |
| DELETE  | `/` being made           | Delete a comment                           |
