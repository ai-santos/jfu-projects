features left to complete Justice For Us:

1. Search functionality 
    - fuzzy search the database and return any results 
2. Build a function that adds data markers to the map API 
    - create the data marker 
    - make the ajax request to get the data from the backend
    - loop through the data and get the address property
    - convert the address property into a lat and long
3. Use a geocoding function that converts the address into a lat long
    - pass the address into a geocoder that will return a lat long
    - pass the lat long into the addMarker function
    - call the addMarker function
4. Adding data allows you to add a marker to the map and data to the database
    - on form submit the data passed should create a marker and add that marker to the map
5. When a user searches for a keyword in the database it should change the map's view to show the results of the search