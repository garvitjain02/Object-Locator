import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "object-locator",
});

app.get("/", (req, res) => {
  res.json("hello");
});

app.post("/signup", (req, res) => {
  const q =
    "INSERT INTO `users` (`uid`, `name`, `email`, `phone`, `password`) VALUES (NULL, ?)";

  const values = [
    req.body.name,
    req.body.email,
    req.body.phone,
    req.body.password,
  ];

  db.query(q, [values], (err, data) => {
    console.log(data);
    if (err) return res.json({ status: 500 });
    data.status = 200;
    return res.json(data);
  });
});

app.post("/login", (req, res) => {
  const q = "SELECT `password`, `uid` FROM users WHERE `email` = (?)";

  const values = [req.body.username];

  db.query(q, [values], (err, data) => {
    if (err) {
      return res.json(err);
    }
    let ob = {
      value: false,
      id: -1,
    };
    console.log(req.body.password);
    console.log(data[0].password);
    if (data[0].password == req.body.password) {
      ob.value = true;
      ob.id = data[0].uid;
    }

    return res.json(ob);
  });
});

app.post("/addItem", (req, res) => {
  var uid = req.body.uid;
  var name = req.body.name;
  var desc = req.body.desc;
  var loc = req.body.location;
  var category = req.body.category;
  var pic = req.body.picture;
  var today = new Date();

  // Get the day of the month
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }

  today = yyyy + "-" + mm + "-" + dd;
  console.log(today);

  var query = "SELECT MAX(`iid`) as `iid` from `items`";
  db.query(query, (err, data) => {
    const iid = data[0].iid + 1;

    console.log(iid);
    const q =
      "INSERT INTO `items` (`iid`, `uid`, `name`, `desc`, `category`, `location`, `date`) VALUES (" +
      iid +
      ", " +
      uid +
      ", '" +
      name +
      "', '" +
      desc +
      "', '" +
      category +
      "', '" +
      loc +
      "', " +
      today +
      ")";
    db.query(q, (err, data) => {
      console.log(data);
      if (err) console.log(err);

      return res.json({ status: 200 });
    });
  });
});

app.post("/updateItem", (req, res) => {
  var iid = req.body.iid;
  var name = req.body.name;
  var desc = req.body.desc;
  var loc = req.body.location;
  var category = req.body.category;
  var pic = req.body.picture;

  const q =
    "UPDATE `items` SET `name` = '" +
    name +
    "', `desc` = '" +
    desc +
    "', `category` = '" +
    category +
    "', `location` = '" +
    loc +
    "' WHERE `iid` = " +
    iid;
  db.query(q, (err, data) => {
    if (err) console.log(error);

    return res.json({ status: 200 });
  });
});

app.post("/updateProfile", (req, res) => {
  const q =
    "UPDATE `users` SET `email` = '" +
    req.body.email +
    "', `phone` = '" +
    req.body.phone +
    "', `password` = '" +
    req.body.pass +
    "' WHERE `uid` = " +
    req.body.uid;

  db.query(q, (err, data) => {
    if (err) console.log(err);
    return res.json({ status: 200 });
  });
});

app.post("/getCategories", (req, res) => {
  const q =
    "SELECT DISTINCT(`category`) FROM `items` WHERE `uid` = " + req.body.uid;
  db.query(q, (err, data) => {
    if (err) console.log(err);
    return res.json(data);
  });
});

app.post("/getProfile", (req, res) => {
  const q = "SELECT * FROM `users` WHERE `uid` = " + req.body.uid;
  db.query(q, (err, data) => {
    if (err) console.log(err);
    console.log(data);
    return res.json(data);
  });
});

app.post("/removeItem", (req, res) => {
  console.log(req.body.id);
  const q = "DELETE FROM `items` WHERE `iid` = " + req.body.id;
  db.query(q, (err, data) => {
    if (err) console.log(err);
    console.log(data);
  });
  return res.json({ status: 200 });
});

app.post("/getCategoryItems", (req, res) => {
  const q =
    "SELECT * FROM items WHERE `uid` = " +
    req.body.uid +
    " AND `category` = '" +
    req.body.category +
    "'";

  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/search", (req, res) => {
  const id = req.body.uid;
  const name = req.body.name;

  const q = "SELECT * FROM items WHERE `uid` = " + id + " AND `name` LIKE '%" + name + "%'";
  db.query (q, (err, data) => {
    if (err) {
      console.log (err);
      return res.json (err);
    }
    return res.json (data);
  });
});

app.post("/voiceRequest", (req, res) => {
  var q = req.body.query;
  console.log(q);

  var arr = q.split(" ");
  console.log(arr[0]);
  if (arr[0] == "INSERT") {
    var arr1 = q.split("'");
    const name = arr1[1];
    const loc = arr1[3];
    const uid = arr[8];

    var query = "SELECT MAX(`iid`) as `iid` from `items`";
    db.query(query, (err, data) => {
      const iid = data[0].iid + 1;
      const q1 =
        "INSERT INTO `items` (`iid`, `uid`, `name`, `category`, `location`) VALUES (" +
        iid +
        ", " +
        uid +
        ", '" +
        name +
        "', 'Misc', '" +
        loc +
        "')";
      console.log(q1);
      db.query(q1, (err, data) => {
        if (err) return res.json(err);
        console.log(data);
        return res.json(data);
      });
    });
  } else {
    db.query(q, (err, data) => {
      if (err) return res.json(err);
      console.log(data);
      return res.json(data);
    });
  }
});

app.post("/getItems", (req, res) => {
  const q = "SELECT * FROM items WHERE `uid` = (?)";
  const values = [req.body.uid];
  db.query(q, [values], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Connected to Backend");
});
