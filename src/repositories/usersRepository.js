const bcrypt = require("bcrypt");

const getConnection = require("../infraestructure/database");
const generateError = require("../utils/helpers");

const createUser = async (username, email, password, description) => {
    let connection;
    try {
        connection = await getConnection();

        const [user] = await connection.query(
            `
                        SELECT id FROM users WHERE email = ? 
                  `,
            [email]
        );

        if (user.length > 0) {
            throw generateError(
                "Ya existe un usuario en la base de datos con ese email",
                409
            );
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const [newUser] = await connection.query(
            `
                        INSERT INTO users (username, email, password, description)
                        VALUES( ?, ?, ?, ?)
                  `,
            [username, email, passwordHash, description]
        );

        return newUser.insertId;
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

const getUserById = async (id) => {
    let connection;

    try {
        connection = await getConnection();

        const [results] = await connection.query(
            `
                        SELECT * FROM users
                        WHERE id = ?
                  `,
            [id]
        );

        if (results.length === 0) {
            throw generateError("No existe ningún usuario con ese id", 404);
        }

        return results[0];
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

const getUserByEmail = async (email) => {
    let connection;

    try {
        connection = await getConnection();

        const [results] = await connection.query(
            `
                        SELECT * FROM users
                        WHERE email = ?
                  `,
            [email]
        );

        return results[0];
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

const getLinksByUserId = async (id, limit, offset) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `
                        SELECT l.id, l.user_id,  l.url, l.titulo, l.description, l.created_at, u.username, u.email, l.image, 
                        ROUND(AVG(rating)) as media, COUNT(link_id) AS votes 
                        FROM links l LEFT JOIN users u ON l.user_id=u.id  
                        LEFT JOIN ratings r ON r.link_id= l.id 
                        WHERE l.user_id=? 
                        GROUP BY l.id  ORDER BY l.created_at DESC LIMIT ? OFFSET ?
                  `,
            [id, limit, offset]
        );

        return result;
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

const uploadUserImage = async (id, image) => {
    let connection;

    try {
        connection = await getConnection();

        await connection.query(
            `
                        UPDATE users SET image = ?
                        WHERE id = ?
                  `,
            [image, id]
        );

        return true;
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

const updateUserById = async (data) => {
    let connection;

    const { id, username, email, description } = data;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `
                        UPDATE users
                        SET username = ?, email = ?,  description = ?
                        WHERE id = ?
                  `,
            [username, email, description, id]
        );

        return result;
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

const updatePassordUserById = async (id, password) => {
    let connection;

    try {
        connection = await getConnection();

        await connection.query(
            `
                        UPDATE users
                        SET password = ?
                        WHERE id = ?
                  `,
            [password, id]
        );
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = {
    createUser,
    getLinksByUserId,
    getUserByEmail,
    getUserById,
    updatePassordUserById,
    updateUserById,
    uploadUserImage,
};
