import {
  FilePenIcon,
  Pencil,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloudIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { dummyResumeData } from "../assets/assets";

const Dashboard = () => {
  const colors = ["#8b5cf6", "#60a5fa", "#34d399", "#f472b6", "#a78bfa"];
  const [allResumes, setAllResumes] = useState([]);

  const loadAllResumes = async () => {
    setAllResumes(dummyResumeData);
  };

  useEffect(() => {
    loadAllResumes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-2xl font-medium mb-6 bg-gradient-to-r from-gray-300 to-white bg-clip-text text-transparent sm:hidden">
          {" "}
          Welcome,user
        </p>

        <div className="flex gap-4">
          <button className="w-full bg-gradient-to-br from-gray-800 to-gray-900 sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-gray-300 border border-dashed border-gray-700 group hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 cursor-pointer">
            <PlusIcon className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full" />
            <p className="text-sm group-hover:text-blue-400 transition-all duration-300">
              Create Resume
            </p>
          </button>
          <button className="w-full bg-gradient-to-br from-gray-800 to-gray-900 sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-gray-300 border border-dashed border-gray-700 group hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 cursor-pointer">
            <UploadCloudIcon className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full" />
            <p className="text-sm group-hover:text-blue-400 transition-all duration-300">
              Upload Existing
            </p>
          </button>
        </div>
        <hr className="border-gray-700 my-6 sm:w-[305px]" />

        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
          {allResumes.map((resume, index) => {
            const basecolor = colors[index % colors.length];
            return (
              <button
                key={index}
                className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg,${basecolor}10, ${basecolor}40)`,
                  borderColor: basecolor + "40",
                }}
              >
                <FilePenIcon
                  className="size-7 group-hove:scale-105 transition-all"
                  style={{ color: basecolor }}
                />
                <p
                  className="text-sm group-hover:scale-105 transition-all px-2 text-center"
                  style={{ color: basecolor }}
                >
                  {resume.title}
                </p>
                <p
                  className="absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2 text-center"
                  style={{ color: basecolor + "90" }}
                >
                  Updated On {new Date(resume.updatedAt).toLocaleDateString()}
                </p>
                <div className="absolute top-1 right-1 group-hover:flex items-center hidden">
                  <TrashIcon className="size-7 p-1.5 hover:bg-gray-700/50 rounded text-gray-300 transition-colors" />
                  <PencilIcon className="size-7 p-1.5 hover:bg-gray-700/50 rounded text-gray-300 transition-colors" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
