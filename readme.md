# Backend aplication for vechicle car service
backend has express nodejs and mongodb as database

# steps
1. npm init // ---------------------------------to generate package
2. created .env pasted mongo connect url //-----copied from atlas and connected to compass 
3. created index.js //--------------------------entry point

# libraries
4. mongoose :(mongo object modeling tool) to interact with mongo database . This is used instead of mongodb driver because it gives easy way to structure schema.
    npm install mongoose
    import mongoose
    connect to database
    .env ---- to paste connect url
# .env
     created utils/config
     impport .env
     saved url from .env to new variable

# app.js
    to save server related
    install express

# endpoints
    1.users
        register new user
           POST/api/users/register
        login user
           POST/api/users/login
        get user profile
           GET/api/users/profile
        update user profile
           PUT/api/users/profile
        delete user profile
           delete/api/users/profile
        logout user
            GET/api/users/logout
# router


# controllers