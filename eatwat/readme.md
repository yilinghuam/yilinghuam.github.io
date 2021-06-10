# Eatwat - A restaurant tracking app

## Technologies
- **Mapbox** Client side rendering of map, geocoding search and tileset rendering used
- **dotenv** To protect tokens used in mongoDB and Mapbox
- **methodOverride** To allow for patch and delete 
- partials
To make ejs files neater
- cloudinary with express-fileupload

or 
multer with streamifier and cloudinary 
- 

## Approach
* read up on documentation for mapbox and geocoding search and test
* set up mvc structure with crud routes
* add form information into database
* build mapsearch pages

------------------------------------------

## RESTful Routes

|No.|Route      | URL               | HTTP Verb |Description
|--|------------|-------------------|-----------|------------ 
|1.| Index      |  /                | GET       | Homepage
|  |            |  /eats            | GET       | All EATS from database
|  |            |  /mapsearch       | GET       | map search form
|2.| New        |  /eats/new        | GET       | EATS record form
|3.| Create     |  /eats            | POST      | add new EAT to database
|  |            |  /mapsearch       | POST      | get MRT from map search then redirect
|4.| Show       |  /eats/:slug      | GET       | show individual EAT with map and image
|  |            |  /eats/random     | GET       | show four random eats
|  |            |  /mapsearch/:mrt  | GET       | map search according to mrt
|5.| Edit       |  /eats/:slug/edit | GET       | EAT edit form
|6.| Update     |  /eats/:slug      | PATCH     | update EAT
|7.| Delete     |  /eats/:slug      | DELETE    | delete EAT



------------------------------------------
## Unsolved
* slight delay in terms or uploading photos. Tried using streams but did not fix the time delay involved.

user stories

-----------------------------------------
notes to yourself 
- add border to active link in nav bar
- add validation for form
- fix fontawesome in dropdown
- add titles for edit and new form to segregate
- put form data in database and create form to edit and segregate etc
- complete random
- add log in log out feature
- clean up image uploading codes
