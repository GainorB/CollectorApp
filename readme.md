# CollectorApp

An application built for people to manage their sneaker collections! Simply make an account, from there you can submit your sneaker collection. Your collection will then be displayed in a grid, similar to Pinterest's layout. There is full CRUD functionality, you can create (adding a sneaker), read (view your collection), update (modify your collection) and delete (delete sneakers).

**Live Link:** https://collectrapp.herokuapp.com/

### TECH STACK
* React.js
* Node.js
* Express.js
* PostgreSQL

### MISC TECH
* JWTokens to secure endpoints
* Passport JWT Strategy 
* Axios
* React Router
* Restricting React endpoints
* Local Storage

### CHALLENGES
1. Rendering the collection similarily to Pinterest's layout.
2. Restricting Routes with React Router
3. Controlled vs. Uncontrolled Forms: Trying to set default values in forms (not placeholders) from the database
4. Axios was hit or miss: OPTIONS! smh
5. Managing state: When minimizing a shoe, the state of the icon persists to every shoe so you'd have to toggle twice to minimize another shoe. In short, I only wanted the state to change for one item.

### WHAT I LEARNED/NEW IMPLEMENTATION
1. CSS Grid (basics)
2. More experience with React Router and auth routes
3. Various DOM Manipulation tricks
4. Secure endpoints on the server with JWT

### BACKLOG
1. Continually work on mobile responsiveness
2. Want to eventually turn into React Native
3. REFACTORING! I know there will be better ways of getting things done once I learn more.
4. CSS! I'm not a designer, but maybe something more pleasant.
5. Maybe manage less data, not sure how a user will feel with the amount of data required per new submission.
6. Possibly add OAuth
7. Comment more of the code