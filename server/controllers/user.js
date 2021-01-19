const bcrypt = require('bcryptjs');

module.exports = {
    register: async(req, res) => {
        const { username, profile_pic, password } = req.body;
        const db = req.app.get('db');

        const [foundUser] = await db.check_user({username});
        if(foundUser){
            return res.status(400).send('username already in use')
        }

        let salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const [newUser] = await db.register_user({username, profile_pic, hash});

        req.session.user = newUser;
        res.status(201).send(req.session.user);
    },

    login: async(req, res) => {
        const { username, password } = req.body;
        const db = req.app.get('db');

        const [foundUser] = await db.check_user({username});
        if(!foundUser){
            return res.status(404).send('Account not found')
        }

        const authenticated = bcrypt.compareSync(password, foundUser.password);
        if(!authenticated){
            return res.status(401).send('Password is incorrect')
        }

        delete foundUser.password;
        req.session.user = foundUser;
        res.status(202).send(req.session.user);
    },

    logout: (req, res) => {
        req.session.destroy();
        res.status(200).send(req.session);
    }
}