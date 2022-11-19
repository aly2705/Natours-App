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

Mongoose and Express have the right features to facilitate the use of the MVC architecture for structuring the code. Code is split in:

- app.js (that keeps the code for the express app) and server.js (entry point that makes the api run - connects to db and starts the server)
- routes directory: keeps the routes and the routing for the available resources/methods in the api
- controllers directory: every api action for a certain resource has its own handler kept in a controller => this is where CRUD operations are performed
- models directory: every resource in a database has a schema and a model based on the schema
