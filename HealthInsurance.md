# Health insurance
Health insurance is a contract where an insurance company provides medical coverage to the insured for a premium amount. 
It covers medical expenses incurred on hospitalization, surgeries, day care procedures, etc. 
A health insurance policy either reimburses the medical costs or offers cashless treatment.

## Inputs
The inputs are as follows- 

1) `Age`- The age of the user is taken as input. Higher the age of the insurance policy buyer, more will be the premium to be paid because of higher chances of using the policy.
2) `No . Of chronic diseases` - The number of chronic diseases the user is suffering from is taken as input. More the number of chronic diseases, higher is the premium to be paid.
3) `No. Of family members to be added` - If the users want to include any family members like parents, children or spouse, they can write the total number in this input. More the number of people too be included, higher is the premium to be paid.

## Outputs
The following outputs related to reach health insurance are displayed on the webpage-

1) `Insurance Policy`- The name of the insurance policy along with the agency's name that is offering the policy is displayed.
2) `Cover`- Cover of the health insurance is the amount coverage offered in the policy. This cover includes all kinds of cost to be paid if the user avails the policy in a hospital like room cost, medicine cost, equipments cost, doctors cost etc. The portal includes insurances having covers from 3 lakh to 1 crore.
3) `Premium` - Premium is the amount to be paid to the agency by the user after buying the insurance policy. The portal shows monthly premium and it is subjective to a variety of parameters like age, no. Of chronic diseases and no. Of family members. 
4) `Diseases covered` - An array of chronic diseases convered by the insurance policy is displayed on the webpage. Sone of the examples of chronic diseases covered are hypertension, diabetes, arthritis etc.
5) `Cashless Hospitals` - The number of cashless hospitals covered by the policy are displayed in the webpage. Cashless hospitals are those hospitals where the user doesn't have to pay a single penny out of his pocket in case of a hospitalization and the entire hospital bill is cleared directly by the Insurance Company.

## Data and Algorithms
The data of the health insurance agencies and their policies have been extracted from various websites. All of the policies are active in India. Some changes have been made to the data as per the new algorithm applied.

The algorithms have been mainly applied to calculate the premium to be paid to the agency by the user. There are 2 algorithms-
1) Based on the number of chronic diseases the user is suffering from. A particular amount for each disease is added to the basic premium to calculate the final premium.
2) Based on the number of family members the users want to add. The premium increases by certain amount for every extra person with whom the policy needs to be shared.

The output can be sorted (optional) in non decreasing order based on the following parameters-
1) `Premium` 
2) `Cover`
3) `Number of cashless hospitals`

By default, the data is sorted based on the cashless hospitals. 

The Schema model is present at models/HealthInsurance.js

## Endpoints
- `/health-insurance`, `GET` : Retrieves data about all health insurance policies offered from the database.
- `/health-insurance/query`, `POST` : Based on the inputs entered by the user, filters are applied on the database and results are retrieved accordingly.
