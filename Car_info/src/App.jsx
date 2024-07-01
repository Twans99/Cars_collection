import './App.css'
// import Navbar from "./pages/Navbar"
// import Home from "./pages/home"
// import Cars from "./pages/cars"
import axios from 'axios'
import { useState, useEffect } from 'react'

axios.defaults.baseURL = "http://localhost:3000/"

function App() {

  const [inputCarregis, setinputCarregis] = useState("")
  const [inputBrand, setinputBrand] = useState("")
  const [inputModel, setinputModel] = useState("")
  const [inputNote, setinputNote] = useState("")
  const [inputColor, setinputColor] = useState("")
  const [cars, setCars] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editCarID, setEditCarID] = useState(0);
  const [editCarregis, setEditCarregis] = useState("");
  const [editBrand, setEditBrand] = useState("");
  const [editModel, setEditModel] = useState("");
  const [editNote, setEditNote] = useState("");
  const [editColor, setEditColor] = useState("");

  useEffect(() => {
    const res = axios.get("/car_info").then(res => {
      setCars(res.data)
    })
  }, [])

  async function addCar(e) {
    const newcar = {
      car_regis: inputCarregis,
      car_brand: inputBrand,
      car_model: inputModel,
      note: inputNote,
      color: inputColor,
    }

    const res = await axios.post("/car_info", newcar)
    if (res.data.success) {
      setCars(prevcars => [...prevcars, res.data.newcar.rows[0]])
    }
    setinputCarregis("")
    setinputBrand("")
    setinputModel("")
    setinputNote("")
    setinputColor("")
  }

  async function editCars(e, car) {
    setEditMode(true)
    setEditCarID(car.carid)
    setEditCarregis(car.car_regis)
    setEditBrand(car.car_brand)
    setEditModel(car.car_model)
    setEditNote(car.note)
    setEditColor(car.color)

  }

  async function UpdateCar(e) {
    const Upcar = {
      car_regis: editCarregis,
      car_brand: editBrand,
      car_model: editModel,
      note: editNote,
      color: editColor,
    }
    const res = await axios.put(`/car_info/${editCarID}`, Upcar)
    setEditMode(true)
  }

  async function delCars(e, car) {
    const res = await axios.delete(`/car_info/${car.carid}`)
    if (res.data.success) {
      setCars((prevcars) => prevcars.filter((c) => c.carid != car.carid))
    }
  }

  async function clearinfo(e) {
    const res = await axios.delete("/delete")
    setCars([])
  }

  if (editMode) {
    return (
      <form className='' onSubmit={UpdateCar}>
        <p>Edit Cars</p>
        <div>
          <label>Car Regis:</label>
          <input type="text"
            placeholder='edit or change'
            value={editCarregis}
            onChange={(e) => setEditCarregis(e.target.value)}
          />

          <label>Car Brand:</label>
          <input type="text"
            placeholder='edit or change'
            value={editBrand}
            onChange={(e) => setEditBrand(e.target.value)}
          />

          <label>Car Model:</label>
          <input type="text"
            placeholder='edit or change'
            value={editModel}
            onChange={(e) => setEditModel(e.target.value)}
          />

          <label>Car Note:</label>
          <input type="text"
            placeholder='edit or change'
            value={editNote}
            onChange={(e) => setEditNote(e.target.value)}

          />
          <label>Car Color:</label>
          <input type="text"
            placeholder='edit or change'
            value={editColor}
            onChange={(e) => setEditColor(e.target.value)}
          />
        </div>
        <div>
          <button className=''>Summit</button>
        </div>
      </form>
    )
  }

  return (
    <div className="container mt-5">
  <div className="text-center mb-4">
    <h1 className="display-4">Cars Collection</h1>
  </div>
  <div className="row mb-4">
    <div className="col">
      <input
        className="form-control mb-2"
        type="text"
        placeholder="Enter the car regis here"
        value={inputCarregis}
        onChange={(e) => setinputCarregis(e.target.value)}
      />
    </div>
    <div className="col">
      <input
        className="form-control mb-2"
        type="text"
        placeholder="Enter the car Brand here"
        value={inputBrand}
        onChange={(e) => setinputBrand(e.target.value)}
      />
    </div>
    <div className="col">
      <input
        className="form-control mb-2"
        type="text"
        placeholder="Enter a car Model here"
        value={inputModel}
        onChange={(e) => setinputModel(e.target.value)}
      />
    </div>
    <div className="col">
      <input
        className="form-control mb-2"
        type="text"
        placeholder="Enter a Note here"
        value={inputNote}
        onChange={(e) => setinputNote(e.target.value)}
      />
    </div>
    <div className="col">
      <input
        className="form-control mb-2"
        type="text"
        placeholder="Enter the car Color here"
        value={inputColor}
        onChange={(e) => setinputColor(e.target.value)}
      />
    </div>
  </div>
  <div className="text-center mb-4">
    <button className="btn btn-primary mr-2" onClick={addCar}>Add</button>
    <button className="btn btn-secondary" onClick={clearinfo}>Clear</button>
  </div>
  {cars.length >= 1 && (
    <div className="row">
      {cars.map((car, index) => (
        <div key={car.carid} className="col-md-4 mb-3">
          <div className="card h-100 custom-card">
            <div className="card-body">
              <h5 className="card-title">{car.car_brand} - {car.car_model}</h5>
              <p className="card-text"><strong>Registration:</strong> {car.car_regis}</p>
              <p className="card-text"><strong>Note:</strong> {car.note}</p>
              <p className="card-text"><strong>Color:</strong> {car.color}</p>
            </div>
            <div className="card-footer text-center">
              <button className="btn btn-warning mr-2" onClick={(e) => editCars(e, car)}>Edit</button>
              <button className="btn btn-danger" onClick={(e) => delCars(e, car)}>Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

  )
}

export default App
