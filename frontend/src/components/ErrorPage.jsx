import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);
  return (
    <div className="border-black border border-3 min-h-screen flex flex-col justify-center items-center gap-y-4 bg-slate-300">
      <h1 className="text-6xl font-bold text-orange-500	">Oops!</h1>
      <p className="font-medium ">Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
