import React from "react";

const CallToAction = () => {
  return (
    <div
      id="cta"
      className="py-2 border-y border-dashed border-gray-700 w-full  px-10 sm:px-16 bg-gradient-to-b from-black via-gray-900 to-black"
    >
      <div className="flex flex-col md:flex-row text-center md:text-left items-center justify-between gap-8 px-3 md:px-10 border-x border-dashed border-gray-700 py-16 sm:py-20 -mt-5  w-full">
        <p className="text-xl font-medium max-w-md text-white">
          Build a professional resume that helps you stand out and get hired
          fast.
        </p>
        <a
          href="https://prebuiltui.com"
          className="flex items-center gap-2 rounded py-3 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-white shadow-lg hover:shadow-xl border border-blue-500/30"
        >
          <span>Get Started</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4.5"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default CallToAction;
