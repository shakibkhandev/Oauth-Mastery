# Firebase OAuth Project Setup Guide

## Initial Setup

1. **Create a Firebase Account**
   - Go to the [Firebase Console](https://console.firebase.google.com/)
   - Sign up or log in with your Google account
   - Create a new project

2. **Add a Firebase App**
   - From your project dashboard, click "Add app"
   - Select the web platform (</>) 
   - Register your app with a nickname (e.g., "Testing")
   - Follow the setup instructions provided

## Configure Authentication

1. **Enable Google Authentication**
   - Navigate to **Authentication** in the left sidebar
   - Click **Get Started**
   - Go to the **Sign-in method** tab
   - Find **Google** in the provider list
   - Click **Enable** and **Save**

2. **Enable GitHub Authentication**
   - In the same **Sign-in method** section, find **GitHub**
   - Click **Enable**
   - You'll need to create a GitHub OAuth App:
     - Go to [GitHub Developer Settings](https://github.com/settings/developers)
     - Create a new OAuth App
     - Copy the **Client ID** and **Client Secret** to Firebase
     - Copy the **Redirect URL** from the Firebase GitHub modal
     - Paste the Redirect URL in your GitHub Developer Portal App settings
     - Save your changes

## Project Implementation

1. **Create a Web App in Firebase**
   - Go to the **Project** section in Firebase console
   - Click **Add app** if you haven't already
   - Follow the setup instructions

2. **Install Firebase SDK**
   ```bash
   npm install firebase
   ```

3. **Configure Firebase in Your Project**
   - Create a file at `/src/lib/firebase.js`
   - Add the SDK configuration code provided by Firebase:

   ```javascript
   // Import the functions you need from the SDKs you need
   import { initializeApp } from "firebase/app";
   import { getAuth, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";

   // Your web app's Firebase configuration with NEXT_PUBLIC_ prefix
   const firebaseConfig = {
   apiKey: process.env.NEXT_PUBLIC_API_KEY,
   authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
   projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
   storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
   messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
   appId: process.env.NEXT_PUBLIC_APP_ID,
   measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
   };

   // Initialize Firebase
   const app = initializeApp(firebaseConfig);

   export const auth = getAuth(app);
   export const googleProvider = new GoogleAuthProvider();
   export const githubProvider = new GithubAuthProvider();

   ```

## Next Steps

After completing the above setup, you can implement authentication in your application using Firebase's authentication methods. For example:

- Google sign-in
- GitHub sign-in
- Email/password authentication
- Phone authentication

Refer to the [Firebase Authentication documentation](https://firebase.google.com/docs/auth) for detailed implementation guides.