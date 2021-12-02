
import { google } from 'googleapis';
import { Service } from 'typedi';

/*******************/
/** CONFIGURATION **/
/*******************/

@Service('Google_Auth')
export class GoogleAuth{

    googleConfig = {
        clientId: process.env.GOOGLE_CLIENT_ID, // e.g. asdfghjkljhgfdsghjk.apps.googleusercontent.com
        clientSecret: process.env.GOOGLE_CLIENT_SECRET, // e.g. _ASDFA%DFASDFASDFASD#FAD-
        redirect: process.env.GOOGLE_REDIRECT_URL, // this must match your google api settings
    };

    defaultScope = [
        // 'https://www.googleapis.com/auth/plus.me',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
        'openid'
    ];



    createConnection() {
        return new google.auth.OAuth2(
            this.googleConfig.clientId,
            this.googleConfig.clientSecret,
            this.googleConfig.redirect
        );
    }


    getConnectionUrl(auth: any) {
        return auth.generateAuthUrl({
            access_type: 'offline',
            prompt: 'consent',
            scope: this.defaultScope
        });
    }

    async getGooglePlusApi(auth:any) {
        return await google.plus({ version: 'v1', auth });
    }


    /**
     * Part 1: Create a Google URL and send to the client to log in the user.
     */
    urlGoogle() {
        const auth = this.createConnection();
        const url = this.getConnectionUrl(auth).toString('hex');
        console.log(url);
        return({url: url});
    }

    /**
     * Part 2: Take the "code" parameter which Google gives us once when the user logs in, then get the user's email and id.
     */
    async getGoogleAccountFromCode(code: string) {
        const auth = this.createConnection();
        google.options({ auth: auth });
        const data = await auth.getToken(code)
            .then(data => data)
            .catch(err => {
                console.log(err)
            });
        console.log(data);
        //@ts-ignore
        const tokens = data.tokens;
        auth.setCredentials(tokens);
        const plus = this.getGooglePlusApi(auth);
        const me = await (await plus).people.get({ userId: 'me' });
        console.log(me);
        const userGoogleId = me.data.id;
        const userGoogleEmail = me.data.emails && me.data.emails.length && me.data.emails[0].value;
        console.log(userGoogleId, userGoogleEmail, tokens);
        return {
            id: userGoogleId,
            email: userGoogleEmail,
            tokens: tokens,
        };
    }
}