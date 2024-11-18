import React, { useState } from "react";
import '../styles/userProfile.css'; 

function Tabs({ children }) {
  const [activeTab, setActiveTab] = useState(0);  

  return (
    <div>
      <div className="tabs">
        {children.map((child, index) => (
          <button
            key={index}
            className={activeTab === index ? "active" : ""}
            onClick={() => setActiveTab(index)}
          >
            {child.props.title}  {}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {children[activeTab]}  {}
      </div>
    </div>
  );
}

export default Tabs;
