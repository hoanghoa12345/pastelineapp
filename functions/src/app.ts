import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { Issuer, generators } from 'openid-client';
import './utils/response/successResponse';
import { errorHandler } from './middleware/errorHandler';
import routes from './routes';
import session from 'express-session';
import { ssoLogin } from './controllers/auth';
import { OAuthUserInfo } from './types/oauth/userInfo';
export const app = express();

const corsOptions = {
  origin: process.env.APP_URL,
  credentials: true,
};

app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
  }),
);

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

app.get('/sso', async (req, res) => {
  const client = await getClient();
  const nonce = generators.nonce();
  const code_verifier = generators.codeVerifier();
  const code_challenge = generators.codeChallenge(code_verifier);
  req.session.code_verifier = code_verifier;
  req.session.nonce = nonce;
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
      code_verifier: req.session.code_verifier || '',
      nonce: req.session.nonce || '',
    });
    const userInfo = await client.userinfo(tokenSet.access_token);
    const { user, accessToken, expiration, refreshToken } = await ssoLogin(userInfo as OAuthUserInfo);
    const redirectionURL = new URL('/login', process.env.APP_URL);
    redirectionURL.searchParams.append('access_token', accessToken);
    redirectionURL.searchParams.append('expiration', expiration.toString());
    redirectionURL.searchParams.append('refreshToken', refreshToken);
    console.log('User response:', user, redirectionURL);
    res.status(302).header('Location', redirectionURL.toString()).send();
  } catch (error) {
    console.log(error);
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
