// src/data/navItems.ts
import {
  FaFolder,
  FaChalkboardTeacher,
  FaBook,
  FaBookOpen,
  FaPen,
  FaPencilAlt,
  FaBox,
  FaFileAlt,
  FaLink,
  FaGlobe,
  FaGlobeAmericas,
  FaPlaneDeparture,
  FaStickyNote,
  FaLightbulb,
  FaClipboardCheck,
  FaUsers,
  FaUserFriends,
  FaUserShield,
  FaBell,
  FaCog,
} from "react-icons/fa";

export interface NavItem {
  id: string; // ID for the item
  main: { 
    icon: React.ElementType; 
    label: string; 
    href?: string;  // Optional href for links
  };
  sub?: NavItem[]; // Submenu items (optional)
}

export const navTopItems: NavItem[] = [
  {
    id: "0",
    main: { icon: FaChalkboardTeacher, label: "Dashboard", href: "/dashboard" }, // New Dashboard item
  },
  {
    id: "1",
    main: { icon: FaFolder, label: "Folder" },
    sub: [
      { id: "1-1", main: { icon: FaChalkboardTeacher, label: "Lecture 1" },sub: [
        { id: "1-1-1", main: { icon: FaStickyNote, label: "Note 1" } },
        { id: "1-1-2", main: { icon: FaStickyNote, label: "Note 2" } },
        { id: "1-1-3", main: { icon: FaStickyNote, label: "Note 3" } },
      ] },
      { id: "1-2", main: { icon: FaChalkboardTeacher, label: "Lecture 2" } },
      {
        id: "1-3",
        main: { icon: FaChalkboardTeacher, label: "Lecture 3" },
        sub: [
          { id: "1-3-1", main: { icon: FaStickyNote, label: "Note 1" } },
          { id: "1-3-2", main: { icon: FaStickyNote, label: "Note 2" } },
          { id: "1-3-3", main: { icon: FaStickyNote, label: "Note 3" } },
        ],
      },
    ],
  },
  {
    id: "2",
    main: { icon: FaBook, label: "Books" },
    sub: [
      {
        id: "2-1",
        main: { icon: FaBookOpen, label: "Textbook" },
        sub: [
          { id: "2-1-1", main: { icon: FaStickyNote, label: "Note 1" } },
          { id: "2-1-2", main: { icon: FaStickyNote, label: "Note 2" } },
          { id: "2-1-3", main: { icon: FaStickyNote, label: "Note 3" } },
        ],
      },
      {
        id: "2-2",
        main: { icon: FaBookOpen, label: "Reference" },
        sub: [
          { id: "2-2-1", main: { icon: FaStickyNote, label: "Note 1" } },
          { id: "2-2-2", main: { icon: FaStickyNote, label: "Note 2" } },
          { id: "2-2-3", main: { icon: FaStickyNote, label: "Note 3" } },
        ],
      },
      { id: "2-3", main: { icon: FaBookOpen, label: "eBooks" } },
    ],
  },
  {
    id: "3",
    main: { icon: FaPen, label: "Notes" },
    sub: [
      { id: "3-1", main: { icon: FaPencilAlt, label: "Drafts" } },
      {
        id: "3-2",
        main: { icon: FaPencilAlt, label: "Completed" },
        sub: [
          {
            id: "3-2-1",
            main: { icon: FaStickyNote, label: "Note 1" },
            sub: [
              { id: "3-2-1-1", main: { icon: FaStickyNote, label: "Note 1" } },
              { id: "3-2-1-2", main: { icon: FaStickyNote, label: "Note 2" } },
              { id: "3-2-1-3", main: { icon: FaStickyNote, label: "Note 3" } },
            ],
          },
          { id: "3-2-2", main: { icon: FaStickyNote, label: "Note 2" } },
          { id: "3-2-3", main: { icon: FaStickyNote, label: "Note 3" } },
        ],
      },
    ],
  },
  {
    id: "4",
    main: { icon: FaBox, label: "Resources" },
    sub: [
      { id: "4-1", main: { icon: FaFileAlt, label: "Files" } },
      // { main: { icon: FaLink, label: "Links" } },
    ],
  },
  {
    id: "5",
    main: { icon: FaGlobe, label: "Global" },
    sub: [
      { id: "5-1", main: { icon: FaGlobeAmericas, label: "World News" } },
      { id: "5-2", main: { icon: FaPlaneDeparture, label: "Travel" } },
    ],
  },
  {
    id: "6",
    main: { icon: FaStickyNote, label: "Sticky Notes" },
    sub: [
      { id: "6-1", main: { icon: FaLightbulb, label: "Reminders" } },
      { id: "6-2", main: { icon: FaClipboardCheck, label: "To-do List" } },
    ],
  },
  {
    id: "7",
    main: { icon: FaUsers, label: "Users" },
    sub: [
      { id: "7-1", main: { icon: FaUserFriends, label: "User List" } },
      { id: "7-2", main: { icon: FaUserShield, label: "Admins" } },
    ],
  },
];

export const navBottomItems: NavItem[] = [
  { id: "8", main: { icon: FaBell, label: "Notification" } },
  { id: "9", main: { icon: FaCog, label: "Settings" } },
];
