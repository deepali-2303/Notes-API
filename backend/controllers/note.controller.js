import connection from "../db/db.js";
import encryptDescription from "../middleware/encrypt.js";
import decryptDescription from "../middleware/decrypt.js";
const Note = {
  async create(title, description) {
    try {
      // console.log(req.body);
      // const title = req.body.title;
      // const description = req.body.description;
      const hashedDescription = await encryptDescription(description);
      const result = await new Promise((resolve, reject) => {
        const query = `INSERT INTO notes (title, description) VALUES (?, ?)`;
        connection.query(query, [title, hashedDescription], (err, result) => {
          if (err) {
            reject(new Error(err.message));
          }
          resolve(result);
        });
      });
      return result;
    }catch (e) {
      console.error(e);
    } 
  },
  async getNotes() {
    try {
      const result = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM notes";
        connection.query(query, (err, result) => {
          if (err) {
            reject(new Error(err.message));
          }
          resolve(result);
        });
      });
      return result;
    } catch (err) {
      console.log(err);
    }
  },
  async updateNoteById(noteId, title, description) {
    try {
      const hashedDescription = await encryptDescription(description);

      const result = await new Promise((resolve, reject) => {
        const query = "UPDATE notes SET title = ?, description = ? WHERE id = ?";
        connection.query(query, [title, hashedDescription, noteId], (err, result) => {
          if (err) {
            reject(new Error(err.message));
          }
          resolve(result);
        });
      });

      return result;
    } catch (err) {
      console.error(err);
      throw err; 
    }
  },
  async deleteNoteById(noteId) {
    try {
      const result = await new Promise((resolve, reject) => {
        const query = "DELETE FROM notes WHERE id = ?";
        connection.query(query, noteId, (err, result) => {
          if (err) {
            reject(new Error(err.message));
          }
          resolve(result);
        });
      });
      return result;
    } catch (err) {
      console.log(err);
    }
  },
  // async getNoteById(noteId) {
  //   try {
  //     const result = await new Promise((resolve, reject) => {

  //       const query = "SELECT * FROM notes WHERE id = ?";
  //       connection.query(query, noteId, (err, result) => {
  //         if (err) {
  //           reject(new Error(err.message));
  //         }
  //         resolve(result);
  //       });
  //     });
  //     return result;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  async getNoteById(noteId) {
    try {
      const result = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM notes WHERE id = ?";
        connection.query(query, noteId, async (err, rows) => {
          if (err) {
            reject(new Error(err.message));
          }

          if (rows.length === 0) {
            resolve(null); 
          }

          const decryptedDescription = await decryptDescription(rows[0].description);

          const decryptedNote = {
            id: rows[0].id,
            title: rows[0].title,
            description: decryptedDescription,
          };

          resolve(decryptedNote);
        });
      });
      return result;
    } catch (err) {
      console.log(err);
    }
  }
};

export default Note;