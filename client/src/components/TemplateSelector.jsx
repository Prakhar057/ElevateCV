import React, { useState } from "react";

const TemplateSelector = ({ selectedTemplate, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const templates = [
    {
        id: "classic",
        name: "Classic",
        preview: "A clean, traditional resume format with clear selections and professional typography"
    },
    {
        id: "modern",
        name: "Modern",
        preview: "Sleek design with strategic use of color and modern font choices"
    },
    {
        id: "minimal-image",
        name: "Minimal Image",
        preview: "Minimal design with  a single image and clean typography"
    },
    
    {
        id: "minimal",
        name: "Minimal ",
        preview: "Ultra-clean design that puts your content front and center"
    },

  ]
  return <div>
    
  </div>;
};

export default TemplateSelector;
