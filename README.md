# Natours App

## PART I: Building the API

### Database

Natours API has a cloud hosted MongoDB database behind for storing and performing CRUD operations on data. The connection is made through the mongoose driver.

### Architecture

Natours App is driven by a RESTful API - acronym for REpresentational State Transfer - a software architecture based on the next 5 key features:

- Separated into logical resources
- Exposes structured, resource-based URLs
- Uses HTTP methods as verbs for actions
- Sends data as JSON
- Is stateless

### MVC meets mongoose

Mongoose and Express have the right features to use the MVC architecture to structure the code
