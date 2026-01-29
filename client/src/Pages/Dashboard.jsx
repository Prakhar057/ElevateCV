import {
  FilePenIcon,
  LoaderCircleIcon,
  Pencil,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloudIcon,
  XIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";
import pdfToText from "react-pdftotext";

const Dashboard = () => {
  const { user, token } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const colors = ["#8b5cf6", "#60a5fa", "#34d399", "#f472b6", "#a78bfa"];

  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setshowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState(``);
  const navigate = useNavigate();

  const loadAllResumes = async () => {
    try {
      const { data } = await api.get("/api/users/resumes", {
        headers: { Authorization: token },
      });
      setAllResumes(data.resumes);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };
  const createResume = async (event) => {
    try {
      event.preventDefault();
      const { data } = await api.post(
        "/api/resumes/create",
        { title },
        {
          headers: {
            Authorization: token,
          },
        },
      );
      setAllResumes([...allResumes, data.resume]);
      setTitle("");
      setshowCreateResume(false);
      navigate(`/app/builder/${data.resume._id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const uploadResume = async (event) => {
    event.preventDefault();

    if (!resume) {
      toast.error("Please select a PDF file to upload");
      return;
    }

    setIsLoading(true);
    try {
      const resumeText = await pdfToText(resume);

      if (!resumeText || resumeText.trim() === "") {
        toast.error(
          "Unable to extract text from PDF. Please try a different file.",
        );
        setIsLoading(false);
        return;
      }

      const { data } = await api.post(
        "/api/ai/upload-resume",
        { title, resumeText },
        {
          headers: {
            Authorization: token,
          },
        },
      );
      setTitle("");
      setResume(null);
      setShowUploadResume(false);
      navigate(`/app/builder/${data.resumeId}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
    setIsLoading(false);
  };

  const editTitle = async (event) => {
    try {
      event.preventDefault();
      const { data } = await api.put(
        `/api/resumes/update`,
        { resumeId: editResumeId, resumeData: { title } },
        { headers: { Authorization: token } },
      );
      setAllResumes(
        allResumes.map((resume) =>
          resume._id === editResumeId ? { ...resume, title } : resume,
        ),
      );
      setTitle("");
      setEditResumeId("");
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };
  const deleteResume = async (resumeId) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this resume",
      );
      if (confirm) {
        const { data } = await api.delete(`/api/resumes/delete/${resumeId}`, {
          headers: { Authorization: token },
        });
        setAllResumes(allResumes.filter((resume) => resume._id !== resumeId));
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
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
          <button
            onClick={() => setShowUploadResume(true)}
            className="w-full bg-gradient-to-br from-gray-800 to-gray-900 sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-gray-300 border border-dashed border-gray-700 group hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 cursor-pointer"
          >
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
                onClick={() => navigate(`/app/builder/${resume._id}`)}
                key={index}
                className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg,${basecolor}10, ${basecolor}40)`,
                  borderColor: basecolor + "40",
                }}
              >
                <FilePenIcon
                  className="size-7 group-hover:scale-105 transition-all"
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
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-1 right-1 group-hover:flex items-center hidden"
                >
                  <TrashIcon
                    onClick={() => deleteResume(resume._id)}
                    className="size-7 p-1.5 hover:bg-gray-700/50 rounded text-gray-300 transition-colors"
                  />
                  <PencilIcon
                    onClick={() => {
                      setEditResumeId(resume._id);
                      setTitle(resume.title);
                    }}
                    className="size-7 p-1.5 hover:bg-gray-700/50 rounded text-gray-300 transition-colors"
                  />
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
                className="relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 shadow-2xl rounded-lg w-full max-w-sm p-6"
              >
                <h2 className="text-xl font-bold mb-4 text-white">
                  Create a Resume
                </h2>
                <input
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  placeholder="Enter a resume title"
                  className="w-full px-4 py-2 mb-4 bg-gray-900 border border-gray-700 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                />
                <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Create Resume
                </button>
                <XIcon
                  className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer transition-colors"
                  onClick={() => {
                    setshowCreateResume(false);
                    setTitle(``);
                  }}
                />
              </div>
            </form>
          )}
          {showUploadResume && (
            <form
              onSubmit={uploadResume}
              onClick={() => setShowUploadResume(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 shadow-2xl rounded-lg w-full max-w-sm p-6"
              >
                <h2 className="text-xl font-bold mb-4 text-white">
                  Upload a Resume
                </h2>
                <input
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  placeholder="Enter a resume title"
                  className="w-full px-4 py-2 mb-4 bg-gray-900 border border-gray-700 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                />
                <div>
                  <label
                    htmlFor="resume-input"
                    className="block text-sm text-gray-300"
                  >
                    Select Resume File
                    <div className="flex flex-col items-center justify-center gap-2 border group text-gray-400 border-gray-600 border-dashed rounded-md p-4 py-10 my-4 hover:border-blue-500 hover:text-blue-400 cursor-pointer transition-colors">
                      {resume ? (
                        <p className="text-blue-400">{resume.name}</p>
                      ) : (
                        <>
                          <UploadCloudIcon className="size-14 stroke-1" />
                          <p>Upload Resume</p>
                        </>
                      )}
                    </div>
                  </label>
                  <input
                    type="file"
                    id="resume-input"
                    accept=".pdf"
                    hidden
                    onChange={(e) => setResume(e.target.files[0])}
                  />
                </div>
                <button
                  disabled={isLoading}
                  className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex  items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading && (
                    <LoaderCircleIcon className="animate-spin size-4 text-white" />
                  )}
                  {isLoading ? "Uploading..." : "Upload Resume"}
                </button>
                <XIcon
                  className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer transition-colors"
                  onClick={() => {
                    setShowUploadResume(false);
                    setTitle(``);
                  }}
                />
              </div>
            </form>
          )}
          {editResumeId && (
            <form
              onSubmit={editTitle}
              onClick={() => setEditResumeId("")}
              className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 shadow-2xl rounded-lg w-full max-w-sm p-6"
              >
                <h2 className="text-xl font-bold mb-4 text-white">
                  Edit Resume Title
                </h2>
                <input
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  placeholder="Enter a resume title"
                  className="w-full px-4 py-2 mb-4 bg-gray-900 border border-gray-700 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                />
                <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Update
                </button>
                <XIcon
                  className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer transition-colors"
                  onClick={() => {
                    setEditResumeId("");
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
