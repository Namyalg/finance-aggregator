
## Travel Insurance
Travel Insurance is a type of insurance that covers different risks while travelling. It covers medical expenses, lost luggage, flight cancellations, and other losses that a traveller can incur while travelling. 

### Inputs
The following inputs are accepted :
- `Destination` : The country which a traveller is going to
- `Number Of Passengers` : NUmber of people availing the insurance
- `Start Date` : The start date of a person's journey
- `End date` : The end date of a person's journey'

### Outputs
A sorted ordering of the results based on the inputs entered is provided
The output contains : 
- `Name of the agency`
- `Plan Offered` : The different plans that are offfered and the different services offered in each.
- `Destination`
- `Premium`
- `Duration` : The amount of time the insurance will be valid for which ranges from 1-12 months.
- An option to bookmark any result for future reference

### Data and Algorithms
- The data about agencies, the destination and the various plans offered in each of these has been extracted from a date set on Kaggle. Their premiums and durations have been produced artificially.

- Based on the sorting criteria chosen, the algorithm is applied. Two algorithms exist : 
    - `Sort based on Premium`:  The results are ordered in increasing order of the Premiums. 
    
    - `Sort based on Duration` : The results are ordered in decreasing order of the duration for which they are valid. 

 The Schema model is present at `models/TravelInsurance.js`

### Endpoints 

- `/travel-insurance`, `GET` : Retrieves data about all plans offered from the database.
- `/travel-insurance/alldest`, `GET` : Gets all the possible destinations that a user can choose from.
- `/travel-insurance/query`, `POST` : Based on the inputs entered by the user, filters are applied on the database and results are retrieved accordingly.
