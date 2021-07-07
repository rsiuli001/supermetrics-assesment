# Getting Started with this app

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Login screen snapshot.

<img width="1141" alt="Screenshot 2021-07-08 at 2 37 24 AM" src="https://user-images.githubusercontent.com/62182948/124829101-c4cfb580-df95-11eb-8f06-30787e91fff5.png">

## Login screen with error.

<img width="1145" alt="Screenshot 2021-07-08 at 2 37 34 AM" src="https://user-images.githubusercontent.com/62182948/124829210-f21c6380-df95-11eb-9d11-358040d451d9.png">

## Post list screen.

<img width="1158" alt="Screenshot 2021-07-08 at 2 38 03 AM" src="https://user-images.githubusercontent.com/62182948/124829271-0a8c7e00-df96-11eb-90e7-683302f1e8e8.png">

## About

After the successful login the user is greeted with the Post Details page. 

The logged-in user can select a specefic user from the left panel and all the posts related to the selected user will be listed inside the right panel. The list of Posts are sortable (descending & ascending order) and searchable. Post list is searchable by Post ID, Post Type and Post Content.

The user list in the left panel is searchable by user-names only.

The logged-in users credential is chached locally in localStorage and token is valid for 60 mins only. After the token expiry if the user tries to open the app, or try to go to Post List page, the app will bring the user back to the login page.
