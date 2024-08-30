/**
 * An array of Routes that are accessible to the public
 * @type {string[]}
 */
export const publicRoutes = ["/"];

/**
 * An array of Routes that are used for authentication
 * @type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/register"];

/**
 * The prefix for API authentication routes
 * @type {string }
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The defualt redirect path after logging in
 * @type {string}
 */
export const DEFUALT_LOGIN_REDIRECT = "/settings";
