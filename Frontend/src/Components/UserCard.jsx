import React, { useState } from "react";
import { Github, Linkedin, Globe } from "lucide-react";

const UserCard = ({ name, bio, image, skills, github, linkedin, portfolio }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Card */}
      <div className="w-full max-w-sm bg-slate-900 text-white rounded-2xl shadow-lg border border-slate-700 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-6">
        <div className="flex flex-col items-center text-center">
          {/* Avatar */}
          <div className="avatar mb-3">
            <div className="w-24 rounded-full ring ring-blue-500 ring-offset-base-100 ring-offset-2">
              <img src={image} alt={name} />
            </div>
          </div>

          {/* Name & Bio */}
          <h2 className="text-xl font-bold tracking-wide">{name}</h2>
          <p className="mt-2 text-sm text-slate-300 line-clamp-2">{bio}</p>

          {/* Social Icons */}
          <div className="mt-3 flex gap-4">
            {github && (
              <a href={github} target="_blank" rel="noreferrer">
                <Github className="w-5 h-5 hover:text-blue-400 transition" />
              </a>
            )}
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noreferrer">
                <Linkedin className="w-5 h-5 hover:text-blue-400 transition" />
              </a>
            )}
            {portfolio && (
              <a href={portfolio} target="_blank" rel="noreferrer">
                <Globe className="w-5 h-5 hover:text-blue-400 transition" />
              </a>
            )}
          </div>

          {/* Action Buttons on Card */}
          <div className="mt-5 flex justify-center gap-3">
            <button className="btn btn-sm btn-success">Connect</button>
            <button className="btn btn-sm btn-outline border-red-500 text-red-400 hover:bg-red-500 hover:text-white">
              Ignore
            </button>
          </div>

          {/* View More */}
          <button
            onClick={() => setShowModal(true)}
            className="mt-3 text-sm text-blue-400 hover:underline"
          >
            View Profile
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center px-4">
          <div className="bg-slate-800 text-white rounded-2xl p-6 max-w-lg w-full relative">
            <button
              className="absolute top-2 right-3 text-white text-xl"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
            <div className="text-center">
              <img
                src={image}
                alt={name}
                className="w-24 h-24 rounded-full mx-auto ring ring-blue-500 ring-offset-base-100 ring-offset-2"
              />
              <h2 className="text-2xl font-semibold mt-3">{name}</h2>
              <p className="text-sm text-slate-300 mt-2">{bio}</p>

              {/* Skills in Modal */}
              {skills?.length > 0 && (
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {skills.map((skill, i) => (
                    <span
                      key={i}
                      className="badge badge-outline border-blue-400 text-blue-300 text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              {/* Socials in Modal */}
              <div className="mt-5 flex justify-center gap-4">
                {github && (
                  <a href={github} target="_blank" rel="noreferrer" className="hover:text-blue-400">
                    <Github />
                  </a>
                )}
                {linkedin && (
                  <a href={linkedin} target="_blank" rel="noreferrer" className="hover:text-blue-400">
                    <Linkedin />
                  </a>
                )}
                {portfolio && (
                  <a href={portfolio} target="_blank" rel="noreferrer" className="hover:text-blue-400">
                    <Globe />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserCard;
