# GitHub Pages Deployment Guide

## Prerequisites

1. **GitHub Repository**: Make sure your code is pushed to a GitHub repository
2. **Repository Name**: Update the `repoName` in `itkz/next.config.ts` to match your GitHub repository name
3. **GitHub Pages**: Enable GitHub Pages in your repository settings

## Automatic Deployment (Recommended)

The project is configured with GitHub Actions for automatic deployment:

1. **Push to main/master branch**: The deployment will trigger automatically
2. **GitHub Actions**: The workflow file is located at `itkz/.github/workflows/deploy.yml`
3. **Live Site**: Your site will be available at `https://yourusername.github.io/ITKZ/`

## Manual Deployment

If you prefer manual deployment:

```bash
# From the workspace root
npm run deploy

# Or from the itkz directory
cd itkz
npm run build
```

## Configuration

### Update Repository Name

In `itkz/next.config.ts`, update the repository name:

```typescript
const repoName = "YOUR_REPOSITORY_NAME"; // Replace with your actual repo name
```

### GitHub Pages Settings

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Set **Source** to "GitHub Actions"
4. The site will be deployed automatically on push to main/master

## Project Structure

```
ITKZ/
├── itkz/                    # Next.js frontend
│   ├── .github/workflows/   # GitHub Actions
│   ├── src/                 # Source code
│   ├── public/              # Static assets
│   ├── next.config.ts       # Next.js configuration
│   └── package.json         # Frontend dependencies
├── backend/                 # Express backend (not deployed to GitHub Pages)
└── package.json            # Workspace configuration
```

## Important Notes

- **Static Export**: The app is configured for static export (`output: "export"`)
- **Image Optimization**: Disabled for GitHub Pages compatibility
- **Base Path**: Automatically configured for GitHub Pages subdirectory
- **Trailing Slash**: Enabled for GitHub Pages compatibility
- **.nojekyll**: Added to prevent Jekyll processing

## Troubleshooting

### Build Errors
- Check that all dependencies are installed: `npm run install:all`
- Verify Next.js configuration in `next.config.ts`

### Deployment Issues
- Ensure GitHub Actions has proper permissions
- Check the Actions tab in your GitHub repository for error logs
- Verify the repository name matches the config

### 404 Errors
- Make sure `basePath` in `next.config.ts` matches your repository name
- Check that GitHub Pages is enabled and configured correctly

## Development vs Production

- **Development**: Run `npm run dev` (no base path, full Next.js features)
- **Production**: Automatic static export with GitHub Pages configuration
