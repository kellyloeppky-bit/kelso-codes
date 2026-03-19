// Netlify serverless function for GitHub OAuth callback
// This proxies the OAuth flow between Decap CMS and GitHub

exports.handler = async (event) => {
  const { code } = event.queryStringParameters || {};

  if (!code) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'No code provided' })
    };
  }

  // GitHub OAuth token endpoint
  const tokenEndpoint = 'https://github.com/login/oauth/access_token';

  // These should be set as Netlify environment variables
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'OAuth credentials not configured' })
    };
  }

  try {
    // Exchange code for access token
    const response = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code: code
      })
    });

    const data = await response.json();

    if (data.error) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: data.error_description || data.error })
      };
    }

    // Return the access token to Decap CMS
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html'
      },
      body: `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Authorization Complete</title>
        </head>
        <body>
          <script>
            // Send token back to Decap CMS
            if (window.opener) {
              window.opener.postMessage(
                'authorization:github:success:${JSON.stringify(data)}',
                window.location.origin
              );
              window.close();
            }
          </script>
          <p>Authorization complete. You can close this window.</p>
        </body>
        </html>
      `
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
