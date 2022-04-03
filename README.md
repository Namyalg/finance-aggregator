# Finance Aggregator

Finance Aggregator is a one-stop destination to educate people about various investment options and different financial services. We cover services ranging from loans, FDs, insurance policies, etc, and provide the best comparison from the existing options, based on the preferences chosen by the user. The platform is beginner-friendly and simplifies the process of deciding the best service.

## Basic setup

The application has a separate backend and frontend.
### Frontend
The frontend is written in NodeJS using EJS
#### Steps to run
- `cd frontend`
- Install the dependencies using `npm install`
- Run the server using 'node server.js'. The web application will be live at port `8000`

### Backend
- The backend is written in Node.js
- [Mongo DB Atlas](https://www.mongodb.com/atlas/database) is used as the database
- The frontend and backend are two separate applications connected via REST APIs
#### Steps to run
- `cd backend`
- Install the dependencies using `npm install`
- In the backend folder, create a file `.env` and add this line and connection string as provided in the Mongo DB Atlas user interface 
- Run the server using `nodemon index.js`. The server will run on `PORT 9001`

## Components

The main compoenents are :
- Login/Signup 
- User Dashboard
- Product pages
## Products

We cover five products : 
- [Fixed Deposits](FixedDeposit.md)
- [Health Insurance](HealthInsurance.md)
- [Travel Insurance](TravelInsurance.md)
- Home Loan
- Personal Loan

Each component is modular in nature and has separate backend and frontend components

//backend, frontend
how to run it 

//login, sign up
//separate readme file for each product

add inputs, outputs, algo, filters, routes, how data is transferred



