/**
 * Authentication helper for Austin SDK
 */
class Auth {
    /**
     * @param {string} url - base url for the auth application (https://auth.austinsdk.me)
     * @param {string} client_id - application client id
     * @param {string} client_secret - Application client secret
     * @param {string} redirect_uri - Redirect url from application
     */
    constructor(url, client_id, client_secret, redirect_uri) {
        this.url = url || "https://auth.austinsdk.me";
        this.client_id = client_id;
        this.client_secret = client_secret;
        this.redirect_uri = redirect_uri;
    }

    /**
     * Returns a auth url with the given information
     * @param {string} [redirect_uri] - The redirect url used in your application (optional, uses constructor value if not provided)
     * @returns {string} The authorization URL
     */
    getAuthUrl(redirect_uri) {
        return `${this.url}/oauth/authorize?client_id=${encodeURIComponent(this.client_id)}&redirect_uri=${encodeURIComponent(redirect_uri || this.redirect_uri)}&response_type=code`
    }

    /**
     * Returns a usable token for applications to use from the gathered code
     * @param {string} code - the code you got from getAuthUrl
     * @param {string} [redirect_uri] - the previous redirect url (optional, uses constructor value if not provided)
     * @returns {Promise<Object>} Token response object containing access_token and other OAuth data
     */
    async codeForToken(code, redirect_uri) {
        let _body = JSON.stringify(
            {
                "grant_type": "authorization_code",
                "code": code,
                "redirect_uri": redirect_uri || this.redirect_uri,
                "client_id": this.client_id,
                "client_secret": this.client_secret
            }
        )
        let _fetch = await fetch(`${this.url}/oauth/token`, {
            method: "POST",
            body: _body,
            headers: {
                "Content-Type": "application/json"
            }
        })
        let _text = _fetch.json()
        return _text
    }

    /**
     * Gets the user information
     * @param {string} token - The token you gathered from codeForToken
     * @returns {Promise<Object>} User information object
     */
    async getUserInfo(token) {
        return await (await fetch(`${this.url}/api/v1/get_user?token=${encodeURIComponent(token)}`)).json()
    }

    /**
     * Returns user projects
     * @param {string} token - The token you gathered from codeForToken
     * @returns {Promise<Object[]>} Array of user projects
     */
    async getProjects(token) {
        return await (await fetch(`${this.url}/api/v1/get_projects?token=${encodeURIComponent(token)}`)).json()
    }

    /**
     * Returns the type of token, and if its valid
     * @param {string} token - The token you gathered from codeForToken
     * @returns {Promise<Object>} Token verification object with validity status
     */
    async verify(token) {
        return await (await fetch(`${this.url}/api/v1/verify?token=${encodeURIComponent(token)}`)).json()
    }
}
module.exports = Auth;