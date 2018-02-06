const pg = require('pg');
const pgPromise = require('pgpromise');

exports.run = (client, msg, args) => {
    msg.reply('Command not ready');

    /*
    const conString = process.env.DATABSE_URL;
    const db = new pgPromise(pg, conString);
    db.connect().then((conn) => {
        conn.client.queryP('SELECT * from table').then(function (result) {
            console.log(result.rows);
        });
    });
    */
};