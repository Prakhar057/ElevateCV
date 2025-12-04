import {
  FilePenIcon,
  Pencil,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloudIcon,
  XIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { dummyResumeData } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const colors = ["#8b5cf6", "#60a5fa", "#34d399", "#f472b6", "#a78bfa"];

  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setshowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState(``);
  const navigate = useNavigate();

  const loadAllResumes = async () => {
    setAllResumes(dummyResumeData);
  };
  const createResume = async (event) => {
    event.preventDefault();
    setshowCreateResume(false);
    navigate(`/app/builder/resume123`);
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
          <button
            onClick={() => setshowCreateResume(true)}
            className="w-full bg-gradient-to-br from-gray-800 to-gray-900 sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-gray-300 border border-dashed border-gray-700 group hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 cursor-pointer"
          >
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
        <div>
          {showCreateResume && (
            <form
              onSubmit={createResume}
              onClick={() => setshowCreateResume(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
              >
                <h2 className="text-xl font-bold mb-4">Create a Resume</h2>
                <input
                  type="text"
                  placeholder="Enter a resume title "
                  className="w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600 "
                  required
                />
                <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                  Create Resume
                </button>
                <XIcon
                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                  onClick={() => {
                    setshowCreateResume(false);
                    setTitle(``);
                  }}
                />
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
