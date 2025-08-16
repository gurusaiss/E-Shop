# GitHub Pages Deployment Guide

This Angular application is configured for automatic deployment to GitHub Pages.

## Automatic Deployment

The app will automatically deploy to GitHub Pages when you push to the `main` branch. The GitHub Actions workflow handles:

1. Installing dependencies
2. Building the Angular app for production
3. Deploying to GitHub Pages

## Manual Deployment Steps

If you need to deploy manually or troubleshoot:

### 1. Build for GitHub Pages
```bash
npm run build:gh-pages
```

### 2. Deploy to GitHub Pages
The built files will be in `dist/fusion-angular-tailwind-starter/browser/` directory.

## GitHub Pages Settings

Make sure your GitHub repository has the following settings:

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **GitHub Actions**
5. Your site will be available at: `https://yourusername.github.io/repository-name/`

## Troubleshooting

### Common Issues:

1. **Site shows README instead of app**: 
   - Make sure GitHub Pages source is set to "GitHub Actions"
   - Check that the workflow completed successfully
   - Verify the build output directory is correct

2. **Routing issues (404 on refresh)**:
   - The workflow automatically copies `index.html` to `404.html` to handle SPA routing
   - Ensure `.nojekyll` file exists in the public directory

3. **Build fails**:
   - Check that all dependencies are installed with `--legacy-peer-deps`
   - Verify the build command works locally: `npm run build:gh-pages`

4. **Assets not loading**:
   - Base href is set to `./` for relative paths
   - All assets should be in the `public` directory

## Repository Settings Required

1. **Enable GitHub Actions**: Repository → Settings → Actions → Allow all actions
2. **GitHub Pages Source**: Repository → Settings → Pages → Source: GitHub Actions
3. **Permissions**: Repository → Settings → Actions → Workflow permissions → Read and write permissions

## Local Testing

To test the production build locally:

```bash
npm run build:gh-pages
# Serve the dist folder with any static file server
npx http-server dist/fusion-angular-tailwind-starter/browser/
```
