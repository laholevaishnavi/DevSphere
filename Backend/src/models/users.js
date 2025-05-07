import mongoose from 'mongoose';
import validator from 'validator';
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

  },
  {
    timestamps: true
  })

export const User = mongoose.model("User", userSchema);
//Users == User b'coz mongoose pluralize the model name....
//capital letter sae name start karo!!
