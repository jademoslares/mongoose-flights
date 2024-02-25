const Flights = require("../models/flights");

module.exports = {
  create,
};

async function create(req, res) {
  const flight = await Flights.findById(req.params.id);

  flight.arrival.push(req.body);
  try {
    await flight.save();
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/flights/${flight._id}`);
}
