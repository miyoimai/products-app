# products-app
A products application that lists products and allows users to create new products.

Prerequisites
- Node v24
- JDK 26
- Postgres v18
- React v19

Database setup
```
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
```
Start backend
```
cd /backend
./run.sh
```

Start frontend
```
cd /frontend/products-app
npm start
```

Verification
- Start backend
- Start frontend
- Navigate to https://localhost:3000 and verify that the products list is displayed
- Click on "Create New Product" and verify that a new product can be created

I started by creating a new database "products". Then I created a new Spring Boot project and
connected to the database in IntellijIdea. I then created the two API endpoints to create a new 
product and to get all existing products. I verified the API endpoints worked using Postman. 
Then, I moved on to the frontend portion of the application. I created a new React project first.
Then, I created the home page that uses the GET API endpoint to display a table with all products.
I then created a Create Product page that uses the POST API endpoint to create a new product.
I verified the application worked by running both the backend and frontend together. I then created some
basic test classes to cover the functionality on both the frontend and backend.
                