## Home Loan
Home loan is the amount of money we borrow from banks for purchasing a home. They are repaid through EMIs.

### Inputs
The following inputs are accepted :
- `Sort By` : Select option to sort the result on the basis of interest rate or processing fee.
- `Desired Loan amount` : The amount of money the user want to lend for home loan.
- `Tenure` : The period of time from the date of disbursement of loan to the date of the last EMI payment or the date of closure of loan.
- `Gross monthly income` : The total monthly income of an individual before any deduction of taxes etc.
- `age` : The age of user to check for the eligibilty for loan in different banks.
- `employment type` : Option to select whether the user is salaried / self employed. 
- `gender` : Gender of the user.
- `rate packages` : Choose whether the rate package is fixed or floating.

### Outputs
A sorted ordering of the results based on the inputs entered is provided
The output contains : 
- `Name of the bank`
- `Processing Fee` : The fees and charges associated with a home loan while processing the loan.
- `Interest Rate`
- `EMI` : Amount of money which the borrower is expected to pay to the lender every month over the loan tenure.
- An option to bookmark any result for future reference

### Data and Algorithms
- The data about banks and home loan rates have been extracted from various webistes. Some changes have been made to the data as per the algorithm needed.
- It takes the age, tenure as the input and check eligibility in different banks.
- Calculate the interest rate using the data of the available banks and user details like employment type, gender, rate packages.
- Calculate EMI.
- Calculate processing fee.
- Check whether the income of an individual is sufficient to pay the EMI or not.
- List all the banks with their processing fee, interest rate and EMI and sort them on the basis of interest rate or processing fee.

 The Schema model is present at `models/HomeLoan.js`

### Endpoints 

- `/home-loan`, `GET` : retrieves data about all banks from the database
- `/home-loan`, `POST` : based on the input parameters passed, the results are computed
