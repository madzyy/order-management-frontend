import  { useState } from "react";
import { FaHome, FaCartPlus, FaUsers, FaCog } from "react-icons/fa";
import "./../styles/Sidebar.css";

// eslint-disable-next-line react/prop-types
const Sidebar = ({ onDim }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleSidebar = () => {
    const nextState = !isCollapsed;
    setIsCollapsed(nextState);
    onDim(nextState); 
  };

  return (
    <>
      <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isCollapsed ? ">" : "<"}
        </button>
        <ul className="menu-items">
          <li className="menu-item">
            <FaHome className="icon" />
            {!isCollapsed && <span>Overview</span>}
          </li>
          <li className="menu-item">
            <FaCartPlus className="icon" />
            {!isCollapsed && <span>Products</span>}
          </li>
          <li className="menu-item">
            <FaUsers className="icon" />
            {!isCollapsed && <span>Users</span>}
          </li>
          <li className="menu-item">
            <FaCog className="icon" />
            {!isCollapsed && <span>Settings</span>}
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
