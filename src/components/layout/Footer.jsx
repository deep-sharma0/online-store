import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-10 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-600 dark:text-gray-400">
      
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        
        {/* 🔹 Left: Branding */}
        <p className="text-sm text-center sm:text-left">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            Deep Sharma
          </span>
          . Built with React & Tailwind.
        </p>

        {/* 🔹 Center: Project Name */}
        <p className="text-sm text-center">
          <span className="text-cyan-500 font-medium">
            Online Store
          </span>{" "}
          – Modern E-commerce UI
        </p>

        {/* 🔹 Right: Social Links */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/deep-sharma0"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-500 transition"
          >
            <Github className="w-5 h-5" />
          </a>

          <a
            href="https://www.linkedin.com/in/deepsharma04/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-500 transition"
          >
            <Linkedin className="w-5 h-5" />
          </a>

          <a
            href="mailto:deepsharma041122@gmail.com"
            className="hover:text-cyan-500 transition"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;