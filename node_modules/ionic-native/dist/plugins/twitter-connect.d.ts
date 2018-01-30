/**
 * @name Twitter Connect
 * @description
 * Plugin to use Twitter Single Sign On
 * Uses Twitter's Fabric SDK
 */
export declare class TwitterConnect {
    /**
     * Logs in
     * @return {Promise<TwitterConnectResponse>} returns a promise that resolves if logged in and rejects if failed to login
     */
    static login(): Promise<TwitterConnectResponse>;
    /**
     * Logs out
     * @return {Promise<any>} returns a promise that resolves if logged out and rejects if failed to logout
     */
    static logout(): Promise<any>;
}
export interface TwitterConnectResponse {
    /**
     * Twitter Username
     */
    userName: string;
    /**
     * Twitter User ID
     */
    userId: string;
    /**
     * Twitter OAuth Secret
     */
    secret: string;
    /**
     * Twitter OAuth Token
     */
    token: string;
}
