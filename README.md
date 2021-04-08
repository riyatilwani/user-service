# user-service

Basic user service

Has 2 APIs-

1. Onboard Users API:
curl --location --request POST 'http://localhost:5000/api/users/upload' \
--header 'Content-Type: application/json' \
--data-raw '[{
    "username": "testUser4",
    "password": "123456oo",
    "firstName": "test",
    "lastName": "user4",
    "mobile":1234567812
}
]'

2. Login API: 
curl --location --request POST 'http://localhost:5000/api/users/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "testUser4",
    "password": "123456oo"
}'

To run the project:
- Run npm install
- Run npm start
