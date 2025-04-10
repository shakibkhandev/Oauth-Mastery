# Next Auth V5 Beta Integration Guide

This guide walks you through setting up Next Auth V5 Beta in your Next.js project.

## Introduction

[Next Auth](https://authjs.dev/getting-started/installation?framework=Next.js) is a complete authentication solution for your Next.js applications. This guide covers the installation and configuration of Next Auth V5 Beta.

## Installation

Install Next Auth V5 Beta using one of the following commands:

```bash
# Using bun
bun add next-auth@beta

# Using npm
npm install next-auth@beta

# Using yarn
yarn add next-auth@beta

# Using pnpm
pnpm add next-auth@beta
```

Generate a secret key for your authentication:

```bash
npx auth secret
```

## Configuration

You'll need to configure the following files:

1. `/src/auth.js` - Core authentication configuration
2. `/src/app/api/auth/[...nextauth]/route.ts` - API route handler
3. `/middleware.js` - Middleware for protected routes

## OAuth Provider Setup

### Google OAuth Setup

1. Set up your callback URL: `http://localhost:3000/api/auth/callback/google`
2. In Production It Will change like: `https://example.com/api/auth/callback/google`
3. Add this URL to the Google Cloud Console under Redirect URIs
4. Important: When going to production, publish your app from Google Cloud Console:
   - Navigate to Audience section
   - Click on "Publish App"

### GitHub OAuth Setup

1. Set up your callback URL: `http://localhost:3000/api/auth/callback/github`
2. Create a new OAuth app on GitHub:
   - Go to GitHub → Settings → Developer Settings (at the bottom) → OAuth Apps
   - Click "New OAuth App"
   - Fill in the following details:
     - Application Name: Your app name (e.g., "Testing")
     - Homepage URL: `http://localhost:3000`
     - Application description: (Optional)
     - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
     - But In Production It Will change like: `https://example.com/api/auth/callback/github`

## Next Steps

After completing the setup above, you can:

1. Create sign-in, sign-out, and sign-up pages
2. Implement protected routes using the middleware
3. Access authentication state in your components

For more detailed information, refer to the [Next Auth documentation](https://authjs.dev/getting-started/installation?framework=Next.js).#   f r o n t e n d 
 
 
