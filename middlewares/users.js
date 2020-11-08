const { createToken } = require('./security');
const sequelize = require('../database/conexion');
const { is_numeric } = require('./security');

//valido el usuario para ingresar 
const validateCreateUser = async(req, res, next) => {
        let { username, password, fullname, email, phone, address } = req.body;
        validateUsername(req, res, username);
        if (!username || !password || !fullname || !email || !phone || !address) {
            res.status(400).json('Información incompleta o petición mal formulada');
            console.log('faltan datos');
            next();
        } else {
            await sequelize.query(`INSERT INTO users ( username, password, full_name, email, phone, delivery_address ) 
        VALUES ('${username}','${password}','${fullname}','${email}',${phone},'${address}')`)
                .then(response => {
                    console.log(response);
                    console.log("Number of records inserted: " + response[1]);
                }).catch(err => {
                    console.error(err)
                });
            res.status(200).json('Usuario creado correctamente');
            next();
        }
    }
    // usuario
function validateUsername(req, res, username) {
    sequelize.query(`SELECT username FROM users WHERE username=:user_name`, {
            replacements: { user_name: username },
            type: sequelize.QueryTypes.SELECT,
        })
        .then(result => {
            if (result != "") {
                res.status(200).json('Elija un nombre de usuario diferente');
            }
        }).catch(err => {
            console.error(err)
        });
}

//contraseña
const loginUser = async(req, res, next) => {
    let { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json('Información incompleta o petición mal formulada');
        console.log('faltan datos');
        next();
    } else { //busca usuario en la bd
        sequelize.query(`SELECT * FROM users WHERE username='${username}' and password='${password}'`, {
                type: sequelize.QueryTypes.SELECT,
            })
            .then((result) => {
                if (result != "") {
                    //crear token
                    sequelize.query(`SELECT user_id, full_name, email, is_admin FROM users WHERE username='${username}'`, {
                            type: sequelize.QueryTypes.SELECT,
                        })
                        .then(payload => {
                            const sendPayload = {
                                user_id: payload[0].user_id,
                                fullname: payload[0].full_name,
                                email: payload[0].email,
                                is_admin: payload[0].is_admin
                            }
                            console.log(sendPayload);
                            createToken(req, res, sendPayload, next);
                            console.log('siguio');
                        }).catch(err => {
                            console.error(err)
                        });
                } else {
                    console.log('no tiene información');
                    res.status(401).json('Usuario o contraseña no validos');
                }
            }).catch(err => {
                console.error(err)
            });
        console.log('todos los datos');
        next();
    }
};

const getUser = async(req, res, next) => {
    let id = req.query.id ? is_numeric(req.query.id) : 'allproducts';
    if (id == 'allproducts') {
        //busca lista de productos
        await sequelize.query('SELECT * FROM users', {
                type: sequelize.QueryTypes.SELECT,
            })
            .then(result => {
                res.status(200).json(result);
            }).catch(err => {
                console.error(err)
                res.status(400).json('Error buscando informacion');
            });
        return
    };
    if (id != false) {
        //busca por id
        await sequelize.query(`SELECT * FROM users WHERE user_id=${id}`, {
                type: sequelize.QueryTypes.SELECT,
            })
            .then(result => {
                res.status(200).json(result);
            }).catch(err => {
                console.error(err)
                res.status(400).json('Error buscando informacion');
            });
        console.log('Busqueda por una id');
        next();
    } else {
        return res.status(400).json('El query de la ruta solo admite números');
    };
    next();
};


const updateUser = async(req, res, next) => {
    let id = req.query.id ? is_numeric(req.query.id) : console.log('Falta parametro id');
    let { username, password, fullname, email, phone, address } = req.body;
    if (!username || !password || !fullname || !email || !phone || !address) {
        res.status(400).json('Información incompleta o petición mal formulada');
    } else {
        if (id != false) {
            await sequelize.query(`UPDATE users SET username='${username}', password='${password}', full_name='${fullname}', email='${email}', phone=${phone}, delivery_address='${address}'
        WHERE user_id=${id}`)
                .then(result => {
                    console.log("Number of records update: " + result[1]);
                }).catch(err => {
                    console.error(err)
                });
            res.status(200).json('Actualización satisfatoria');
        }
        next();
    }
};

// elimino usuario
const deleteUser = async(req, res, next) => {
    let id = req.query.id ? is_numeric(req.query.id) : console.log('Falta parametro id');
    console.log(id);
    if (!id) {
        res.status(406).json('Falta identificación');
        next();
    } else {
        if (id != false) {
            await sequelize.query(`SELECT * FROM users WHERE user_id=${id}`, {
                    type: sequelize.QueryTypes.SELECT,
                }) //valida si hay productos asociados a una orden
                .then(result => {
                    if (result[0] !== null || result[0] !== [] || result[0] !== "") { //Sino tiene relación con la tabla order_product -> busca en products

                        sequelize.query(`DELETE FROM users WHERE user_id =${id}`) //borra el producto sino esta asociado a una orden
                            .then(result => {
                                if (result[1] != 0) {
                                    res.status(200).json(`Usuario eliminado por id ${id}`);
                                } else {
                                    res.status(406).json(`No se puede eliminar`);
                                }
                                console.log("Number of rows delete: " + result[1]);
                            }).catch(err => {
                                console.error(err)
                            });
                    } else {
                        res.status(400).json('No se puede eliminar usuario')
                    }
                    console.log("Number of rows delete: " + result[1]);
                }).catch(err => {
                    console.error(err)
                });
        }
        next();
    }
};

module.exports = {
    validateCreateUser,
    loginUser,
    getUser,
    updateUser,
    deleteUser,
}