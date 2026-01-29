import { Loader2, Sparkles } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";

const ProfessionalSummaryForm = ({ data, onChange, setResumeData }) => {
  const {token} = useSelector(state=>state.auth)
  const [isGenerating,setIsGenerating] = useState(false)

  const generateSummary = async()=>{
    try{
      setIsGenerating(true);
      const prompt = `Enhance my professional summary "${data}"`
      const response = await api.post("/api/ai/enhance-pro-sum", {userContent : prompt}, {headers:{Authorization :token}})
      setResumeData(prev=>({...prev,professional_summary : response.data.enhancedContent}))

    }catch(error){
      toast.error(error?.response?.data?.message || error.message)
    }
    finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
            Professional Summary
          </h3>
          <p className="text-sm text-gray-400">
            Add Summary for your resume here
          </p>
        </div>
        <button
          disabled={isGenerating}
          onClick={generateSummary}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isGenerating ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Sparkles className="size-4" />
          )}
          { isGenerating ? "Enhancing..."  : "AI Enhance"}
        </button>
      </div>
      <div className="mt-6">
        <textarea
          value={data || ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-50 p-3 px-4 mt-2 bg-gray-900 border text-sm border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none text-white placeholder-gray-500"
          name=""
          id=""
          placeholder="Write a compelling professional summary that highlights your key strengths and career objectives..."
        />
        <p className="text-sm text-gray-400 mt-2">
          Tip: Keep it concise (3-4 sentences) and focus on your most relevant
          achievements and skills.
        </p>
      </div>
    </div>
  );
};

export default ProfessionalSummaryForm;
