## The Image Processing API
The API works by sending a get request to the endpoint

    /api/images?filename={file_name}&width={width}&height={height}
Where {file_name} should be a valid file name in the **assets/full** folder
The first time an image is requested, the image is processed and resized, saved in the thumbs folder which is cached, and served to the client. Every consequent get request will check whether the cached image is of required width and height, and it is served or re processed accordingly.
## Scripts 

To start the application in development mode run:

    npm run start
  To execute the prettier script run:
  
    npm run prettier
   To execute the eslint script run:
   

    npm run lint
   To **only** build the application run:
   

    npm run build
   To **only** test the **already built** application run:
   

    npm run jasmine
   To build the application and test it run:
   

    npm run test
   To build the application and run the production version run:
   

    npm run prod

 

## File structure

* **Routing**
The routes folder contains the **index.ts** file which is the wrapper for the **/api** route. It contains the folder images which is the wrapper for the **/images** route inside the **/api**
* **Controller**
The utilities folder contains the validation middleware and the image processing function in the files **validation.ts** and **serveImage.ts**, respectively.
* **Testing**
The test specs are in the **src/tests** folder. 

## Unit Tests

There are two testing suites: one for the routing and one for the image processing.
- The routing test suite contains 3 specs to test for the error handling and the successful image serving
- The image processing spec tests for the error handling in case of a non-existing filename.

