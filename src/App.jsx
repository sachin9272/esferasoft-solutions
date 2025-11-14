import { useState } from "react";
import "./App.css";

export default function App() {
  const [customers, setCustomers] = useState([
    { name: "", age: "", address: "", error: {} }
  ]);

  const setFieldError = (index, field, msg) => {
    const updated = [...customers];
    updated[index].error[field] = msg;
    setCustomers(updated);
  };

  const handleChange = (index, field, value) => {
    const updated = [...customers];
    updated[index][field] = value;
    updated[index].error[field] = "";
    setCustomers(updated);
  };

  const validateCustomer = (customer, index) => {
    let isValid = true;
    const name = customer.name.trim();
    const age = customer.age;
    const address = customer.address.trim();

    if (!name) {
      setFieldError(index, "name", "Name is required");
      isValid = false;
    }
    if (!age) {
      setFieldError(index, "age", "Age is required");
      isValid = false;
    } else if (isNaN(age) || age <= 0) {
      setFieldError(index, "age", "Enter a valid positive age");
      isValid = false;
    }
    if (!address) {
      setFieldError(index, "address", "Address is required");
      isValid = false;
    }
    return isValid;
  };

  const addCustomer = () => {
    const lastIndex = customers.length - 1;
    const isValid = validateCustomer(customers[lastIndex], lastIndex);
    if (!isValid) return;
    setCustomers([
      ...customers,
      { name: "", age: "", address: "", error: {} }
    ]);
  };

  const removeCustomer = (index) => {
    if (customers.length === 1) return;
    const updated = customers.filter((_, i) => i !== index);
    const cleaned = updated.map((c) => ({
      ...c,
      error: c.error || {}
    }));
    setCustomers(cleaned);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let allValid = true;
    customers.forEach((customer, index) => {
      const valid = validateCustomer(customer, index);
      if (!valid) allValid = false;
    });
    if (!allValid) {
      console.log("Validation failed.");
      return;
    }
    console.log("Submitted Customers:", customers);
  };

  return (
    <div className="container">
      <h1 className="heading">Customer Form</h1>
      <form onSubmit={handleSubmit} className="form">
        {customers.map((customer, index) => (
          <div key={index} className="card">
            <h4 className="cardTitle">Customer {index + 1}</h4>

            <input
              type="text"
              placeholder="Name"
              className="input"
              value={customer.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
            />
            {customer.error.name && (
              <p className="error">{customer.error.name}</p>
            )}

            <input
              type="number"
              placeholder="Age"
              className="input"
              value={customer.age}
              onChange={(e) => handleChange(index, "age", e.target.value)}
            />
            {customer.error.age && (
              <p className="error">{customer.error.age}</p>
            )}

            <input
              type="text"
              placeholder="Address"
              className="input"
              value={customer.address}
              onChange={(e) => handleChange(index, "address", e.target.value)}
            />
            {customer.error.address && (
              <p className="error">{customer.error.address}</p>
            )}

            {customers.length > 1 && (
              <button
                type="button"
                onClick={() => removeCustomer(index)}
                className="removeBtn"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <button type="button" onClick={addCustomer} className="addBtn">
          + Add Customer
        </button>
        <button type="submit" className="submitBtn">
          Submit All
        </button>
      </form>
    </div>
  );
}