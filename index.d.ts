declare module "nasdk" {
    /**
     * Token response object from OAuth flow
     */
    interface TokenResponse {
        access_token: string;
        token_type: string;
        expires_in?: number;
        refresh_token?: string;
        scope?: string;
    }

    /**
     * User information object
     */
    interface UserInfo {
        id: string | number;
        username?: string;
        email?: string;
        name?: string;
        [key: string]: any;
    }

    /**
     * Project object
     */
    interface Project {
        id: string | number;
        name: string;
        description?: string;
        [key: string]: any;
    }

    /**
     * Token verification response
     */
    interface TokenVerification {
        valid: boolean;
        type?: string;
        expires_at?: string;
        [key: string]: any;
    }

    /**
     * Authentication helper for Austin SDK
     */
    class auth {
        /**
         * @param url - base url for the auth application (https://auth.austinsdk.me)
         * @param client_id - application client id
         * @param client_secret - Application client secret
         * @param redirect_uri - Redirect url from application
         */
        constructor(url: string, client_id: string, client_secret: string, redirect_uri: string);

        /**
         * Returns a auth url with the given information
         * @param redirect_uri - The redirect url used in your application (optional, uses constructor value if not provided)
         * @returns The authorization URL
         */
        getAuthUrl(redirect_uri?: string): string;

        /**
         * Returns a usable token for applications to use from the gathered code
         * @param code - the code you got from getAuthUrl
         * @param redirect_uri - the previous redirect url (optional, uses constructor value if not provided)
         * @returns Token response object containing access_token and other OAuth data
         */
        codeForToken(code: string, redirect_uri?: string): Promise<TokenResponse>;

        /**
         * Gets the user information
         * @param token - The token you gathered from codeForToken
         * @returns User information object
         */
        getUserInfo(token: string): Promise<UserInfo>;

        /**
         * Returns user projects
         * @param token - The token you gathered from codeForToken
         * @returns Array of user projects
         */
        getProjects(token: string): Promise<Project[]>;

        /**
         * Returns the type of token, and if its valid
         * @param token - The token you gathered from codeForToken
         * @returns Token verification object with validity status
         */
        verify(token: string): Promise<TokenVerification>;
    }

    export = auth;
}