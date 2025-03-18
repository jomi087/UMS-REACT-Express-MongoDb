# Recommended Order of Middleware
### 1)Third-Party Middleware:
Middleware like cookie-parser, cors, and express.json() should be applied early in the middleware stack.
### 2)Static Files:
Serve static files (e.g., images, CSS) using express.static.
### 3)Routes:
Define your routes after setting up the necessary middleware.
### 4)Error Handling:
Error-handling middleware should be defined last, after all other middleware and routes


# Why Use JWT Instead of express-session?

| Feature            | express-session (Your Code) | JWT |
|--------------------|---------------------------|-----|
| **Where is session stored?** | On the server (Memory or DB) | On the client (Token) |
| **Authentication** | Server tracks sessions | No need for server storage |
| **Performance** | Slower (Needs DB or memory lookup) | Faster (No lookup needed) |
| **Scaling** | Harder (Session data must be shared across multiple servers) | Easier (Each request is independent) |
| **Security** | More secure (Session is stored on the server) | Can be less secure if tokens are stolen |

* **JWT** 
    - **Authariazation** [Authorization means getting permission to do something (like having access to adminDashboard or jst userDashboard  etc...)]  
    - **Authentication** [Authentication means proving who you are (like registered user for a app)]

# cookies
* **Storing  JWT TOKEN in  cookies**
    see to store value in cookies js has its own method to set and to read but how every  but with js method we cannot store sensitive datas cz it is less secure , it's vulnerable to XSS attacks (JavaScript injection).that means Malicious scripts can steal document.cookie.
    That's why we use ;-
    * HTTP-Only Cookies (**More Secure** why ?)
        - The safest option against XSS attacks because 
            - **JavaScript cannot access httpOnly cookies** , that is **the cookie is only accessible through HTTP requests (not JavaScript)**.=> document.cookie will not work , res.cookie will wrk
            - that also dosnt means that it will not work for https,
            By default HTTP-Only cookies work on both http:// and https:// websites cz by defult an option which is secure is set to false  and if set it to true  then the cookie will only work on https:// websites .(not work for http)
        - Sent automatically with requests to the backend.
        - Can prevent CSRF attacks if configured properly.
         
* **cookie Parser** 
    * HTTP-Only Cookies  has a method to set a cookie  but dont have a method to read or get the cookie  like js has so for that we use a package name cookie-parser which is a midleweard which give methods to access cookies


* **Authorization**
    * This is a basic explanation of how authorization works. Before diving into the middleware, let me first explain its purpose when a user signs in. When a user logs in, we generate a JWT token and store it in the client’s cookies. Every time the user tries to access a protected page, they are routed through a middleware where we check if they have a valid token.

    * In the middleware, the first step is to extract the token from the client’s cookies. If a token exists, we proceed with validation. This validation process involves decoding the token by comparing its hashed value. When the JWT token is created, it includes a payload containing user data, which is hashed using a secret key. To verify the token, we extract the payload and rehash it using the same secret key. This newly generated hash is then compared with the original hashed value stored in the token. If both match, the token is considered valid; otherwise, it may have been tampered with, expired, or deemed invalid for another reason.

    * Once the token is validated, decoding it returns the payload, which contains the user’s database ID. We then attach this user ID to the req.user object, making it accessible in controllers or any other part of the application where the req object is available. In an optimized approach, we take an additional step by retrieving user details (excluding the password) directly in the middleware. This prevents the need to query the database repeatedly and also allows us to determine if the user has been blocked or deleted by checking the isBlocked field.

    * This entire process ensures secure access control in our application, allowing us to verify users' identities and enforce authorization rules based on their status and permissions.