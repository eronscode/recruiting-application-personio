## Personio Frontend Test

An assignment to create a new and optimized version of a recruiting application.

## Libraries

- React
- TypeScript

## Packages

- react-router-dom
- react-select
- classnames
- react-content-loader

## Run this project locally

1. Download and Install Node JS from https://nodejs.org/en/download/
2. In the root project directory, type `yarn install` to install the project's dependencies.
3. Once installation is complete, type `yarn start` to start the project in your local browser. This will start up the full react application.

NOTE:
- If on entry of any files in the codebase and you get this error on imported modules e.g `Cannot find module 'classnames' or its corresponding type declarations.`, close your code editor and open again
- Ensure you're connected to the internet so data can load up.
- React.strict mode was temporarily removed in the project because in react 18, react.strict mode causes useEffect to run twice on development. This is doesn't happen in production so strict mode can be added before pushing to production. One hack will be to create a hook that runs useEffect once. Read more here: https://github.com/facebook/react/issues/24553 

You can start editing the page by modifying `pages/ViewApplications/index.js`.

## Features

1. Implemented fetching of data from the given endpoint with a re-usable hook `useFetch`. Errors and Loading states were also handled by this re-usable hook.
2. Displayed data from the API on the Table component.
3. Implement filtering and sorting in such a way that users can both sort by ascending/descending order and/or filter by multiple criterias with multiple values.
4. Made the URL changed every time sorting and/or filtering is applied.
## Codebase Improvements/Next Steps

- **Authentication**: Adding authenticaiton to the application to allow only authorized users view sensitive data.
- **Responsive**: Although the application is a little bit responsive, one improvement will be to make it very responsive.
- **Precommit Hooks**: Using precommit hooks like husky for linting, tests etc.
- **Deployment:** Implement CI/CD pipeline and continously deploy to a hosting server. CI/CD pipelines is important because it helps to minimize human error and maintain a consistent process for how software is released.

## Contact Info

Feel free to reach me on:

LinkedIn: https://www.linkedin.com/in/ose-matthew/

Email: osemu.matthew@gmail.com

Gracias
