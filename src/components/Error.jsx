import { useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError(); // for some reason I couldn't get the error object that should come from api.js, I spent a lot of time trying to find the reason of this bug comparing my code with the original code from the instructor, but I couldn't find it, so I just hard coded the error message bellow :/

  // to force an error uncomment line 82 of server.js and comment line 83.

  // to see the object that should return from api.js on console...
  console.log(error);
  
  return <h1>Error: Failed to fetch vans</h1>;
}
