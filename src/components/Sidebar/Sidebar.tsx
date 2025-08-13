const Sidebar = () => {
  const items = ["All", "Media", "Articles", "Audio"];
  return (
    <div className="sidebar">
      <div className="icons-row">
        <div className="icon">
          Focus<span>.</span>dev
        </div>
        {items.map((item) => (
          <div>{item}</div>
        ))}
      </div>
      <div className="bottom-row">
        <div className="add-item">Add Source</div>
        <div>Settings</div>
      </div>
    </div>
  );
};

export default Sidebar;
