import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { Issuer, generators } from 'openid-client';
import './utils/response/successResponse';
import { errorHandler } from './middleware/errorHandler';
import routes from './routes';
import { ssoLogin } from './controllers/auth';
import { OAuthUserInfo } from './types/oauth/userInfo';
export const app = express();

const corsOptions = {
  origin: process.env.APP_URL,
  credentials: true,
};

const getClient = async () => {
  const issuer = await Issuer.discover(process.env.OAUTH2_ISSUER);
  return new issuer.Client({
    client_id: process.env.OAUTH2_CLIENT_ID,
    client_secret: process.env.OAUTH2_CLIENT_SECRET,
    redirect_uris: [process.env.OAUTH2_CALLBACK_URL],
    grant_types: ['authorization_code'],
    response_types: ['code'],
  });
};
let code_verifier = '';
let nonce = '';
app.get('/sso', async (req, res) => {
  const client = await getClient();
  nonce = generators.nonce();
  code_verifier = generators.codeVerifier();
  const code_challenge = generators.codeChallenge(code_verifier);

  const authorizationUrl = client.authorizationUrl({
    scope: 'openid profile email',
    nonce,
    code_challenge,
    code_challenge_method: 'S256',
  });
  res.redirect(authorizationUrl);
});

app.get('/authorization-code/callback', async (req, res) => {
  try {
    const client = await getClient();
    const params = client.callbackParams(req);
    const tokenSet = await client.callback(process.env.OAUTH2_CALLBACK_URL, params, {
      code_verifier,
      nonce,
    });
    const queryParams = new URLSearchParams();
    queryParams.append('access_token', tokenSet.access_token);
    res.redirect(`/redirect-sso?${queryParams.toString()}`);
  } catch (error) {
    res.send('Unknown error');
  }
});

app.get('/redirect-sso', async (req, res) => {
  const ssoAccessToken = req.query.access_token;
  if (ssoAccessToken) {
    const client = await getClient();
    const userInfo = await client.userinfo(ssoAccessToken.toString());
    const { user, accessToken, expiration, refreshToken } = await ssoLogin(userInfo as OAuthUserInfo);
    const redirectionURL = new URL('/login', process.env.APP_URL);
    redirectionURL.searchParams.append('access_token', accessToken);
    redirectionURL.searchParams.append('expiration', expiration.toString());
    redirectionURL.searchParams.append('refreshToken', refreshToken);
    console.log('User response:', user, redirectionURL);
    res.status(302).header('Location', redirectionURL.toString()).send();
  } else {
    res.send('Unknown error');
  }
});

app.use(
  urlencoded({
    extended: true,
  }),
);
app.use(json());
app.use(cookieParser());
if (process.env.NODE_ENV !== 'production') {
  app.use(cors(corsOptions));
}

app.use('/', routes);
app.use(errorHandler);
