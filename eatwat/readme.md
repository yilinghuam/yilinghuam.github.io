# Eatwat - A restaurant tracking app

## Explanations of the technologies used
- Mapbox
Client side rendering of map. geocoding and tileset rendering used
- dotenv
To protect tokens used in mongoDB and Mapbox
- methodOverride
To allow for patch and delete 
- partials
To make ejs files neater
- cloudinary with express-fileupload

or 
multer with streamifier and cloudinary 
- 
## Approach taken
### 1. Initial start
- decide on the unknown factor of the project, the map api to be used
- read the documentation for the mapbox api and implement some functionalities gradually (at this point, only loading of the map and geosearching api)
- think of how to post the geosearching results to the backend

### 2. Creation of routes
- Create routes based on 7 restful routes
- adjust data as I go along
------------------------------------------

## RESTfulRoutes

|No.|Route      | URL               | HTTP Verb |Description
|--|------------|-------------------|-----------|------------ 
|1.| Index      |  /                | GET       | Homepage
|  |            |  /eats            | GET       | All EATS from database
|2.| New        |  /eats/new        | GET       | EATS record form
|3.| Create     |  /eats            | POST      | add new EAT to database
|4.| Show       |  /eats/:slug      | GET       | show individual EAT with map and image
|5.| Edit       |  /eats/:slug/edit | GET       | EAT edit form
|6.| Update     |  /eats/:slug      | PATCH     | update EAT
|7.| Delete     |  /eats/:slug      | DELETE    | delete EAT





------------------------------------------
unsolved problems
- slight delay in terms or uploading photos. Tried using streams but did not fix the time delay involved.

user stories

-----------------------------------------
notes to yourself 
- add border to active link in nav bar
- add circle line and downtown line to MRT_stations.js
- add validation for form
- fix fontawesome in dropdown
- add titles for edit and new form to segregate
- put form data in database and create form to edit and segregate etc
- complete mapsearch function and random
- add log in log out feature
- clean up image uploading codes
- 
