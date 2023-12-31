import { Router, request, response } from "express";
import connection from "./database.js";

const namesRouter = Router();

//CRUD
// ----- ALBUM ROUTES ----- \\
// GET Endpoint "/names" - get all names with artist information
namesRouter.get("/", async (req, res) => {

    const queryString = /*sql*/ `
          SELECT * FROM react_group;
        `;
  //   `;

  connection.query(queryString, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Der opstod en fejl ved forespørgslen." });
    } else {
      res.json(results);
    }
  });
});

// GET specific name
namesRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const queryString = "SELECT * FROM react_group WHERE id=?;";
  const values = [id];
  
  connection.query(queryString, values, (err, results, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.json(results[0]); //[0] makes the return a single object instead of array with one object
    }
  });
});

namesRouter.post("/", async (req, res) => {
  const artist = req.body;
  console.log(artist)

  const queryString = "INSERT INTO react_group (first_name, last_name) VALUES(?, ?)";

  const values = [artist.first_name, artist.last_name]

  connection.query(queryString, values, (err, results, fields) => {
    if (err) {
      console.log(err)
    } else {
      res.json(results);
    }
  });
});

// // CREATE album
// namesRouter.post("/", async (request, response) => {
//   const album = request.body;
//   const query = "INSERT INTO names(albumCover, releaseDate, albumTitle, numberofTracks) values(?, ?, ?, ?);"; //todo add relevant properties
//   const values = [album.albumCover, album.releaseDate, album.albumTitle, album.numberofTracks]; //todo add relevant properties

//   connection.query(query, values, (err, results, fields) => {
//     if (err) {
//       console.log(err);
//     } else {
//       response.json(results);
//     }
//   });
// });

// // UPDATE album
// namesRouter.put("/:id", async (request, response) => {
//   const id = request.params.id;
//   const album = request.body;
//   const query = "UPDATE names SET albumCover=?, releaseDate=?, albumTitle=?, numberofTracks=? WHERE albumID=?"; //todo add relevant properties
//   const values = [album.albumCover, album.releaseDate, album.albumTitle, album.numberofTracks, id]; //todo add relevant properties

//   connection.query(query, values, (err, results, fields) => {
//     if (err) {
//       console.log(err);
//     } else {
//       response.json(results);
//     }
//   });
// });

// //DELETE names
// namesRouter.delete("/:id", async (request, response) => {
//   const id = request.params.id;
//   const query = "DELETE FROM names WHERE albumID=?;";
//   const values = [id];
//   connection.query(query, values, (err, results, fields) => {
//     if (err) {
//       console.log(err);
//     } else {
//       response.json(results);
//     }
//   });
// });

// ----- EXPORTS ----- \\
export default namesRouter;
