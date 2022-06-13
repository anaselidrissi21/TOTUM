const userDatamapper = require('../../models/userDatamapper');
const jwt = require('../../services/token');

const userController = {
    async getAll(_, res) {
        const users = await userDatamapper.getAll();
        res.json(users);
    },

    async login(req, res) {
        const { email, password } = req.body;
        const user = await userDatamapper.login(email, password);
        if (user) {
            const token = jwt.generateToken(user.email);
            res.json({ user, token });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    },

    async logout(req, res) {
        const token = req.headers.authorization;
        await userDatamapper.logout(token);
        res.json('User logged out');
    },

    async updatePassword(req, res) {
        const { password, passwordConfirmation } = req.body;
        const { id } = req.params;
        if (password === passwordConfirmation) {
            const user = await userDatamapper.updatePassword(id, password);
            if (user) {
                res.status(200).json({ message: 'Password updated' });
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } else {
            res.status(401).json({ message: 'Passwords do not match' });
        }
    },

    async updateEmail(req, res) {
        const { email, emailNew, emailConfirmation } = req.body;
        const { id } = req.params;
        if (email === emailNew) {
            res.status(401).json({ message: 'Email is the same' });
        }
        if (emailNew === emailConfirmation) {
            const user = await userDatamapper.updateEmail(id, emailNew);
            if (user) {
                res.status(200).json({ message: 'Email updated' });
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } else {
            res.status(401).json({ message: 'Emails do not match' });
        }
    },

    async createUser(req, res) {
        const data = req.body;
        if (data.password === data.passwordConfirmation) {
            const user = await userDatamapper.createUser(data);
            res.json(user);
        } else {
            res.status(401).json({ message: 'Passwords do not match' });
        }
    },

    async getOneUser(req, res) {
        const { id } = req.params;
        const user = await userDatamapper.getOneUser(id);
        res.json(user);
    },

    async updateUser(req, res) {
        const { id } = req.params;
        const data = req.body;
        const user = await userDatamapper.updateUser(id, data);
        res.json(user);
    },

    async removeUser(req, res) {
        const { id } = req.params;
        const user = await userDatamapper.removeUser(id);
        res.json(user);
    },

    async getActivity(req, res) {
        const { id } = req.params;
        const user = await userDatamapper.getUserActivity(id);
        res.json(user);
    },
};

module.exports = userController;
