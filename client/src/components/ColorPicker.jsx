import { Palette } from "lucide-react";
import React, { useState } from "react";

const ColorPicker = ({onChange,selectColor}) => {
  const colors = [
    { name: "Blue", value: "#3B82F6" },
    { name: "Indigo", value: "#6366F1" },
    { name: "Purple", value: "#8B5CF6" },
    { name: "Green", value: "#10B981" },
    { name: "Red", value: "#EF4444" },
    { name: "Orange", value: "#F97316" },
    { name: "Teal", value: "#14B8A6" },
    { name: "Pink", value: "#EC4899" },
    { name: "Gray", value: "#6B7280" },
    { name: "Black", value: "#1F2937" },
  ];
   const [isOpen,setIsOpen] = useState(false);
  return <div className="relative">
    <button className="flex items-center gap-1 text-sm text-purple-600 bg-gradient-to-br from-purple-50 to-purple-100 ">
        <Palette size={16}/>
        <span className="max-sm:hidden"> Accent </span>
    </button>
  </div>;
};

export default ColorPicker;
