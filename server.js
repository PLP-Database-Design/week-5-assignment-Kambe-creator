const express = require('express')
const app = express()


// Question 1 goes here
app.get('/patients', (req, res) => {
  const query = `SELECT patient_id, first_name, last_name, date_of_birth FROM patients`;

  db.query(query, (err, results) => {
      if (err) {
          console.error('Error retrieving patients:', err.message);
          res.status(500).send('Server Error');
          return;
      }
      res.json(results); // Send the results as JSON
  });
});

// Question 2 goes here
app.get('/providers', (req, res) => {
  const query = `SELECT first_name, last_name, provider_specialty FROM providers`;

  db.query(query, (err, results) => {
      if (err) {
          console.error('Error retrieving providers:', err.message);
          res.status(500).send('Server Error');
          return;
      }
      res.json(results); // Send the results as JSON
  });
});

// Question 3 goes here
app.get('/patients/by-first-name', (req, res) => {
  const { first_name } = req.query;

  if (!first_name) {
      return res.status(400).send('Please provide a first name to search for.');
  }

  const query = `SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?`;

  db.query(query, [first_name], (err, results) => {
      if (err) {
          console.error('Error retrieving patients by first name:', err.message);
          res.status(500).send('Server Error');
          return;
      }

      res.json(results);
  });
});

// Question 4 goes here
app.get('/providers/by-specialty', (req, res) => {
    const { specialty } = req.query; // Extract 'specialty' from query parameters

    // Validate that the specialty is provided
    if (!specialty) {
        return res.status(400).send('Please provide a specialty to search for.');
    }

    const query = `SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?`;

    // Query the database with the provided specialty
    db.query(query, [specialty], (err, results) => {
        if (err) {
            console.error('Error retrieving providers by specialty:', err.message);
            res.status(500).send('Server Error');
            return;
        }

        // Send results as JSON
        res.json(results);
    });
});

// listen to the server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`server is runnig on http://localhost:${PORT}`)
})