import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {

    const [isActive, setIsActive] = useState(false);
    const [isConfig, setIsConfig] = useState(false);
    const loginUser = sessionStorage.getItem('userName');
    const userRole = sessionStorage.getItem('userRole');
    const userRoleId = sessionStorage.getItem('userRoleId');
    const [menus, setMenus] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        GetMenus();
    }, []);

    const GetMenus = async () => {
        try {
            const body = JSON.stringify({
                role_id: userRoleId,
                parent_id: 0
            });

            const response = await axios.post('http://127.0.0.1:8000/api/menus', body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data['status'] === 200) {
                const menuData = response.data['mainMenus'];
                setMenus(menuData)
            }
        } catch (error) {
            setMenus([]);
        }
    }

    console.log("Menus", menus)

    const handleClick = () => {
        setIsActive(!isActive);
    }
    const handleConfig = () => {
        setIsConfig(!isConfig);

    }

    const handleMenu = (id, url) => {
        console.log(url)
        dispatch({ type: "LEVELMENUID", payload: id });
    }

    const handleNavigate = (e, url) => {
        // e.preventDefault();
        navigate(`${url}`);
    }

    const response = useSelector((state) => {
        return state.moduleData;
    });

    console.log(response['levelMenuID']);

    // const renderSubmenus = (submenus) => {
    //     return (
    //         <ul class="nav nav-treeview">
    //             {
    //                 submenus.map((submenu) => (
    //                     <li key={submenu.miID} className={submenu.miID === response['levelMenuID'] ? 'nav-item menu-open' : 'nav-item'} onClick={() => handleMenu(submenu.miID)}>
    //                         <a href="" className={(submenu.miID === response['levelMenuID']) || (location.pathname == submenu.url) ? 'nav-link active' : 'nav-link'} onClick={(e) => handleNavigate(e,submenu.url)}>
    //                             <i class="far fa-compass nav-icon"></i>
    //                             <p>
    //                                 {submenu.menu_name}
    //                                 {Array.isArray(submenu.subMenus) && submenu.subMenus.length > 0 ? (<i class="right fas fa-angle-left"></i>) : ""}
    //                             </p>
    //                         </a>
    //                         {Array.isArray(submenu.subMenus) && renderChildSubmenus(submenu.subMenus)}

    //                     </li>
    //                 ))
    //             }
    //         </ul>
    //     )
    // }

    // const renderChildSubmenus = (submenuss) => {
    //     return (
    //         <ul class="nav nav-treeview">
    //             {
    //                 submenuss.map((submenu) => (
    //                     <li key={submenu.miID} className={submenu.miID === response['levelMenuID'] ? 'nav-item menu-open' : 'nav-item'} onClick={() => handleMenu(submenu.miID)}>
    //                         <a href="" className={(submenu.miID === response['levelMenuID']) || (location.pathname == submenu.url) ? 'nav-link active' : 'nav-link'} onClick={(e) => handleNavigate(e,submenu.url)}>
    //                             <i class="far fa-compass nav-icon"></i>
    //                             <p>
    //                                 {submenu.menu_name}

    //                             </p>
    //                         </a>

    //                     </li>
    //                 ))
    //             }
    //         </ul>
    //     )
    // }

    // const MenuItem = ({ menu, handleMenu, response }) => {
    //     const hasSubMenus = Array.isArray(menu.subMenus) && menu.subMenus.length > 0;

    //     return (
    //         <li key={menu.miID} className={menu.miID === response['levelMenuID'] ? "nav-item menu-open" : "nav-item"} onClick={(e) => handleMenu(menu.miID, menu.url)}>
    //             <a href="javascript:void(0)" className={(menu.miID === response['levelMenuID']) || (location.pathname == menu.url) ? 'nav-link active' : 'nav-link'} onClick={(e) => handleNavigate(e,menu.url)}>
    //                 <i className={menu.miID === response.levelMenuID ? "nav-icon fas fa-tachometer-alt" : "far fa-compass nav-icon"}></i>
    //                 <p>
    //                     {menu.menu_name}
    //                     {hasSubMenus ? (<i className="right fas fa-angle-left"></i>) : ''}
    //                 </p>
    //             </a>
    //             {
    //                 hasSubMenus && <ul className="nav nav-treeview">
    //                     {
    //                         menu.subMenus.map((submenu) => (
    //                             <MenuItem key={submenu.miID} menu={submenu} handleMenu={handleMenu} response={response} />
    //                         ))
    //                     }
    //                 </ul>
    //             }
    //         </li>
    //     );
    // };

    // Reusable component for menu items
    const MenuItem = ({ menu, activeMenuId, onClick, handleNavigate }) => {
        const isActive = menu.miID === activeMenuId || location.pathname === menu.url;
        return (
            <li key={menu.miID} className={isActive ? 'nav-item menu-open' : 'nav-item'} onClick={() => onClick(menu.miID)}>
                <a href="javascript:void(0)" className={isActive ? 'nav-link active' : 'nav-link'} onClick={(e) => handleNavigate(e, menu.url)}>
                    <i className="nav-icon fas fa-tachometer-alt"></i>
                    <p>
                        {menu.menu_name}
                        {menu.subMenus.length > 0 && <i className="right fas fa-angle-left"></i>}
                    </p>
                </a>
                {Array.isArray(menu.subMenus) && menu.subMenus.length > 0 && renderSubmenus(menu.subMenus, activeMenuId, onClick, handleNavigate)}
            </li>
        );
    };

    // Refactored renderSubmenus function
    const renderSubmenus = (submenus, activeMenuId, onClick, handleNavigate) => (
        <ul className="nav nav-treeview">
            {submenus.map(submenu => (
                <Submenu key={submenu.miID} submenu={submenu} activeMenuId={activeMenuId} onClick={onClick} handleNavigate={handleNavigate} />
            ))}
        </ul>
    );

    // Component to render submenus
    const Submenu = ({ submenu, activeMenuId, onClick, handleNavigate }) => {
        const isActive = submenu.miID === activeMenuId || location.pathname === submenu.url;
        return (
            <li key={submenu.miID} className={isActive ? 'nav-item menu-open' : 'nav-item'} onClick={() => onClick(submenu.miID)}>
                <a href="javascript:void(0)" className={isActive ? 'nav-link active' : 'nav-link'} onClick={(e) => handleNavigate(e, submenu.url)}>
                    <i className="far fa-compass nav-icon"></i>
                    <p>
                        {submenu.menu_name}
                        {Array.isArray(submenu.subMenus) && submenu.subMenus.length > 0 && <i className="right fas fa-angle-left"></i>}
                    </p>
                </a>
                {Array.isArray(submenu.subMenus) && submenu.subMenus.length > 0 && renderSubmenus(submenu.subMenus, activeMenuId, onClick, handleNavigate)}
            </li>
        );
    };

    return (
        <>
            <aside class="main-sidebar sidebar-dark-primary elevation-4">
                {/* <!-- Brand Logo --> */}
                <a href="index3.html" class="brand-link">
                    <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style={{ opacity: "0.8" }} />
                    <span class="brand-text font-weight-light">REACT ADMIN</span>
                </a>

                {/* <!-- Sidebar --> */}
                <div class="sidebar">
                    {/* <!-- Sidebar user panel (optional) --> */}
                    <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div class="image">
                            <img src="dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image" />
                        </div>
                        <div class="info">
                            <a href="#" class="d-block">{loginUser}</a>
                        </div>
                    </div>

                    {/* <!-- SidebarSearch Form --> */}
                    <div class="form-inline">
                        <div class="input-group" data-widget="sidebar-search">
                            <input class="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                            <div class="input-group-append">
                                <button class="btn btn-sidebar">
                                    <i class="fas fa-search fa-fw"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Sidebar Menu --> */}
                    <nav class="mt-2">
                        {/* <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false"> */}

                        {/* {
                                menus.map((menu) => (

                                    <li key={menu.miID} className={menu.miID === response['levelMenuID'] ? "nav-item menu-open" : "nav-item"} onClick={() => handleMenu(menu.miID)}>
                                        <a href="" className={(menu.miID === response['levelMenuID']) || (location.pathname == menu.url) ? 'nav-link active' : 'nav-link'} onClick={(e) => handleNavigate(e,menu.url)}>
                                            <i class="nav-icon fas fa-tachometer-alt"></i>
                                            <p>{menu.menu_name}{menu.subMenus.length > 0 ? (<i class="right fas fa-angle-left"></i>) : ''}</p>
                                        </a>
                                        {Array.isArray(menu.subMenus) && renderSubmenus(menu.subMenus)}
                                    </li>
                                ))
                            } */}

                        {/* {
                                menus.map((menu) => (
                                    <MenuItem key={menu.miID} menu={menu} handleMenu={handleMenu} response={response}/>
                                ))
                            } */}

                        {/* </ul> */}

                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            {menus.map(menu => (
                                <MenuItem key={menu.miID} menu={menu} activeMenuId={response['levelMenuID']} onClick={handleMenu} handleNavigate={handleNavigate} />
                            ))}
                        </ul>
                    </nav>
                    {/* <!-- /.sidebar-menu --> */}
                </div>
                {/* <!-- /.sidebar --> */}
            </aside>
        </>
    );
};

export default Sidebar;