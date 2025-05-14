# Watchlog  
A full-stack web application that integrates a movies API to let users create custom movie lists, explore content, and join groups based on their favorite movies.  
Github repo: https://github.com/0xPorkchops/Watchlog

## Team Members

| Name | Github Handle | Contribution |
|------|---------------|--------------|
| Mantra Burugu | @mantraburger | Used React-Native, HTML, and CSS to create a UI framework for the project, worked on integrating the frontend with backend, project documentation |
| Samir Samara | @letmegetabyte | Worked on backend, setting up project structure, for express, helped develop the MongoDB schemas, and setup interfaces and classes for the OMDB API. |
| Duyen Tran | @Duyentn4 | Set up Clerk in the frontend, write package.json scripts in the backend, the frontend, and the root, update the theme, and project documentation |
| Peter Ye | @PeterYeee | Worked on the backend by setting up the mango database. Created the necessary structures, endpoints, and handlers that can be called to serve in-app features |
| Farhana Rahman | @Farhanarkive | Set up React Native, created the groups page using React Native Reusables, HTML and CSS , project documentation |

## Project Structure

Our project is cleanly divided into two main folders, front end and back end.  
The backend, located in the backend/ directory, is built with TypeScript and uses the Bun runtime, a JavaScript toolkit that includes a bundler and test runner to make programming and testing more efficient. The backend directory includes all server-side logic, such as database configuration (db.ts), API integration (movieAPI.ts), and user-related logic (userHandlers.ts). The Models/User.ts file defines the user schema or type, and the Express server is initialized in index.ts. This setup follows a modular structure that separates features and makes backend development easier to scale and maintain, as we can easily locate a feature for debugging. The frontend resides in frontend/watchlog/ and is built using React Native for Web via the Expo Router framework. It organizes screens into route-based directories like (auth), (home), and (tabs), and each folder contains layouts and pages for login, the homepage, and tabbed navigation respectively. The components/folder holds reusable UI elements such as collapsible sections, themed views, and buttons, while the hooks/ directory provides custom logic for handling themes and color schemes. Visual assets, such as fonts, are stored under assets/, and utility scripts like reset-project.js support project maintenance. Our primary language is TypeScript, which ensures type safety across both backend and frontend.  
Overall, the application is organized in a way that promotes clean separation of concerns, as each feature is located within its own file. This structure allowed our team to cleanly split the frontend and backend work, and easily integrate them later on. 

## Setup and Installation

Our application relies on Bun and React Native via Expo Router. In order to get the application running, the most important step is to ensure that these packages are properly installed on your local machine.  

### Setup Steps

1. Open VS Code (or any suitable virtual environment) and select New Terminal. Follow the instructions from https://git-scm.com/downloads to install Git, a tool which allows the user to clone the project onto their local machine. After following the instructions, verify that you have successfully installed Git by copying the following command into your terminal

```bash
git --version
```
If you successfully installed Git, this command should return the number of the Git version you have. 

2. Clone the repository onto your local machine by inputting the following commands into your terminal. This will download the full project and open it as a directory on your machine

```bash
git clone https://github.com/0xPorkchops/Watchlog.git
cd watchlog
```

3. Since Node.js is needed to run the backend and frontend portion of this project, the next step is to install Node.js.  
To download Node.js, please follow this link: https://nodejs.org/en.  
Then verify that you have successfully installed Node.js by using this command in your terminal

```bash
node --version
npm --version
```

4. We create a script in the root package.json for easier access. First, you need to install most packages we need for this project. By following this command

```bash
npm run install:all
```

5. Now, to set up the frontend, type:

```bash
cd frontend/watchlog
```
Then copy the following commands into the terminal. These commands will install all of the packages needed to run the web application 

```bash
npm install expo
npm install expo-router@~4.0.21 react@18.3.1 react-dom@18.3.1
```
6. Create a .env file in the same directory, and add the API key:
```bash
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_bGVnaWJsZS1sYWItNDEuY2xlcmsuYWNjb3VudHMuZGV2JA
```
7. Next, go back to the root directory, then cd backend. After that, copy the following commands to download ts-node

```bash
cd ../../backend
npm install ts-node --save-dev
```
8. Create a .env file in the backend directory, and add this key:
```bash
OMDB_KEY=75a69b90
```
9. Finally, after you downloaded all the packages, go back to the root directory. There are a few options you can do next: you can open the backend and frontend separately. If you want to open both, you can do the following command.

```bash
npm run dev:backend //Open backend
npm run dev:frontend //Open web
npm run dev //Both concurrently
```

### Alternative
If those commands do not work, you can manually run them.

**For the backend**:
```bash
cd backend
npm run index.ts
```

**Frontend**:
```bash
cd frontend/watchlog
npx expo start
```

Finally, enter `w` in your terminal to open up the web app in your web browser! Keep in mind that the website will take some time to load, especially if this is your first time opening the project. 

## Bugs, limitations, and shortcomings

In its current state, there are some flaws that are preventing the app from being where we would like it to be.  
During development, all features were split into branches and slowly merged. However, issues with merge conflicts left gaps with some of the merged features as the project’s complexity grew. This meant that some features were merged in but no longer work as the branches they were built on had not been updated during development to match main. Some of the UI for example, is missing features and components, including theming. There is also a placeholder groups page that was implemented, but because of merging issues and backend implementation issues it was missing from the demo.  
Additionally, not all branches were merged as the features were scrapped or incomplete. The MongoDB integration was not fully completed as there were issues during development that prevented all team members from connecting to the database.  
Lastly, issues with implementations, namely in the movie api and database structure, hindered development. For example, the OMDB API’s class functionality prevented certain features from being used, which might have eased frontend implementations for movie retrievals. Furthermore, the database structure and proposed functionality would have required ‘ghost’ items in the database that could be used to hydrate pages and user profiles.

## Attributions

We used the following tutorials during the development of our product:
- https://reactnative.dev/docs/images#network-requests-for-images
- https://reactnative.dev/docs/images#network-images
- https://medium.com/@rachelcantor/system-theme-support-with-nativewind-v4-and-react-native-reusables-08fed7ff4070
- https://www.mongodb.com/resources/languages/express-mongodb-rest-api-tutorial

## Future steps

While the foundation of our web app has been successfully set up with the Movies API and UI components, we were unable to finish implementing some features due to time constraints and unexpected problems, such as a group member unfortunately having to withdraw from the course. Some of our possible future feature updates include:

- Enabling users to join or leave interest-based movie groups
- Implementing a group messaging feature to allow members of similar interests to communicate with each other in real time
- Additional enhancements include a group activity status dashboard and a recommendation system that suggests movies based on a user's preferences and group trends
- User authentication to support secure sign-ups and logins

With more time, these features could provide a socially engaging movie discovery experience! Thank you for viewing our project!
