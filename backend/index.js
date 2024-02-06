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

app.post ('/signup', (req, res) => {
  const q = "INSERT INTO `users` (`uid`, `name`, `email`, `phone`, `password`) VALUES (NULL, ?)";

  const values = [
    req.body.name,
    req.body.email,
    req.body.phone,
    req.body.password
  ];

  db.query(q, [values], (err, data) => {
    // 
    if (err)
      return res.json({status: 500});
    return res.json({status: 200});
  });
})

app.post ("/login", (req, res) => {
  const q = "SELECT `password`, `uid` FROM users WHERE `email` = (?)";

  const values = [
    req.body.username
  ];

  db.query(q, [values], (err, data) => {
    if (err) {
      return res.json(err);
    }
    let ob = {
      value: false,
      id: -1
    };
    console.log (req.body.password);
    console.log (data[0].password);
    if (data[0].password == req.body.password)
    {  
      ob.value = true;
      ob.id = data[0].uid;
    }

    return res.json (ob);
  });
});


app.post("/getItems", (req, res) => {
    const q = "SELECT * FROM items WHERE `uid` = (?)";
    const values = [
      req.body.uid
    ];
    db.query(q, [values], (err, data) => {
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