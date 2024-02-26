const mongoose = require("mongoose");
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const destinationSchema = new Schema(
  {
    airport: {
      type: String,
      enum: ["AUS", "DFW", "DEN", "LAX", "SAN"],
    },
    arrival: Date,
  },
  {
    timestamps: true,
  }
);

const flightSchema = new Schema(
  {
    airline: { type: String, enum: ["American", "Southwest", "United"] },
    airport: {
      type: String,
      enum: ["AUS", "DFW", "DEN", "LAX", "SAN"],
      default: "DEN",
    },
    flightNo: { type: Number, min: 10, max: 9999 },
    departs: {
      type: Date,
      default: function () {
        return new Date(new Date().setFullYear(new Date().getFullYear() + 1));
      },
    },
    arrival: [destinationSchema],
    
  },
  {
    timestamps: true,
  }
);

// Compile the schema into a model and export it
module.exports = mongoose.model("Flight", flightSchema);
