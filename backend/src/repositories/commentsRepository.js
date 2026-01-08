const getConnection = require("../infraestructure/database");
const generateError = require("../utils/helpers");

const createComment = async (idUser, idLink, commentText) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `
                        INSERT INTO comments (user_id, link_id, comment_text)
                        VALUES (?, ?, ?)
                  `,
            [idUser, idLink, commentText]
        );

        return result.insertId;
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

const getCommentsById = async (idLink) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `
                        SELECT c.id, c.user_id, u.username, c.link_id, c.comment_text, c.created_at
                        FROM comments c
                        INNER JOIN users u ON c.user_id = u.id
                        WHERE c.link_id = ?
                        ORDER BY c.created_at DESC
                  `,
            [idLink]
        );

        return result;
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

const getCommentById = async (id) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `
                        SELECT * FROM comments WHERE id = ?
                  `,
            [id]
        );

        if (result.length === 0) {
            throw generateError(`El comentario con ID: ${id} no existe`, 404);
        }

        return result[0];
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

const deleteCommentById = async (id) => {
    let connection;

    try {
        connection = await getConnection();

        await connection.query(
            `
                        DELETE FROM comments WHERE id = ?
                  `,
            [id]
        );

        return;
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = {
    createComment,
    deleteCommentById,
    getCommentById,
    getCommentsById,
};
