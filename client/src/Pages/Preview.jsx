import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import Loader from "../components/Loader";
import ResumePreview from "../components/ResumePreview";
import { ArrowLeftIcon } from "lucide-react";
import { useEffect } from "react";

const Preview = ({ data }) => {
  const { resumeId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [resumeData, setResumeData] = useState(null);

  const loadResume = () => {
    setResumeData(
      dummyResumeData.find((resume) => resume._id === resumeId || null)
    );
    setIsLoading(false);
  };

  useEffect(() => {
    loadResume();
  }, []);

  return resumeData ? (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-3xl mx-auto py-10">
        <ResumePreview
          classes="py-4 bg-white"
          data={resumeData}
          template={resumeData.template}
          accentColor={resumeData.accent_color}
        />
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-screen">
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <p className="text-center text-6xl text-slate-400 font-medium">
            Resume Not Found
          </p>
          <a
            href="/"
            className="mt-6 bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6 h-9 m-1 ring-offset-1 ring-1 ring-green-400 flex items-center transition-colors"
          >
            <ArrowLeftIcon className="mr-2 size-4" />
            go to home
          </a>
        </div>
      )}
    </div>
  );
};

export default Preview;
