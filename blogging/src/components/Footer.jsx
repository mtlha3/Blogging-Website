import React from 'react';

function Footer() {
  return (
    <div className="bg-[#58999E] text-white py-4 px-32 bottom-0">
      <div className="text-4xl font-bold mb-4">
        PersonaCraft
      </div>
      <div className="flex justify-between items-center text-sm">
        <p>© PersonaCraft, 2024. Powered by NZT-48.</p>
        <div className="flex space-x-4">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">Contact</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
        </div>
        <div className="flex space-x-4 text-white">
          <a href="#" className="hover:text-gray-800 hover:shadow-[0_0_10px_white] transition-shadow duration-300 px-2 rounded">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="hover:text-gray-800 hover:shadow-[0_0_10px_white] transition-shadow duration-300 px-2 rounded">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="hover:text-gray-800 hover:shadow-[0_0_10px_white] transition-shadow duration-300 px-2 rounded">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
