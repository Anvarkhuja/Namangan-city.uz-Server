import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"namangan"
})

app.use(express.json())
app.use(cors())

app.get("/", (req,res)=>{
    res.json("hello from backend")
})
//hotels
app.get("/hotels", (req,res)=>{
    const q = "SELECT * FROM hotels"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})
app.get("/hotels/:id", (req,res)=>{
   
    const hotelId = req.params.id;
    const q = "SELECT * FROM hotels WHERE id = ?"
    db.query(q,[hotelId],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/hotels", (req,res)=>{
    const q = "INSERT INTO hotels (`img`, `desc`, `label`, `link`) VALUES (?)"
    const values = [
      req.body.img,
      req.body.desc,
      req.body.label,
      req.body.link,
    
    ]

    db.query(q,[values], (err,data)=>{
        if(err) return res.json(err)
        return res.json("hotel has been created.");
    });
});

app.delete("/hotels/:id", (req,res)=>{
    const hotelId = req.params.id;
    const q = "DELETE FROM hotels WHERE id = ?"

    db.query(q,[hotelId], (err,data)=>{
        if(err) return res.json(err)
        return res.json("hotel has been deleted.");
    });
});

app.put("/hotels/:id", (req,res)=>{
    const hotelId = req.params.id;
    const q = "UPDATE hotels SET `img` = ?, `desc` = ?, `label` = ?, `link` = ? WHERE id = ?";

    const values=[
        req.body.img,
        req.body.desc,
        req.body.label,
        req.body.link,
      
    ]

    db.query(q,[...values,hotelId], (err,data)=>{
        if(err) return res.json(err)
        return res.json("hotels has been updated.");
    });
});
//destinations




app.get("/destinations", (req,res)=>{
    const q = "SELECT * FROM destinations"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/destinations", (req,res)=>{
    const q = "INSERT INTO destinations (`img`, `desc`, `label` ) VALUES (?)"
    const values = [
      req.body.img,
      req.body.desc,
      req.body.label,
    
    ]

    db.query(q,[values], (err,data)=>{
        if(err) return res.json(err)
        return res.json("destination has been created.");
    });
});

app.delete("/destinations/:id", (req,res)=>{
    const destinationId = req.params.id;
    const q = "DELETE FROM destinations WHERE id = ?"

    db.query(q,[destinationId], (err,data)=>{
        if(err) return res.json(err)
        return res.json("destination has been deleted.");
    });
});

app.put("/destinations/:id", (req,res)=>{
    const destinationId = req.params.id;
    const q = "UPDATE destinations SET `img` = ?, `desc` = ?, `label` = ? WHERE id = ?";

    const values=[
        req.body.img,
        req.body.desc,
        req.body.label,
      
    ]

    db.query(q,[...values,destinationId], (err,data)=>{
        if(err) return res.json(err)
        return res.json("destinations has been updated.");
    });
});
//restourants
app.get("/restourants", (req,res)=>{
    const q = "SELECT * FROM restourants"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/restourants", (req,res)=>{
    const q = "INSERT INTO restourants (`img`, `desc`, `label`) VALUES (?)"
    const values = [
      req.body.img,
      req.body.desc,
      req.body.label,
    
    ]

    db.query(q,[values], (err,data)=>{
        if(err) return res.json(err)
        return res.json("restourant has been created.");
    });
});

app.delete("/restourants/:id", (req,res)=>{
    const restourantId = req.params.id;
    const q = "DELETE FROM restourants WHERE id = ?"

    db.query(q,[restourantId], (err,data)=>{
        if(err) return res.json(err)
        return res.json("restourant has been deleted.");
    });
});

app.put("/restourants/:id", (req,res)=>{
    const restourantId = req.params.id;
    const q = "UPDATE restourants SET `img` = ?, `desc` = ?, `label` = ? WHERE id = ?";

    const values=[
        req.body.img,
        req.body.desc,
        req.body.label,
      
    ]

    db.query(q,[...values,restourantId], (err,data)=>{
        if(err) return res.json(err)
        return res.json("restourants has been updated.");
    });
});
// login  register
app.post("/signup", (req,res)=>{
    const q = "INSERT INTO login (`name`, `email`, `password`) VALUES (?)"
    const values = [
      req.body.name,
      req.body.email,
      req.body.password,
      
    
    ]

    db.query(q,[values], (err,data)=>{
        if(err) return res.json(err)
        return res.json("user has been created.");
    });
})


app.post("/login", (req,res)=>{
    const q = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";
    db.query(q,[req.body.email,req.body.password], (err,data)=>{
        if(err) {
            return res.json("Error")
        }
        if(data.length > 0) {
            return res.json("Success");
        } else {
            return res.json("Failure");
        }
    });
});


app.listen(8000, ()=> {
    console.log("Connection to MySQL!")
})