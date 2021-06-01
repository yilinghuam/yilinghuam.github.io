# Eatwat - A restaurant tracking app

explanations of the technologies used

## Approach taken
### 1. Initial start
- decide on the unknown factor of the project, the map api to be used
- read the documentation for the mapbox api and implement some functionalities gradually (at this point, only loading of the map and geosearching api)
- think of how to post the geosearching results to the backend
------------------------------------------

## RESTfulRoutes

|No.|Route | URL             | HTTP Verb |Description
|--|-------|-----------------|-----------|------------ 
|1.| Index |  /              | GET       | Homepage
|  |       |  /eats          | GET       | All EATS from database
|2.| New   |  /eats/new      | GET       | EEATS record form



------------------------------------------
unsolved problems


user stories

-----------------------------------------
notes to yourself 
- new.ejs need to add option for file image upload.(consider if got third party web)
- need to hide coordinates and name of place
- limit geosearch to singapore using proximity and bbox