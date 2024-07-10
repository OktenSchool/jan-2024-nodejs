const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const users = [
    {id: 1, name: 'Maksym', email: 'feden@gmail.com', password: 'qwe123'},
    {id: 2, name: 'Alina', email: 'alindosik@gmail.com', password: 'ert345'},
    {id: 3, name: 'Anna', email: 'ann43@gmail.com', password: 'ghj393'},
    {id: 4, name: 'Tamara', email: 'tomochka23@gmail.com', password: 'afs787'},
    {id: 5, name: 'Dima', email: 'taper@gmail.com', password: 'rtt443'},
    {id: 6, name: 'Rita', email: 'torpeda@gmail.com', password: 'vcx344'},
    {id: 7, name: 'Denis', email: 'denchik@gmail.com', password: 'sdf555'},
    {id: 8, name: 'Sergey', email: 'BigBoss@gmail.com', password: 'ccc322'},
    {id: 9, name: 'Angela', email: 'lala@gmail.com', password: 'cdd343'},
    {id: 10, name: 'Irina', email: 'irka7@gmail.com', password: 'kkk222'},
];

app.get('/users', (req, res) => {
    try {
        res.json(users);
    } catch (e) {
        res.status(400).json(e.message);
    }
});

app.post('/users', (req, res) => {
    try {
        const {name, email, password} = req.body;

        const index = users.findIndex((user) => user.email === email)
        if (index !== -1) {
            return res.status(409).json('User with this email already exists')
        }
        const newUser = {
            id: users[users.length - 1].id + 1,
            name,
            email,
            password
        }
        users.push(newUser);
        res.status(201).json(newUser);
    } catch (e) {
        res.status(400).json(e.message)
    }
})

app.get('/users/:userId', (req, res) => {
    try {
        const userId = Number(req.params.userId);
        const user = users.find(user => user.id === userId);
        if (!user) {
            return res.status(404).json('User not found')
        }
        res.json(user);
    } catch (e) {
        res.status(400).json(e.message)
    }
})

app.put('/users/:userId', (req, res) => {
    try {
        const userId = Number(req.params.userId);
        const {name, email, password} = req.body;
        const user = users.find(user => user.id === userId);
        if (!user) {
            return res.status(404).json('User not found')
        }
        if (name) user.name = name;
        if (email) user.email = email;
        if (password) user.password = password;

        res.status(201).json(user);
    } catch (e) {
        res.status(400).json(e.message)
    }
});

app.delete('/users/:userId', (req, res) => {
    try {
        const userId = Number(req.params.userId);
        const index = users.findIndex(user => user.id === userId);
        if (index === -1) {
            return res.status(404).json('User not found')
        }
        users.splice(index, 1);
        res.sendStatus(204);
    } catch (e) {
        res.status(400).json(e.message)
    }
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})

//
