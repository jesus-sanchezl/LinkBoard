const mysql = require("mysql2/promise");

const {
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_NAME,
    DATABASE_USER,
    DATABASE_PASSWORD,
} = process.env;

let pool;

const getConnection = async () => {
    if (!pool) {
        pool = mysql.createPool({
            connectionLimit: 10,
            host: DATABASE_HOST,
            port: DATABASE_PORT,
            user: DATABASE_USER,
            password: DATABASE_PASSWORD,
            database: DATABASE_NAME,
            timezone: "Z",
        });
    }

    return await pool.getConnection();
};

module.exports = getConnection;
