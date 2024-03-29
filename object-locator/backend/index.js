import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "object-locator"
})

app.get ("/", (req, res) => {
    res.json("hello")
})

app.post ("/login", (req, res) => {
  const q = "SELECT `password` FROM users WHERE `email` = (?)";

  const values = [
    req.body.username
  ];

  db.query(q, [values], (err, data) => {
    if (err) {
      return res.json(err);
    }
    let ob = {
      value: false
    };
    console.log (req.body.password);
    console.log (data[0].password);
    if (data[0].password == req.body.password)
      ob.value = true;

    return res.json (ob);
  });
});


app.get("/getItems", (req, res) => {
    const q = "SELECT * FROM items";
    db.query(q, (err, data) => {
      if (err) {
        console.log(err);
        return res.json(err);
      }
      return res.json(data);
    });
  });

app.listen (8800, ()=>{
    console.log ("Connected to Backend");
})