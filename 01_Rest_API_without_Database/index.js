const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const port = 3000;

let customers = [
    {id: '1588323375416', firstName: 'John', lastName: 'Johnson', email: 'john@johnson.com', phone: '8233243'},
    {id: '1588323375417', firstName: 'Mary', lastName: 'Smith', email: 'mary@smith.com', phone: '6654113'},
    {id: '1588323375418', firstName: 'Peter', lastName: 'North', email: 'peter@north.com', phone: '901176'},
]

// Fetch all customers
app.get("/api/customers", (req, res) => {
    res.json(customers);
  });

app.get("/api/customers/:id", (req, res) => {
    const customerId = req.params.id;

    const customer = customers.filter(customer => customer.id === customerId);
    if (customer.length > 0)
        res.status(200).json(customer);
    else
        res.status(404).end();
});

// Add new customer
app.post("/api/customers", (req, res) => {
    // Extract customer from the request body and generate id
    const newCustomer = {"id": Date.now(), ...req.body};

    // Add new movie at the end of the customers array
    customers = [...customers, newCustomer];

    res.json(newCustomer);
});

//Delete customer
app.delete("/api/customers/:id", (req, res) => { 
    const id = req.params.id;

    customers = customers.filter(customer => customer.id !== id);
    res.status(204).end();
})

//Update customer
app.put("/api/customers/:id", (req, res) => { 
    const id = req.params.id;
    const updatedCustomer = {'id': id, ...req.body};
  
    //Get the index of updated customer
    const index = customers.findIndex(customer => customer.id === id);
    //Replace updated customer in the array
    customers.splice(index, 1, updatedCustomer); 
  
    res.json(updatedCustomer);
})

app.listen(port, () => {
   console.log(`Server is running on port ${port}.`);
});