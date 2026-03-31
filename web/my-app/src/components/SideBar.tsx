import { NavLink } from "react-router-dom";
import "./SideBar.css";


const SideBar = () => {
    const data = [
        { name: "AllJobs", path: "/" },
        { name: "AllUsers", path: "" },
        { name: "AllJobsResults", path: "" },
        { name: "OpsDashBoard", path: "" }
    ];

    const getBadge = (value: string) => {
        const matches = value.match(/[A-Z]/g);
        return matches?.slice(0, 2).join("") ?? value.slice(0, 2).toUpperCase();
    };

    return (
        <aside className="sidebar-shell">
            <div className="sidebar-brand">
                <span className="sidebar-brand-mark">J</span>
                <div>
                    <p>Job Portal</p>
                    <span>Admin Workspace</span>
                </div>
            </div>

            <div className="sidebar-section-label">Navigation</div>

            <nav className="sidebar-nav">
            {data.map((item) => (
                <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) =>
                        isActive ? "sidebar-link sidebar-link-active" : "sidebar-link"
                    }
                >
                    <span className="sidebar-link-badge">{getBadge(item.name)}</span>
                    <span className="sidebar-link-copy">
                        <strong>{item.name}</strong>
                        <small>Open section</small>
                    </span>
                </NavLink>
            ))}
            </nav>

        </aside>
    )
}

export default SideBar
