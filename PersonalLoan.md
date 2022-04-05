## Personal Loan
Personal Loans is an amount money that can be borroed for a any personal purpose like vacation costs, medical expenses, property renovation, debt, or for any unexpected expenses. Personal loan is offered by various public and private banks, unions and agencies, and vary greatly in terms of rate of interest, processing fees and loan duration.

### Inputs
The following inputs are accepted :
- `Desired loan amount` : A sum of money for which the user wants to avail a personal
- `Term period` : A valid term period between 0 - 50 years is accepted
- `Rate of Interest [optional]` : A desried rate of interest may be specified by the user
- `Public/Private Sector Loan Provider [optional]` : This option indicates user preferance to avail loan from a public or private loan agency
- `EMI [optional]` : This option iis a filter preference to display results in increasing order of EMI

### Outputs
Results based on the inputs entered is provided
The output contains : 
- `Name of the agency`
- `Interest rate` : Minimum interest rate offered by the agency
- `Processing Fees` : Processing fees (usually a percentage of loan amount) levied by the agency
- `EMI` : The EMI payable by user according to the input parameters is calculated. The minimum interest offered by the agency is taken as the default value for rate of interest.

### Data and Algorithms
- The data about agencies and personal loan parameters offered have been extracted from various webistes. The data is stored interest rates, processing fees, borrow amount allowed, etc as a separate recrd for each agency
- Based on the input paramters and/or filter options chosen, the algorithm is applied. Following algorithms exist : 
    - `EMI Calculation`:  For each viable home loan provider based on user inputs (requirements), effective EMI is calculated and displayed
    
    - `Filter based on agency` : User may opt to see results of private/public loan agencies

    - `Sort based on EMI` : The results are sorted in increasing order of EMI payable if the option is selected by the user

 The Schema model is present at `models/PersonalLoan.js`

### Endpoints 

- `/personal-loan`, `GET` : retrieves data for all agencies from the database
- `/personal-loan/query`, `POST` : based on the input parameters passed, the results are computed