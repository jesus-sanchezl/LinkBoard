const getConnection = require("../infraestructure/database");
const generateError = require("../utils/helpers");

const createLink = async (userId, url, titulo, image, description) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `
                        INSERT INTO links (user_id, url, titulo, image, description)
                        VALUES (?, ?, ?, ?, ?)
                  `,
            [userId, url, titulo, image, description]
        );

        return result.insertId;
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

const getAllLinks = async (limit, offset) => {
    let connection;

    try {
        connection = await getConnection();

        const [results] = await connection.query(
            `
                        SELECT l.id, l.user_id, l.url, l.titulo, l.description, l.created_at, u.username, u.email, l.image,
                        ROUND(AVG(r.rating)) AS media, COUNT(link_id) AS votes 
                        FROM links l 
                        LEFT JOIN users u ON l.user_id=u.id 
                        LEFT JOIN ratings r ON r.link_id=l.id 
                        GROUP BY l.id 
                        ORDER BY l.created_at DESC 
                        LIMIT ? OFFSET ?
                  `,
            [limit, offset]
        );

        return results;
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

const getLinkById = async (id) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `
                        SELECT l.id, l.user_id, l.url, l.titulo, l.description, l.created_at, u.username, u.email, l.image, 
                        ROUND(AVG(r.rating)) as media, COUNT(r.link_id) AS votes 
                        FROM links l  
                        LEFT JOIN users u ON l.user_id = u.id 
                        LEFT JOIN ratings r ON r.link_id = l.id 
                        WHERE l.id = ?
                        GROUP BY l.id, u.username, u.email, l.url, l.titulo, l.description, l.created_at, l.image
                  `,
            [id]
        );

        if (result.length === 0) {
            throw generateError(`El link con ID: ${id} no existe`, 404);
        }

        return result[0];
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

const deleteLinkById = async (id) => {
    let connection;

    try {
        connection = await getConnection();

        await connection.query(
            `
                        DELETE FROM links WHERE id = ?
                  `,
            [id]
        );
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

const updateLinkById = async (id, url, titulo, image, description) => {
    let connection;

    try {
        connection = await getConnection();

        await connection.query(
            `
                        UPDATE links
                        SET url = ?, titulo = ?, image = ?, description = ?
                        WHERE id = ?
                  `,
            [url, titulo, image, description, id]
        );

        return true;
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = {
    createLink,
    deleteLinkById,
    getAllLinks,
    getLinkById,
    updateLinkById,
};
