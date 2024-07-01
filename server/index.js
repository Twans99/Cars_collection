const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const pool = require("./db")

dotenv.config()

const PORT = process.env.PORT
const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req,res) => {
    res.json({msg: "Hello world"})
})

app.get("/car_info", async (req, res)=> {
    try {
        const tasks = await pool.query("Select * FROM car_info")
        res.json(tasks.rows)
    } catch (error) {
        res.json(error)
    }
})

app.post("/car_info", async (req, res) => {
    try {
        const {car_regis, car_brand, car_model, note, color} = req.body
        console.log(car_regis, car_brand, car_model, note, color)
        // console.log("Request body:", req.body);
        const newcar = await pool.query("INSERT INTO car_info (car_regis, car_brand, car_model, note, color) VALUES($1, $2, $3, $4, $5) RETURNING *",[car_regis, car_brand, car_model, note, color])
        res.json({newcar, msg:"car have added", success: true})

    } catch (error) {
        res.json(error)
    }
})

app.get("/car_info/:id", async (req, res) => {
    try {
      const {id} = req.params;
      const task = await pool.query("SELECT * FROM car_info WHERE carid = $1",[id]);
      res.json(task.rows)
    } catch (error) {
      res.json({error})
    }
  })
  
  app.put("/car_info/:id", async (req, res) => {
    try {
      const {id} = req.params;
      const {car_regis, car_brand, car_model, note, color} = req.body
      const info = await pool.query(
        "UPDATE car_info SET car_regis = $1, car_brand = $2, car_model = $3, note = $4, color = $5 WHERE carid = $6",[car_regis, car_brand, car_model, note, color, id]);
      res.json({ msg:"New car updated", success:true})
    } catch (error) {
      res.json({error})
    }
  });
  
  app.delete("/car_info/:id", async (req, res) => {
    try {
      const {id} = req.params;
      const deltask = await pool.query("DELETE FROM car_info WHERE carid = $1", [id])
      res.json({msg:"Task deleted", success:true })
    } catch (error) {
      res.json(error)
    }
  });
  
  app.delete("/delete", async (req, res) => {
    try {
      const delAlltasks = await pool.query("DELETE FROM car_info")
      res.json({msg:"All tasks deleted!", success:true })
    } catch (error) {
      res.json(error)
    }
  })

app.listen(PORT, () =>{
    console.log(`running on PORT ${PORT}`)
})