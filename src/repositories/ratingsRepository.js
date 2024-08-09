const getConnection = require("../infraestructure/database");

const checkVoted = async (idUser, idLink) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `
                        SELECT * FROM ratings WHERE user_id = ? AND link_Id = ?
                  `,
            [idUser, idLink]
        );

        return result.length > 0;
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

const addVote = async (idUser, idLink, rating) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `
                        INSERT INTO ratings (user_id, link_id, rating)
                        VALUES (?, ?, ?)
                  `,
            [idUser, idLink, rating]
        );

        return result.insertId;
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

const retrieveRating = async (id) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `
                        SELECT ROUND(AVG(rating), 0) AS media,
                        COUNT(rating) AS votes
                        FROM ratings WHERE link_id = ?
                  `,
            [id]
        );

        return result[0];
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = {
    addVote,
    checkVoted,
    retrieveRating,
};
