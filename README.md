# Course Directory - Full Stack Application
A simple course directory application that allows users to interact with a database to different degrees based on authorization status.

API developed with [Express](https://expressjs.com/)

Client side webpage developed with [React](https://reactjs.org)

## Features

### Authorization
All users can access the list of courses, only users with an account can create courses, and only the user who created a specific course will be able to update or delete that course.

### Persistent Cookies
User authorization credentials are stored in local cookies allowing for convenient navigation and making requests that require authorization.

### Conditional Routing
Navigating to a route that requires an authenticated user will redirect the user to the sign in page and upon successful authentication, navigate back to the page initially requested.

If an authenticated user navigates to a route for which they do not have permission (e.g. updating a course that another user created), they are redirected to the `/forbidden` route.

### Markdown Parsing
When creating or updating a course, the description field and the materials field allow users to input markdown which will be interpreted when the `CourseDetail` page is rendered.

### Loading indicators
The buttons for signing in and creating or updating courses will display different text and be disabled after clicking to avoid making two http requests at the same time.

## How to Test
1. navigate to the `API` folder in a console and type `npm install`
2. do the same in the `client` folder
3. for both foldrs run the command `npm start`
4. If a browser window does not automatically open, navigate to [`localhost:3000`](http://localhost:3000)

Thanks for checking out my project!