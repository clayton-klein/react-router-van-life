import { redirect } from "react-router-dom";

// the idea with this function was to create a protected route, but for some reason it's not working :/

// using async just to pretend that it's a asynchronous function
export async function requireAuth() {
  // force user to be redirected to the login page
  const isLoggedIn = false;

  if (!isLoggedIn) {
    throw redirect("/login?message=You must log in first");
  }

  return null;
}
