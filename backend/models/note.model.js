import connection from "../db/db.js";

const createNoteSchema = () => {
  const query = `CREATE TABLE IF NOT EXISTS NOTES(
    ID INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL)`;

  connection.query(query, (e, result) => {
    {
      if (e) {
        console.log("Error creating table : ", e);
        return;
      } else {
        console.log("Note Table created successfully");

      }
    }
  });
};

export default createNoteSchema;