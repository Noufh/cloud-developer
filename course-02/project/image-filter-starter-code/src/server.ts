import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

 
  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]  

  app.get( "/filteredimage/", async ( req, res ) => {
    // validate the image_url query
    let { image_url } = req.query;

    if (image_url){
   
  // call filterImageFromURL(image_url) to filter the image
    const filtered_image  = await filterImageFromURL(image_url);
    
     image_url= filtered_image; 

  // send the resulting file in the response
     res.sendFile(filtered_image); 

  // deletes any files on the server on finish of the response
  if (res.finished) {
    deleteLocalFiles(image_url); } }

    // res.on('finish', function() {
      //deleteLocalFiles(image_url); } ) }

      else  {
        return res.status(400).send({ message: 'No image Found'})  }

      } );
  

  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();