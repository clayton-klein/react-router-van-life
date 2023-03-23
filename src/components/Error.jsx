import { useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError(); // for some reason I couldn't get the error object that should come from api.js, I spent a lot of time trying to find the reason of this bug, comparing my code with the original code from the instructor, but I just couldn't find it, so I just hard coded the error message bellow :/

  // console.log(error);
  
  return <h1>Error: Failed to fetch vans</h1>;
}
