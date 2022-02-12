# Backend
- The backend is written in Node.js
- The frontend and backend are two separate applications connected via REST APIs


### Steps to run
- Install the dependencies using `npm install`

- In the backend folder, create a file `.env` and add this line
`DB=mongodb+srv://admin:admin@cluster0.lbxjt.mongodb.net/finance-aggregator?retryWrites=true&w=majority`
This is to connect to the database

- Run the server using `nodemon index.js`. The server will run on `PORT 9001`



### API Endpoints

|    ENDPOINT           |   METHOD   |  USE     |
| ------------          | ---------- | ----     |
|  `/`  | `GET` | Landing page |
| `/test` | `GET` | Testing route |
| `/example` | `GET` | Get the list of all users |
| `/example` | `POST` | Add a new user with email, age to the collection (data sent in the body of the request) |
| `/example/:email` | `DELETE` | The user with the given email id is deleted |
| `/example/:email` | `PUT` | The age of the user with email is updated (age passed in body) |


