# Austin SDK for Node.js

Hey there! Welcome to the Austin SDK authentication helper. This little library makes it super easy to connect your Node.js apps with our awesome auth system.

## What's this all about?

If you're building an app that needs to authenticate users through auth, this SDK handles all the OAuth for you.

## Getting Started

First, grab the package:

```bash
npm install @austinsdk/auth
```

Then you're ready to go:

```javascript
const Auth = require('@austinsdk/auth');

// Set up your auth client with your app's credentials
const auth = new Auth(
    'https://auth.austinsdk.me',        // The auth server URL
    'your-client-id',                   // Your app's client ID
    'your-client-secret',               // Your app's client secret (keep this safe!)
    'https://yourapp.com/callback'      // Where users get sent after auth
);
```

## How to use it

### Step 1: Send users to login

When someone wants to log into your app, redirect them to the auth URL:

```javascript
// This creates a URL that sends users to Austin's login page
const authUrl = auth.getAuthUrl();

// Optional: use a different redirect URL for this specific request
const customAuthUrl = auth.getAuthUrl('https://yourapp.com/special-callback');

console.log('Send your user here:', authUrl);
```

### Step 2: Exchange the code for a token

After users log in, they'll be redirected back to your app with a special code. Trade that code for an access token:

```javascript
// Assuming you got the code from the URL parameter
const code = 'the-code-from-the-redirect';

try {
    const tokenResponse = await auth.codeForToken(code);
    console.log('Got a token!', tokenResponse.access_token);
} catch (error) {
    console.log('Oops, something went wrong:', error);
}
```

### Step 3: Do cool stuff with the token

Now you can get user info and their projects:

```javascript
const token = tokenResponse.access_token;

// Get info about the logged-in user
const userInfo = await auth.getUserInfo(token);
console.log('Hello,', userInfo.name || userInfo.username);

// Get their projects
const projects = await auth.getProjects(token);
console.log(`You have ${projects.length} projects!`);

// Check if the token is still valid
const verification = await auth.verify(token);
if (verification.valid) {
    console.log('Token looks good!');
} else {
    console.log('Time to refresh that token...');
}
```

## API Reference

### `new Auth(url, client_id, client_secret, redirect_uri)`

Creates a new authentication client.

- **url**: The base URL for Austin's auth server
- **client_id**: Your application's client ID
- **client_secret**: Your application's client secret (keep this secure!)
- **redirect_uri**: Where users should be sent after authentication

### `auth.getAuthUrl(redirect_uri?)`

Returns the URL to send users to for authentication.

- **redirect_uri** (optional): Override the default redirect URI

### `auth.codeForToken(code, redirect_uri?)`

Exchanges an authorization code for an access token.

- **code**: The authorization code from the callback
- **redirect_uri** (optional): Must match the one used in getAuthUrl

### `auth.getUserInfo(token)`

Gets information about the authenticated user.

- **token**: The access token

### `auth.getProjects(token)`

Gets the user's projects.

- **token**: The access token

### `auth.verify(token)`

Checks if a token is valid.

- **token**: The access token to verify

## Requirements

- Node.js 14 or higher
- An application registered with Austin's platform

## Getting Help

Something not working? Found a bug? Have a question?

- [Open an issue](https://github.com/AustinSDK/npm-austinsdk.js/issues)
- Check out the [Austin SDK documentation](https://austinsdk.me/docs)

## License

MIT License - feel free to use this in your projects!

---

Made with ❤️ by Austin's SDK