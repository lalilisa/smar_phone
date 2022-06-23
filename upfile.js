const data = [
  { id: 1, name: 'Alan Wake', age: 21, city: 'New York' },
  { id: 2, name: 'Steve Rogers', age: 106, city: 'Chicago' },
  { id: 3, name: 'Tom Hanks', age: 47, city: 'Detroit' },
  { id: 4, name: 'Ryan Burns', age: 16, city: 'New York' },
  { id: 5, name: 'Jack Ryan', age: 31, city: 'New York' },
  { id: 6, name: 'Clark Kent', age: 34, city: 'Metropolis' },
  { id: 7, name: 'Bruce Wayne', age: 21, city: 'Gotham' },
  { id: 8, name: 'Tim Drake', age: 21, city: 'Gotham' },
  { id: 9, name: 'Jimmy Olsen', age: 21, city: 'Metropolis' },
  { id: 10, name: 'Ryan Burns', age: 21, city: 'New York' },
  ];


const express = require('express');

// Initialize App
const app = express();

// Assign route
app.use('/', (req, res, next) => {
const filters = req.query;
const filteredUsers = data.filter(user => {
	let isValid = true;
	for (key in filters) {
	console.log(key, user[key], filters[key]);
	isValid = isValid && user[key] == filters[key];
	}
	return isValid;
});
res.send(filteredUsers);
});

// Start server on PORT 5000
app.listen(5000, () => {
console.log('Server started!');
});
