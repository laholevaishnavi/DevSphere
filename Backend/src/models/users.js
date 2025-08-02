import mongoose from 'mongoose';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
const userSchema = mongoose.Schema(
  {

    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    age: {
      type: Number,
    },
    emailId: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
      validate(value){
        if(!validator.isEmail(value)){
          throw new Error("Invalis email address:" + value);
          
        }
      }

    },
    password: {
      type: String,
      required: true,
      validate(value){
        if(!validator.isStrongPassword(value)){
          throw new Error("Enter a Strong Password: " + value);
          
        }
      }
    },
    gender: {
      type: String,
      //custom validation function for gender
      validate(value) {
        if (!['male', 'female', 'other'].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      }
    },
    about: {
      type: String,
      default: "Hey there! I am an enthusiastic learner!",
    },
    photoUrl: {
      type: String,
      default: "https://geographyandyou.com/images/user-profile.png",
    },
    skills: {
      type: [String],
    },
    isPremium :{
      type: Boolean,
      default: false,
    },
    membershipType : {
      type: String,
    }

  },
  {
    timestamps: true
  });

  userSchema.methods.validatePassword = async function (passwordInputByUser){
        const user = this;
        const passwordHash = user.password;
        const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
        return isPasswordValid
  ;  
  }

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({userId: user._id },process.env.JWT_SECRET,{
    expiresIn: "7d",
  });
  return token
}

export const User = mongoose.model("User", userSchema);
//Users == User b'coz mongoose pluralize the model name....
//capital letter sae name start karo!!
