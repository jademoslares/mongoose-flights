const Flights = require("../models/flights");

module.exports = {
  index,
  show,
  new: newFlight,
  create,
};

async function index(req, res) {
  const flights = await Flights.find({}).sort({ departs: "asc" });
  res.render("flights/index", { title: "All Flights", flights });
}

async function show(req, res) {
  const flight = await Flights.findById(req.params.id);
  let defaultDate = new Date(flight.departs);

  res.render("flights/show", { title: "Flight Detail", flight, defaultDate});
}

function newFlight(req, res) {
  const newFlight = new Flights();
  const dt = newFlight.departs;

  let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1)
    .toString()
    .padStart(2, "0")}`;
  departsDate += `-${dt.getDate().toString().padStart(2, "0")}T${dt
    .toTimeString()
    .slice(0, 5)}`;

  console.log(departsDate);
  res.render("flights/new", {
    title: "Add Flight",
    errorMsg: "",
    departsDate,
    newFlight,
  });
}

async function create(req, res) {
  const flight = new Flights(req.body);

  for (let key in req.body) {
    if (req.body[key] === "") delete req.body[key];
  }

  try {
    await flight.save();
    res.redirect("/flights");
  } catch (err) {
    res.render("flights/new", { title: "Add Flight", errorMsg: err.message });
  }
}
