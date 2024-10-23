"use client";
import React, { useState } from "react";
import { FaCube, FaAngleDown, FaAngleRight } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { navTopItems, navBottomItems, NavItem } from "@/data/navItems";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import AvatarCard from "@/components/prot_comp/avatar-card";
import Link from "next/link";
import FolderFileTree from "@/components/prot_comp/folder-file-tree";

const Sidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [openedMenuItem, setOpenedMenuItem] = useState<NavItem | null>(null);
  const [nestedOpenedItems, setNestedOpenedItems] = useState<Set<string>>(
    new Set()
  );

  const toggleSiderbarExpanded = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const toggleExpand = (menuItem: NavItem) => {
    if (openedMenuItem?.id === menuItem.id) {
      setIsExpanded(!isExpanded);
    } else {
      setIsExpanded(true);
      setOpenedMenuItem(menuItem);
    }
  };

  const toggleNestedExpand = (itemId: string) => {
    setNestedOpenedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const renderSubItems = (item: NavItem, index: number, recDeep: number) => {
    const isNestedOpened = nestedOpenedItems.has(item.id);

    return (
      <div className="flex flex-col" key={index}>
        {item.sub && item.sub.length > 0 ? (
          <Collapsible className="flex flex-col">
            <CollapsibleTrigger>
              <Button
                variant="ghost"
                className={cn(
                  "flex items-center justify-between w-full h-10 px-4"
                )}
                onClick={() => toggleNestedExpand(item.id)}
              >
                <div className="flex ">
                  {Array.from({ length: recDeep }).map((_, i) => (
                    <span className="ml-4" key={i}></span>
                  ))}

                  <item.main.icon className="text-gray-700" size={20} />
                  <span className="ml-2">{item.main.label}</span>
                </div>
                {isNestedOpened ? <FaAngleDown /> : <FaAngleRight />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              {item.sub.map((subItem, subIndex) => (
                <motion.div
                  key={subIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderSubItems(subItem, subIndex, recDeep + 1)}
                </motion.div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        ) : (
          <motion.div
            key={index}
            initial={{ opacity: 0, height: recDeep === 0 ? "auto" : 0 }}
            animate={{ opacity: 1, height: recDeep === 0 ? "auto" : "auto" }}
            exit={{ opacity: 0, height: recDeep === 0 ? "auto" : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              variant="ghost"
              className={cn("flex items-center justify-start w-full h-10 px-4")}
              onClick={() => toggleNestedExpand(item.id)}
            >
              {Array.from({ length: recDeep }).map((_, i) => (
                <span className="ml-4" key={i}></span>
              ))}
              <item.main.icon
                className="text-gray-700 flex-shrink-0"
                size={20}
              />
              <span className="ml-2">{item.main.label}</span>
            </Button>
          </motion.div>
        )}
      </div>
    );
  };

  const renderSubMenu = (topItems: typeof navTopItems, bottomItems: typeof navBottomItems) => {
    if (openedMenuItem?.id === "1") {
      return <FolderFileTree />;
    } else {
      const combinedItems = [...topItems, ...bottomItems]; // Combine both items
      return combinedItems.map((item, index) => {
        if (item.id === openedMenuItem?.id) {
          return (
            <div className="flex flex-col" key={index}>
              {item.sub && item.sub.length > 0
                ? item.sub.map((subItem, subIndex) => (
                    <div className="flex flex-col" key={subIndex}>
                      {renderSubItems(subItem, subIndex, 0)}
                    </div>
                  ))
                : null}
            </div>
          );
        }

        return null; // Ensure the function returns something for every case
      });
    }
  };

  return (
    <div className="flex h-full divide-x">
      <motion.div
        className="flex flex-col w-flex-grow bg-card p-2 flex-shrink-0"
        initial={{ width: "4rem" }}
        animate={{ width: isSidebarExpanded ? "auto" : "4rem" }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col space-y-2">
          <div className="w-full h-12">
            <Button
              variant="ghost"
              className={`flex items-center justify-start h-12 w-full gap-8`}
              onClick={toggleSiderbarExpanded}
            >
              <FaCube className="text-gray-700 flex-shrink-0 " size={16} />
              {isSidebarExpanded && (
                <motion.span
                  className="text-lg font-semibold ml-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {"KadoUni"}
                </motion.span>
              )}
            </Button>
          </div>
        </div>

        <nav className="flex flex-col flex-grow pt-4">
          <div className="flex flex-col space-y-2">
            {navTopItems.map((item, index) => {
              const IconComponent = item.main.icon;
              return (
                <div key={index} className="flex w-full h-12">
                  {item.main.href ? (
                    <Link href={item.main.href}>
                      <Button
                        variant="ghost"
                        className="flex items-center justify-start w-full h-12 gap-3"
                      >
                        <IconComponent
                          className="text-gray-700 flex-shrink-0"
                          size={16}
                        />
                        {isSidebarExpanded && (
                          <motion.span
                            className="ml-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            {item.main.label}
                          </motion.span>
                        )}
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      variant="ghost"
                      className="flex items-center justify-start w-full h-12 gap-3"
                      onClick={() => toggleExpand(item)}
                    >
                      <IconComponent
                        className="text-gray-700 flex-shrink-0"
                        size={16}
                      />
                      {isSidebarExpanded && (
                        <motion.span
                          className="ml-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {item.main.label}
                        </motion.span>
                      )}
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-auto">
            {navBottomItems.map((item, index) => {
              const IconComponent = item.main.icon;
              return (
                <div key={index} className="w-full h-12">
                  {item.main.href ? (
                    <Link href={item.main.href}>
                      <Button
                        variant="ghost"
                        className="flex items-center justify-start w-full h-12 gap-3"
                        onClick={() => toggleExpand(item)}
                      >
                        <IconComponent
                          className="text-gray-700 flex-shrink-0"
                          size={16}
                        />
                        {isSidebarExpanded && (
                          <motion.span
                            className="ml-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            {item.main.label}
                          </motion.span>
                        )}
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      variant="ghost"
                      className="flex items-center justify-start w-full h-12 gap-3"
                      onClick={() => toggleExpand(item)}
                    >
                      <IconComponent
                        className="text-gray-700 flex-shrink-0"
                        size={16}
                      />
                      {isSidebarExpanded && (
                        <motion.span
                          className="ml-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {item.main.label}
                        </motion.span>
                      )}
                    </Button>
                  )}
                </div>
              );
            })}
            <div className="flex justify-center items-center w-full">
              <AvatarCard isExpanded={isSidebarExpanded} />
            </div>
          </div>
        </nav>
      </motion.div>
      {isExpanded && (
        <motion.div
          className="flex flex-col bg-card p-4 divide-y  w-flex-grow"
          initial={{ opacity: 0, width: 0 }}
          animate={{
            opacity: isExpanded ? 1 : 0,
            width: isExpanded ? "12rem" : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-lg font-semibold">
            {openedMenuItem?.main.label}
          </h2>

          <div className="flex w-full">
            {renderSubMenu(navTopItems, navBottomItems)} 
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Sidebar;
