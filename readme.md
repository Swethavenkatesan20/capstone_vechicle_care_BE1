# Vehicle care backend process
installed required packages created models controllers routes.
in models created user services review and appointments
similary created controllers and respective routes.

middleware is created to add auth
verifyToken and isAdmin token is used here

for user after registering and login toen will be generated 
to get update delete user verifyToken is used

admin part is to create services and get appointments
for this isAdmin is used. 


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

    2.services
        create service
          POST/api/services/
        get service
           GET/api/services/
    
 
   3.appointments
   
           POST/api/appointments
           
           GET/api/appointments
           
   4.reviews
   
           POST/api/reviews
           
           GET/api/reviews
           
# router

1.userRoutes

        here created routes with auth verification
        
        after POST, to GET PUT DELETE user there is auth.verifyToken is used
        

2.serviceRoutes

       service routes is created by admin
       
       to POST services there is auth.verifyToken and auth.isAdmin verify token if user is admin he can create services
       
3.reviewRoutes

        POST and GET routes is created
        
        for POST verifyToken is used
        
        for GET no token all user reviews will be get by current users
        
4.appointmentRoutes

        POST and GET routes is used
        
        for POST auth.verifyToken to check appointment is booked by user
        
        for GET auth.verifyToken and auth.isAdmin to check loged user is admin or not if admin he/she can see all the booked appointments



