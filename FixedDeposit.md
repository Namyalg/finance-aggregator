## Fixed Deposit
Fixed Deposit an investment where a certain amount of money is locked for a period, and on completion of the period, an interest amount is obtained on the initial sum. It is a safe investment option though rates of interest may not be very high. 

### Inputs
The following inputs are accepted :
- `Principal amount` : A sum of money between 0 - 5 crores is accepted as a principal amount
- `Tenure` : A valid tenure between 0 - 10 years is accepted
- `Senior citizen` : Banks offer higher rates of interest to people who are older than 60 years
- `Cumulative` : This option indicated compounding of the interest for the specified time
- `Non cumulative` : This option indicates that the user wants to obtain the interest accrued on the sum either `monthly`, `quarterly` or `semi-annually`, the simple interest method is used to calculate the interest here
- `Sorting criteria` : A choice between `interest amount` and `safety` of the deposit can be chosen.

### Outputs
A sorted ordering of the results based on the inputs entered is provided
The output contains : 
- `Name of the bank`
- `Bank type` : public or private sector
- `Interest Rate`
- `Interest Amount` : In case Non-cumulative is chosen, the interest amount based on the period of return is provided
- `Tenure` : The slab under which the total tenure provided exists
- An option to bookmark any result for future reference

### Data and Algorithms

#### Schema

`Bank name` 

`under_two_cr` : // principal amount is < 2,00,00,000, an array of time slabs and rate of interest for general population and seniors 

`two_five_cr`  : // principal amount  is  >= 2,00,00,000, <= 5,00,00,000, same as above

`type` : // type of bank 



#### Algorithm
- The data about banks and fixed deposit rates have been extracted from various webistes. The data is stored as the tenure slab each having an interest rate for senior citizens and a general rate of interest

- Based on the sorting criteria chosen, the algorithm is applied. Two algorithms exist : 
    - `Sort based on Interest Rate`:  The results are ordered in decreasing order of the interest amounts. For cumulative, the compound interest for the entire duration is calculated. For non-cumulative, the simple interest obtained at the end of each period is calculated and shown
    
    - `Sort based on Safety` : When sorted based on `safety`, public sector banks appear first followed by private sector banks in decreasing order of interest rates

 The Schema model is present at `models/FixedDeposit.js`

### Endpoints 

- `/fd`, `GET` : retrieves data about all banks from the database
- `/fd`, `POST` : based on the input parameters passed, the results are computed
- `/fd/add`, `POST` : Data for a new bank can be added at this route
