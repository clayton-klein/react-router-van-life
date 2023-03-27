import React from "react";
import {
  useLoaderData,
  useActionData,
  useNavigation,
  Form,
  redirect,
} from "react-router-dom";
import "../../styles/Login.css";
import { loginUser } from "../../api";

// an action or loader function can receive an object with 2 properties (request and params).
// request = a fetch request instance being made to your app.
// params = route params are parsed from dynamic segments and passed to your action/loader (through the URL). This is useful for figuring out which resource to mutate/load.

export function loader({ request }) {
  return new URL(request.url).searchParams.get("message") || null;
}

export async function action({ request }) {
  const formData = await request.formData(); // this is an async operation, that's why we need "await" here.
  const email = formData.get("email");
  const password = formData.get("password");
  const pathName =
    new URL(request.url).searchParams.get("redirectTo") || "/host";

  try {
    await loginUser({ email, password }); // this is an async operation, that's why we need "await" here.

    localStorage.setItem("loggedin", true);

    return redirect(pathName); // this should redirect me to the /host route after logging in, but for some reason it's not working.
  } catch (error) {
    return error.message;
  }
}

export default function Login() {
  const navigation = useNavigation();
  const message = useLoaderData();
  const errorMessage = useActionData();

  return (
    <div className="login-container">
      {message && <h3 className="red">{message}</h3>}
      {errorMessage && <h3 className="red">{errorMessage}</h3>}

      <h1>Sign in to your account</h1>

      {/* in this case the "replace" attribute/prop in the Form is used so the user don't come back to the login page, after being logged in, if he uses the broswer's back button */}
      <Form method="POST" className="login-form" replace>
        <input name="email" type="email" placeholder="Email address" />
        <input name="password" type="password" placeholder="Password" />
        {/* if the condition bellow is true the btn will be disabled */}
        <button disabled={navigation.state === "submitting"}>
          {navigation.state === "submitting" ? "Logging in..." : "Log in"}
        </button>
      </Form>
    </div>
  );
}
