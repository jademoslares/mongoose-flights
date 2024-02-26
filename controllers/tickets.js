const Ticket = require("../models/tickets");
const Flight = require("../models/flights");

module.exports = {
  create,
  index,
  delete: deleteTicket,
};

function index(req, res) {
  res.render("tickets/new", {
    title: "Add Ticket",
    flightId: req.params.id,
  });
}

async function create(req, res) {
  const flight = await Flight.findById(req.params.id);
  const ticket = new Ticket(req.body);
  ticket.flight = flight._id;

  console.log(req.params.id);
  console.log(flight._id);
  try {
    await ticket.save();
  } catch (err) {
    return res.render("tickets/new", {
      title: "Add Ticket",
      flightId: req.params.id,
    });
  }
  res.redirect(`/flights/${flight._id}`);
}

async function deleteTicket(req, res) {
  await Ticket.findByIdAndDelete(req.params.id);
  res.redirect(`/flights/${flight._id}`);
}
