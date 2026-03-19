# Next Steps: Complete the CMS Setup

The Eleventy + Decap CMS migration is complete! Here's what you need to do to enable the full workflow.

## ✅ What's Done

- [x] Eleventy site structure created
- [x] All HTML converted to Nunjucks templates
- [x] Journal entry migrated to markdown with lesson shortcodes
- [x] Decap CMS admin interface added at /admin
- [x] Render deployment config updated
- [x] Code committed and pushed to GitHub

## 🔧 Required: GitHub OAuth Setup

To enable the CMS login, you need to set up GitHub OAuth:

### Step 1: Create GitHub OAuth App

1. Go to https://github.com/settings/developers
2. Click "New OAuth App"
3. Fill in the details:
   - **Application name**: `KelsoCodes CMS`
   - **Homepage URL**: `https://kelsocodes.com`
   - **Authorization callback URL**: `https://api.netlify.com/auth/done`
4. Click "Register application"
5. **Save the Client ID** (you'll need this)
6. Click "Generate a new client secret"
7. **Save the Client Secret** (you'll need this - it won't be shown again!)

### Step 2: Set up Netlify OAuth Gateway

Netlify provides a free OAuth gateway for GitHub authentication with Decap CMS:

1. Go to https://app.netlify.com/
2. Sign up/login (free account is fine)
3. Go to Site Settings > Access control > OAuth
4. Under "Install providers", select GitHub
5. Enter your **Client ID** and **Client Secret** from Step 1
6. Save

Alternatively, you can use Netlify's CLI:

```bash
netlify init
netlify sites:create
netlify addons:create github-oauth
```

## 📋 Testing the Full Workflow

Once OAuth is set up:

### Test 1: CMS Access
1. Visit https://kelsocodes.com/admin
2. Click "Login with GitHub"
3. Authorize the app
4. You should see the Decap CMS interface

### Test 2: Create Entry
1. Click "New Journal Entries"
2. Fill in the fields:
   - Entry Number: 2
   - Title: "Test Entry"
   - Date: (pick a date)
   - Date Display: "March 2026"
   - Subtitle: "Testing the CMS"
   - Body: Write something with a lesson:
     ```
     This is a test entry.

     {% lesson "Test Lesson" %}
     This is lesson content.
     {% endlesson %}
     ```
   - Tags: Add a few tags
3. Click "Publish"
4. This creates a git commit

### Test 3: Auto-Deploy
1. Check GitHub - you should see a new commit from the CMS
2. Check Render - it should trigger an automatic deployment
3. Wait for deployment to complete
4. Visit https://kelsocodes.com - your new entry should appear!

### Test 4: Email Form
1. Test the email subscription form
2. Submit an email
3. Check if Formspree receives it

## 🎯 Current Deployment Status

After pushing the code:
- ✅ Code is on GitHub: https://github.com/kellyloeppky-bit/kelso-codes
- 🔄 Render should be building now (check https://dashboard.render.com/)
- ⏳ Site will be live at https://kelsocodes.com after build completes

## 📖 Using the CMS

### Writing Lesson Blocks

Use this syntax in the markdown body:

```
{% lesson "01. Your Lesson Title" %}
Your lesson content here. Can be multiple sentences.
{% endlesson %}
```

### Entry Numbering

- Use sequential numbers: 1, 2, 3, etc.
- The site will automatically format them as "Entry 001", "Entry 002", etc.

### Tags

- Start tags with `#` (e.g., `#AI`, `#Python`)
- Add as many as you want
- They appear at the bottom of each entry

## 🚨 Important Notes

- **Client Secret**: Never commit this to git! It's used only in Netlify's OAuth setup
- **Client ID**: This is public and safe to commit (already in src/admin/config.yml)
- **Backup**: All entries are markdown files in git - you have full version control

## 🔍 Troubleshooting

### CMS won't load
- Check that the Render build succeeded
- Check browser console for errors
- Verify /admin/config.yml has correct repo name

### Can't login
- Make sure GitHub OAuth app is created
- Verify callback URL is exactly `https://api.netlify.com/auth/done`
- Check that Netlify OAuth gateway is configured

### Entry doesn't appear
- Check that the entry was published (not just saved)
- Verify the git commit was pushed
- Check Render deployment logs
- Make sure entryNumber is unique

## 📚 Documentation

- Full setup instructions: See README.md
- Eleventy docs: https://www.11ty.dev/
- Decap CMS docs: https://decapcms.org/docs/intro/

## 🎉 What You Can Now Do

Once setup is complete:

1. **Write** - Login to /admin and create journal entries
2. **Preview** - See how it looks before publishing
3. **Publish** - One click to commit and deploy
4. **Relax** - No manual git commands, no SSH, no build commands
5. **Share** - Send the live URL to subscribers

The workflow is now: **Write → Publish → Auto-Deploy → Live**

## Questions?

If anything doesn't work:
1. Check Render deployment logs
2. Check browser console
3. Check GitHub commits
4. Review the README.md

Happy writing! 🚀
