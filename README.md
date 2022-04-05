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

The backend and frontend are independent applications. Within both, each product and major feature is decoupled using an isolated router to support independent development cycles and failure handling. This is achieved using express routers in NodeJS.

The main compoenents are :
- Login/Signup 
  
  Users can sign up and login to access various features of the appliation. To Signup, the user is required to provide details like `name`, `email`, `age`, `address` and set a `password`. The details are stored in a database and the user may login later with the same credentials.

  The signup and login routes redirect to the dashboard on success. After each signup/login the user session is maintained using a sessions cookie on the client side and relevant session information is stored in the frontend server. This allows for concurrency when the application is used by many people at the same time.

- User Dashboard
- Product pages
## Products

We cover five products : 
- [Fixed Deposits](FixedDeposit.md)
- [Health Insurance](HealthInsurance.md)
- [Travel Insurance](TravelInsurance.md)
- [Home Loan](homeLoan.md)
- [Personal Loan](PersonalLoan.md)

Each component is modular in nature and has separate backend and frontend components

//backend, frontend
how to run it 

//login, sign up
//separate readme file for each product

add inputs, outputs, algo, filters, routes, how data is transferred



