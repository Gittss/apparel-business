# Steps to setup the server

1.  npm install
2.  npm run dev

# API definitions and curl to test each endpoint

1.  /api/vendor/update
    To update/add one or multiple apparels based on params received

    curl for the endpoint

    curl --location 'http://localhost:3000/api/vendor/update' \
     --header 'Content-Type: application/json' \
     --header 'Content-Type: application/json' \
     --data '[
    {
    "quantity": 50,
    "price": 40,
    "code": "T-Shirt",
    "size": "L"
    },
    {
    "quantity": 90,
    "price": 40,
    "code": "Jeans",
    "size": "S"
    },
    {
    "quantity": 100,
    "price": 1200,
    "code": "Saaree",
    "size": "free-size"
    }
    ]'

    To run the same endpoint for Single apparel update

    curl for single update

    curl --location 'http://localhost:3000/api/vendor/update?apparelCode=Jeans&apparelSize=M' \
     --header 'Content-Type: application/json' \
     --header 'Content-Type: application/json' \
     --data '{
    "quantity": 250,
    "price": 300
    }'

2.  /api/user/check-fulfillment

    To check if order can be fulfilled or not
    -> returns a boolean

    curl to test this

    curl --location 'http://localhost:3000/api/user/check-fulfillment' \
     --header 'Content-Type: application/json' \
     --header 'Content-Type: application/json' \
     --data '[
    {
    "code": "T-Shirt",
    "size": "M",
    "quantity": 10
    },
    {
    "code": "Jeans",
    "size": "M",
    "quantity": 100
    }
    ]'

3.  /api/user/order-cost

    To check if order can be fulfilled or not
    -> returns either status 404 if any apparel doesn't have enough stock or
    -> returns status 200 to return total cost

    curl to test this

    curl --location 'http://localhost:3000/api/user/order-cost' \
     --header 'Content-Type: application/json' \
     --data '[
    {
    "code": "T-Shirt",
    "size": "M",
    "quantity": 10900
    },
    {
    "code": "Jeans",
    "size": "M",
    "quantity": 10
    }
    ]'

# Run test cases

# npm test
