import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    console.table(user);
  }, []);

  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [photo, setPhoto] = useState(user.photo || "");
  const [skills, setSkills] = useState(
    Array.isArray(user.skills)
      ? user.skills
      : user.skills?.split(",").map((s) => s.trim()) || []
  );
  const [skillInput, setSkillInput] = useState("");


   const handleChanges = async()=>{
    try {
      const data = await axios.patch(BASE_URL + '/profile/edit',{firstName,lastName,age,gender,photoUrl: photo,about,skills},{withCredentials:true});
      dispatch(addUser(data.data));
      console.table(data);
    } catch (error) {
      console.error("Profile update failed:", error.response?.data || error.message);
      alert("Profile update failed: " + (error.response?.data || error.message));
    }
  }
  const handleSkillKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && skillInput.trim()) {
      e.preventDefault();
      const newSkill = skillInput.trim();
      if (!skills.includes(newSkill)) {
        setSkills([...skills, newSkill]);
      }
      setSkillInput("");
    }
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

 

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-gray-800 px-4 py-10 flex flex-col md:flex-row items-center justify-center gap-8">
      <div className="w-full max-w-2xl p-8 bg-base-100 text-base-content rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-6">Edit Profile</h2>

        {photo && (
          <div className="flex justify-center">
            <div className="avatar">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={photo} alt="Profile" />
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="input input-bordered w-full"
            placeholder="First Name"
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Last Name"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Age"
          />
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="">Select Gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </select>
        </div>

        <input
          type="text"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          className="input input-bordered w-full mt-4"
          placeholder="Photo URL"
        />

        <div className="mt-4">
          <label className="label">
            <span className="label-text">Skills</span>
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {skills.map((skill, idx) => (
              <div key={idx} className="badge badge-primary gap-2 items-center">
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="ml-1 text-white"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleSkillKeyDown}
            placeholder="Add skill and press Enter"
            className="input input-bordered w-full"
          />
        </div>

        <textarea
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          className="textarea textarea-bordered w-full mt-4"
          placeholder="Tell us about yourself..."
          rows={3}
        />

        <button
          type="button"
          onClick={() => handleChanges()}
          className="btn btn-primary w-full mt-6"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
