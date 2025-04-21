#!/bin/bash

# Exit on errors
set -e

echo "Starting deployment process..."

# Ensure we have the latest dependencies
echo "Installing dependencies..."
npm install

# Build the project
echo "Building the project..."
npm run build

# Ensure dist directory exists
mkdir -p dist

# Copy deployment files
echo "Copying deployment configuration files..."
cp public/_redirects dist/ 2>/dev/null || echo "No _redirects file found"
cp public/_headers dist/ 2>/dev/null || echo "No _headers file found"
cp netlify.toml dist/ 2>/dev/null || echo "No netlify.toml file found"

echo "Deployment preparation complete!"

# Test the build locally
echo "Starting local preview server..."
npm run preview 