# GitHub OAuth Setup for Decap CMS

The site now uses **GitHub backend** with direct OAuth instead of Netlify Identity + Git Gateway.

## Required Steps

### 1. Create GitHub OAuth App

1. Go to https://github.com/settings/developers
2. Click **"New OAuth App"**
3. Fill in the details:
   - **Application name**: `KelsoCodes CMS`
   - **Homepage URL**: `https://kelsocodes.com`
   - **Authorization callback URL**: `https://kelsocodes.com/.netlify/functions/auth`
4. Click **"Register application"**
5. **Save the Client ID** (you'll need this)
6. Click **"Generate a new client secret"**
7. **Save the Client Secret** (you'll need this - won't be shown again!)

### 2. Configure Netlify Environment Variables

1. Go to Netlify dashboard: https://app.netlify.com/
2. Select your site: `tangerine-starship-1f42af` (or kelsocodes.com)
3. Go to **Site settings → Environment variables**
4. Add two variables:
   - **Name**: `GITHUB_OAUTH_CLIENT_ID`
     **Value**: [Your GitHub OAuth Client ID]
   - **Name**: `GITHUB_OAUTH_CLIENT_SECRET`
     **Value**: [Your GitHub OAuth Client Secret]
5. Click **"Save"**

### 3. Redeploy the Site

After adding environment variables:
1. Go to **Deploys** tab in Netlify
2. Click **"Trigger deploy"** → **"Clear cache and deploy site"**
3. Wait for deployment to complete

## How It Works

```
User visits /admin
  ↓
Decap CMS loads config.yml (GitHub backend)
  ↓
User clicks "Login with GitHub"
  ↓
Redirects to GitHub OAuth
  ↓
User authorizes the app
  ↓
GitHub redirects to: /.netlify/functions/auth?code=xxx
  ↓
Netlify function exchanges code for access token
  ↓
Returns token to Decap CMS
  ↓
CMS dashboard loads with full access
  ↓
User creates posts → Commits directly to GitHub → Netlify rebuilds
```

## Files Created/Updated

- `src/admin/config.yml` - Changed to GitHub backend
- `src/admin/index.html` - Removed Netlify Identity widget
- `netlify/functions/auth.js` - OAuth proxy function

## Testing

After setup:
1. Visit https://kelsocodes.com/admin
2. Click "Login with GitHub"
3. Authorize the OAuth app
4. Should redirect back to CMS dashboard
5. Create a test journal entry
6. Verify it commits to GitHub

## Security Notes

- **Never commit** the Client Secret to git
- Store it only in Netlify environment variables
- The OAuth function runs server-side, keeping secrets secure
- Client ID is public and safe to commit (it's in config.yml)

## Troubleshooting

**"OAuth credentials not configured"**
- Check Netlify environment variables are set correctly
- Redeploy after adding variables

**"Authorization failed"**
- Verify callback URL in GitHub OAuth app matches exactly:
  `https://kelsocodes.com/.netlify/functions/auth`
- Check Client ID and Secret are correct

**"Function not found"**
- Ensure `netlify/functions/auth.js` exists
- Check Netlify build logs to verify function deployed
