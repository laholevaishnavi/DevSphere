import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300 w-full mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-lg font-semibold">© {new Date().getFullYear()} DevSphere</h1>
          <div className="flex space-x-4 text-sm">
            <a href="/about" className="hover:text-white transition">About</a>
            <a href="/contact" className="hover:text-white transition">Contact</a>
            <a href="/privacy" className="hover:text-white transition">Privacy</a>
            <a href="/terms" className="hover:text-white transition">Terms</a>
          </div>
        </div>
        <div className="text-xs text-center mt-4 opacity-60">
          Built with 💻 using MERN, Tailwind CSS, and DaisyUI
        </div>
      </div>
    </footer>
  );
};

export default Footer;
