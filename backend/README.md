# Backend
- The backend is written in Node.js
- The frontend and backend are two separate applications connected via REST APIs

### API Endpoints

|    ENDPOINT           |   METHOD   |  USE     |
| ------------          | ---------- | ----     |
|  `/`  | `GET` | Landing page |
| `/test` | `GET` | Testing route |
| `/example` | `GET` | Get the list of all users |
| `/example` | `POST` | Add a new user with email, age to the collection (data sent in the body of the request) |
| `/example/:email` | `DELETE` | The user with the given email id is deleted |
| `/example/:email` | `PUT` | The age of the user with email is updated (age passed in body) |

### Steps to run
- Clone the folder from the Github Repository
- Install the dependencies using `npm install`
- Run the server using `nodemon index.js` on `PORT 9001`