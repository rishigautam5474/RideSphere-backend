import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const commanderSchema = new mongoose.Schema({
    firstName: {
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
    password: {
        type: String,
        required: true,
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
            required: true,
            min: 0
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

commanderSchema.pre('save', async function (next){
    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12)
    }
    next();
})

commanderSchema.methods.comparePassword = async function(enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
}

const Commander = mongoose.model("Commander", commanderSchema);

export default Commander;