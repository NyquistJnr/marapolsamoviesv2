"use client";

import { useContext } from "react";
import { SidebarContext } from "@/context/SidebarContext";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { RiHome5Fill } from "react-icons/ri";
import { MdOutlineRateReview } from "react-icons/md";
import { IoBookOutline } from "react-icons/io5";
import { BiMoviePlay } from "react-icons/bi";
import { FaAward } from "react-icons/fa6";
import { FaPeopleGroup } from "react-icons/fa6";
import { TbLogout } from "react-icons/tb";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const sidebarItems = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: RiHome5Fill,
    position: false,
  },
  {
    name: "Reviews",
    href: "/admin/reviews",
    icon: MdOutlineRateReview,
    position: false,
  },
  {
    name: "News",
    href: "/admin/news",
    icon: IoBookOutline,
    position: false,
  },
  {
    name: "Movies",
    href: "/admin/movies",
    icon: BiMoviePlay,
    position: false,
  },
  {
    name: "Awards",
    href: "/admin/awards",
    icon: FaAward,
    position: false,
  },
  {
    name: "Team",
    href: "/admin/team",
    icon: FaPeopleGroup,
    position: false,
  },
  {
    name: "Sign Out",
    href: "/sign-out",
    icon: TbLogout,
    position: true,
    bottom: 20,
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const { isCollapsed, toggleSidebarcollapse } = useContext(SidebarContext);

  return (
    <div className="sidebar__wrapper">
      <button className="custom-btn" onClick={toggleSidebarcollapse}>
        {isCollapsed ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />}
      </button>
      <aside className="sidebar" data-collapse={isCollapsed}>
        <div className="sidebar__top" style={{ width: "100%" }}>
          {isCollapsed ? (
            <Image
              width={200}
              height={200}
              className="sidebar__logo"
              src="/logo.png"
              alt="logo"
              priority
            />
          ) : (
            <Image
              width={140}
              height={50}
              src="/logo.svg"
              alt="logo"
              priority
            />
          )}
        </div>
        <ul className="sidebar__list">
          {sidebarItems.map(({ name, href, icon: Icon, position, bottom }) => {
            return (
              <li className="sidebar__item" key={name}>
                <div
                  style={
                    position ? { position: "absolute", bottom: bottom } : {}
                  }
                >
                  {position && <div style={{ borderTop: "1px solid #000" }} />}
                  <Link
                    className={`sidebar__link ${
                      pathname === href ? "sidebar__link--active" : ""
                    }`}
                    href={href}
                    style={{ alignItems: "center" }}
                  >
                    <span className="sidebar__icon">
                      <Icon size={25} />
                    </span>
                    <span className="sidebar__name">{name}</span>
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
