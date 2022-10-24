
const con = require('pg').Pool

const db = new con({
    user:'postgres',
    host:'localhost',
    database:'user_db',
    password:'root1234',
    port: 5432
})
const getUsers = (req, res)=>{
    db.query('Select * from users ORDER BY id ASC', (error, results)=> {
        if (error) {
            res.status(error.status)
        }
        res.status(201).json(results.rows)
    })
}

const getUserById = (req, res) => {
    const id = parseInt(req.params.id)
    db.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            res.status(error.status)
        }
        res.status(201).json(results.rows)
    })
}

const createUser = (req, res) => {
    const {
        name,
        email
    } = req.body
    db.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
        if (error) {
            res.status(error.status)
        }
        res.status(201).send(`User added with ID: ${results.insertId}`)
    })
}

const updateUser = (req, res) => {
    const id = parseInt(req.params.id)
    const {
        name,
        email
    } = req.body
    db.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3',
        [name, email, id],
        (error, results) => {
            if (error) {
                res.status(error.status)
            }
            res.status(201).send(`User modified with ID: ${id}`)
        }
    )
}

const deleteUser = (req, res) => {
    const id = parseInt(req.params.id)
    db.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            res.status(error.status)
        }
        res.status(201).send(`User deleted with ID: ${id}`)
    })
}
module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}
