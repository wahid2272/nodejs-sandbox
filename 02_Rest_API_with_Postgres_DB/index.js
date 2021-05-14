const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db/dbConfig");
const query = require("./db/customers");

const app = express();
// app.use(express.json());
// app.use(
//   express.urlencoded({
//     extended: true,
//   })
// );

app.use(bodyParser.json());

const port = 3000;

//Get all customers
app.get("/api/customers", query.getAllCustomers);

// Get customer by id
app.get("/api/customers/:id", query.getUserById);

// Add new customer
app.post("/api/customers", query.addCustomer);

// Delete a customer
app.delete("/api/customers/:id", query.deleteCustomer);

// Update Customer
app.put("/api/customers/:id", query.updateCustomer);

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
