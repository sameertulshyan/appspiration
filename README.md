# Appspiration

Check out the deployed application [here](https://morning-headland-55481.herokuapp.com/)

## Description

"I really want to use my skills as a software engineer to build something awesome ... I just need to figure out what 'something awesome' is!" - Every single software engineer, ever\* 

Here's the deal. I'm having a hard time thinking of *interesting* ideas for a web application. A fitness tracker? A restaurant finder? I can hear the sound of your eyes rolling into the back of your head. 

So, instead of waiting for some epic inspiration (I would probably still be waiting), I created a web application for developers to share their project ideas and solicit feedback from each other.  

<sub><sup>\*Disclaimer- sample size of 1 software engineer used to generalize entire community of thousands of professionals. I'm a software engineer, not a statistician.</sup></sub>

## Additional Information

This application was created using the **MERN** stack:
- **M**ongoDB
- **E**xpress.js
- **R**eact.js
- **N**ode.js

## Build Instructions

### Requirements
1. Nodejs 10.x
2. Npm 6.x

### Instructions

```bash
# Clone the repository onto your machine
git clone https://github.com/sameertulshyan/appspiration.git

# Change into the project directory
cd appspiration/

# Install dependencies for server
npm install

# Install dependencies for client
npm run client-install

# Run the client & server with concurrently
npm run dev

# Run the Express server only
npm run server

# Run the React client only
npm run client

# Server runs on http://localhost:5000 and client on http://localhost:3000
```

Note: in order to run this application locally, you will need to create a file named `keys.js` in the root level `config` folder.

Example `keys.js` file:

```js
module.exports = {
  mongoURI: 'YOUR_MONGO_URI',
  secretOrKey: 'YOUR_SECRET'
};
```
