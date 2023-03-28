import { redirect } from "react-router-dom";

// the idea with this function was to create a protected route, but for some reason it's not working :/

// using async just to pretend that it's a asynchronous function
export async function requireAuth(request) {
  // console.log(request);
  const pathName = new URL(request.url).pathname;
  const isLoggedIn = localStorage.getItem("loggedin");

  if (!isLoggedIn) {
    // it should be throw instead of return, but if I use throw the app breaks at the Host route (that was supposed to be protected) and idk why :/ itś like the redirect function just don't work!
    return redirect(`/login?message=You must log in first.&redirectTo=${pathName}`);
  }

  return null;
}
