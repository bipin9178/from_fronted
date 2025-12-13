import React, { useState, useEffect } from "react";

function AutoTextChange() {
  const texts = [
   "Document Uploading",
   "Form Data Management",
    "Search & Filtering",
    "Status Tracking",
    "Document Download",
    "Form Re-Submit System"
  ]; 

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {setIndex((prev) => (prev + 1) % texts.length);}, 1000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ fontFamily: "sans-serif", padding: 20 }}>
      <h2 style={{ color: "#FF9013" }}>
        {texts[index]}
      </h2>
    </div>
  );
}

export default AutoTextChange;
