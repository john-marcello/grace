const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const usersRouter = express.Router();

const { createUser, getUsers, getUserByUsername } = require("../db");

// build some routes here

usersRouter.post("/register", async (req, res, next) => {  
    try {
        const { username, password } = req.body;
        const SALT_COUNT = 11;
        let securedPassword;
        const _user = await getUserByUsername({ username });
        
        if (_user) {
            next({
                name: "UserExistsError",
                message: "A user by that username already exists.",
            });
        }
        
        if (password.length <= 7) {
            next({
                name: "PasswordLengthError",
                message: "The password must be a minimum of at least 8 characters.",
            });
        } else {
            bcrypt.hash(password, SALT_COUNT, async (err, hashedPassword) => {
                securedPassword = hashedPassword;
                const  user  = await createUser({ username, password: securedPassword });
                console.log(username, password)
                console.log(createUser({username, password}))
              
                console.log(user)
                const token = jwt.sign({ id: user.id, username }, process.env.JWT_SECRET, {
                    expiresIn: "1w",
                });
                delete user.password;
                delete user.id;
                user.token = token;
                res.send({ message: "The user was successfully created", user });
            });
        }
    } catch ({ name, message }) {
        next({ name, message });
    }
});


usersRouter.post('/login', async (req, res, next) => {
    const { username, password } = req.body;

    console.log(username, password)

    if (!username || !password){
        next({
            name: "Missing Credentials",
            message: "Please supply a username and a password "
        })
    }

    try {
        const user = await getUserByUsername(username);
        const hashedPassword = user.password;
        bcrypt.compare(password, hashedPassword, function(err, passwordsMatch){
            if (passwordsMatch){
                const token = jwt.sign({
                    id: user.id,
                    username
                }, process.env.JWT_SECRET, {
                    expiresIn: '1w'
                });

                res.send({
                    message: "you're logged in!",
                    token: token
                })
            } else {
                next({
                    name: 'incorrect Credentials',
                    message: 'username or password is incorrect'
                })
            }
        })

    } catch (error) {
        console.log(error)
        next(error)
    }

})



usersRouter.get('/', async (req, res, next) => {
    try {
        const users = await getUsers();
        res.send({
            users
        });
    } catch (error) {
        throw error;
    }
})



module.exports = usersRouter;