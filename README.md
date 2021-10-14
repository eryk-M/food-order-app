# Food Order App

> Burger House is company providing food. User can order food, track order through food tracker and participate in quizzes.
> Project was created to learn React.
> Live demo [_here_](https://www.food-order-eryk.netlify.app).

## Table of Contents

- [Technologies Used](#technologies-used)
- [Features](#features)
- [Screenshots](#screenshots)
- [Setup](#setup)
- [Project Status](#project-status)
- [Room for Improvement](#room-for-improvement)
- [License](#license)
- [Contact](#contact)

## Technologies Used

- React
- Styled Components
- Firebase
- Context API
- React Hooks
- React Hook Form + Yup
- React Beautiful DnD
- Framer motion

## Features

- Ordering food with cart
- Admin Panel
- Food tracker for users
- Firebase Authentication
- React drag & drop
- Changing order status from admin panel in real time thanks to firestore onSnapshot() method
- Ability to make quizzes from admin panel with coupons as prizes
- Discount codes
- Ability to add, edit and delete products with uploading images to firebase storage
- Adding reviews to products with star rating
- Top products section based on product popularity

## Screenshots

![Home page](./assets/images/screenshots/screenshot_1.jpg)
![Top products section](./assets/images/screenshots/screenshot_2.jpg)
![Products](./assets/images/screenshots/screenshot_3.jpg)
![Product item](./assets/images/screenshots/screenshot_4.jpg)
![User panel](./assets/images/screenshots/screenshot_5.jpg)
![Cart](./assets/images/screenshots/screenshot_6.jpg)
![Admin panel](./assets/images/screenshots/screenshot_7.jpg)

## Setup

### Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Project Status

Project is: _uncomplete_

## Room for Improvement

- add real time notifications in admin panel when order is placed (firebase functions)
- add newsletter
- connect google maps and geolocation to let user order food to actual location

## License

This website was built by eryk-M.
Copyright @ 2021 eryk-M. All Rights Reserved.
You are allowed to use it for both personal and commercial use, but not to claim it as your own project.

## Contact

Created by [@eryk-M](https://github.com/eryk-M) - feel free to contact me!
