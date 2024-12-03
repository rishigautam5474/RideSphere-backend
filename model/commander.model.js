import mongoose from "mongoose";

const commanderSchema = new mongoose.Schema({
    firtName: {
        type: String,
        required : true,
        minlength: [3, "Fisrt Name must be at least 3 characters long"]
    },
    lastName: {
        type: String,
        required: true,
        minlength: [3, "Last Name must be at least 3 characters long"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [3, "Email must be at least 3 characters long"]
    },
    soketId: {
        type: String
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive",
    },
    vehicleDetails: {
        plateNumber: {
            type: String,
            required: "true"
        },
        color: {
            type: String,
            required: true
        },
        capacity: {
            type: Number,
            required: true
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'motercycle', 'auto']
        }
    },
    location: {
        // Latitude and Longitude
        lat: {
            type: Number
        },
        long: {
            type: String
        }
    }
}, {timestamps: true})

const Commander = mongoose.model("Commander", commanderSchema);

export default Commander;