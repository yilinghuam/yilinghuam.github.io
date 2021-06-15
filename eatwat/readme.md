# Eatwat - A restaurant tracking app

## User Story
“As a foodie frequenting a multitude of restaurants, I desire an effortless way of recording my ventures, to curate a list of delectable food that I personally savor.”

----------------------------------

## Technologies
- **Mapbox** Client side rendering of map, geocoding search and tileset rendering used
- **dotenv** To protect tokens used in mongoDB and Mapbox
- **methodOverride** To allow for patch and delete 
- **partials** Used to make ejs files neater
- **multer** handles multi-part form processing and image processing
- **streamifier** opens up streams to upload image directly
- **cloudinary** Cloud Storage for storage of image files and generate image URL
- **bcrypt** Used to hash passwords
- **express-session** For creating session-cookies and storing user information

## Experimented 
- **cloudinary with express-file-upload**
- wireframing using **justinmind**
- multiple models

-----------------------------

## Approach
* read up on documentation for mapbox and geocoding search and testing of mapbox functions
* wireframing
* setting up database structure
* set up mvc structure with crud routes
* add form information into database
* testing of upload function with multer and cloudinary
* build mapsearch pages
* build routes to edit database form information
* create login/logout/authentication/authorisation
* add services layer
* test out validations
* final check
* deploy on Heroku


## Initial Wireframes
* Index page with all eats
<img src="public/wireframes/index.png" width="500px"/>
* Show single eat
<img src="public/wireframes/showCard.png" width="500px"/>
* Form for adding new eats
<img src="public/wireframes/addNew.png" width="500px"/>
* Form for map search
<img src="public/wireframes/mapsearch-before.png" width="500px"/>
* Show restaurants after mapsearch
<img src="public/wireframes/mapsearch-after.png" width="500px"/>
* Show random recommendations
<img src="public/wireframes/random.png" width="500px"/>
* Add restaurants to try 
<img src="public/wireframes/try.png" width="500px"/>

------------------------------------------
## Database structure
* **FormData** Model Tree Structures with Child References
* **MRT** Model Tree Structures with Parent References
* **Eats** Model Tree Structures with Parent References

## RESTful Routes

|No.|Route      | URL                   | HTTP Verb |Description
|--|------------|-----------------------|-----------|------------ 
|1.| Index      |  /                    | GET       | Homepage
|  |            |  /eats                | GET       | All EATS from database
|  |            |  /mapsearch           | GET       | map search form
|  |            |  /dashboard           | GET       | admin rights to form data(ratings,price, category and mrt)
|  |            |  /users/login         | GET       | login form
|  |            |  /users/logout        | GET       | logout then redirect
|2.| New        |  /eats/new            | GET       | EATS record form
|  |            |  /dashboard/:cat/new  | GET       | form to add formdata
|  |            |  /users/signup        | GET       | form to add user
|3.| Create     |  /eats                | POST      | add new EAT to database
|  |            |  /mapsearch           | POST      | get MRT from map search then redirect
|  |            |  /users/signup        | POST      | add new user 
|  |            |  /dashboard/:cat      | POST      | add new formdata to database
|  |            |  /users/login         | POST      | create user session
|4.| Show       |  /eats/:slug          | GET       | show individual EAT with map and image
|  |            |  /eats/random         | GET       | show four random eats
|  |            |  /mapsearch/:mrt      | GET       | map search according to mrt
|  |            |  /dashboard/:cat      | GET       | show data for each category
|5.| Edit       |  /eats/:slug/edit     | GET       | EAT edit form
|  |            |  /dashboard/:cat/:item/edit | GET       | edit formdata
|6.| Update     |  /eats/:slug          | PATCH     | update EAT
|  |            |  /dashboard/:cat/:item| PATCH     | update formdata
|7.| Delete     |  /eats/:slug          | DELETE    | delete EAT
|  |            |  /dashboard/:cat/:item| DELETE    | delete EAT



------------------------------------------
## Unsolved
* slight delay in terms or uploading photos. Tried using streams but did not fix the time delay involved.
* fontawesome in dropdown options not showing

## Possible Improvements
* include uploading of image via url
* prevent one and two star ratings restaurant from appearing in random
* add lazy loading
* add index, show, add, delete routes for user
* allow admin to see all user eats
* add a 'to try' section (simple list)

-----------------------------------------
notes to yourself 
- add email api
- allow for reset of password?
- reseed form data and mrt data before deploying on heroku
