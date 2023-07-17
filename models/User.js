const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'Please enter your fullname'],
        trim: true
    },
    username: {
        type: String,
        required: [true, 'Please enter your username'], 
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        trim: true,
        minlength: [6, 'Password should be atleast 6 character long']
    },


    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, { timestamps: true });

// hash password before saving user
userSchema.pre('save', async function(next) {

    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }

    next();
}
);

// generate token
userSchema.methods.generateAuthToken = async function() {

    try {
        const token = jwt.sign({ _id: this._id }, process.env.JWT_KEY);
        // update existing token
        if(this.tokens.length > 0 ) {
            this.tokens.splice(0, this.tokens.length, { token });
            
        }else{
            // create new token
            this.tokens = this.tokens.concat({ token });
        }

        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
}

userSchema.statics.findByCredentials = async function (email, password) {
    const User = this;
    // Find the user by email
    const user = await User.findOne({ email });
  
    if (!user) {
      throw new Error('Invalid email or password');
    }
  
    // Compare the provided password with the hashed password stored in the database
    const isPasswordMatch = await bcrypt.compare(password, user.password);
  
    if (!isPasswordMatch) {
      throw new Error('Invalid email or password');
    }
  
    return user;
  };

const User = mongoose.model('User', userSchema);

module.exports = User;