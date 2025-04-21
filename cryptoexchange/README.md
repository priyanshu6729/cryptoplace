# CryptoExchange

A cryptocurrency price tracker application that allows users to search and view detailed information about various cryptocurrencies.

## Features

- View top cryptocurrencies and their market data
- Search for specific cryptocurrencies
- View detailed information about each cryptocurrency
- Interactive price charts
- Support for multiple currencies (USD, EUR, INR)

## Local Development

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Development Server

```bash
# Start the development server
npm run dev
```

## Building for Production

```bash
# Build the project
npm run build

# Preview the production build locally
npm run preview
```

## Deployment

### Automatic Deployment

Use the included deployment script:

```bash
./deploy.sh
```

### Manual Deployment Steps

1. Build the project:

   ```bash
   npm run build
   ```

2. The build process will automatically copy necessary configuration files:

   - `_redirects` for client-side routing support
   - `_headers` for CORS configuration
   - `netlify.toml` for deployment configuration

3. Deploy the `dist` folder to your hosting service (Netlify, Vercel, etc.)

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
VITE_COINGECKO_API_KEY=your_api_key_here
VITE_API_BASE_URL=https://api.coingecko.com/api/v3
```

## Troubleshooting Common Deployment Issues

### API Connection Issues

If you're experiencing API connection issues in the deployed environment:

1. Check that CORS is properly configured in the `_headers` file
2. Verify your API key is correctly set in the environment variables
3. Try the fallback API endpoints without an API key

### Client-Side Routing Issues

If routes other than the home page return 404 errors:

1. Ensure the `_redirects` file is properly copied to the `dist` folder
2. Check that your hosting service supports SPA redirects
3. For Netlify, verify the `netlify.toml` file has the correct redirect rules

## License

ISC
