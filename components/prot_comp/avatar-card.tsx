"use client";
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { motion } from "framer-motion";

import { useCurrentUser } from "@/hooks/use-current-user";

interface AvatarCardProps {
  isExpanded: boolean;
}

const AvatarCard: React.FC<AvatarCardProps> = ({ isExpanded }) => {
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="flex items-center justify-start w-full h-12  bg-slate-200 border border-black"
        >
          <div className="flex flex-shrink-0 pl-1">
            <Avatar className="">
              <AvatarImage src={user?.image!} alt="@username" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
          {isExpanded && (
          <div className="px-2"> 
            <div className="flex flex-col justify-start items-center ">
              <div className="flex items-center justify-start  ">
                {isExpanded && (
                  <motion.span
                    className="px-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {user?.name}
                  </motion.span>
                )}
              </div>
              <div className="flex items-center justify-start  ">
                {isExpanded && (
                  <motion.span
                    className=" text-xs px-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {user?.email}
                  </motion.span>
                )}
              </div>
            </div>
            </div> 
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <div className="pr-2">
              <User className="text-gray-700 flex-shrink-0" size={18} />
            </div>
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="pr-2">
              <CreditCard className="text-gray-700 flex-shrink-0" size={18} />
            </div>
            <span>Billing</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="pr-2">
              <Settings className="text-gray-700 flex-shrink-0" size={18} />
            </div>
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="pr-2">
              <Keyboard className="text-gray-700 flex-shrink-0" size={18} />
            </div>
            <span>Keyboard shortcuts</span>
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <div className="pr-2">
              <Users className="text-gray-700 flex-shrink-0" size={18} />
            </div>
            <span>Team</span>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <div className="pr-2">
                <UserPlus className="text-gray-700 flex-shrink-0" size={18} />
              </div>
              <span>Invite users</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <div className="pr-2">
                    <Mail className="text-gray-700 flex-shrink-0" size={18} />
                  </div>
                  <span>Email</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="pr-2">
                    <MessageSquare
                      className="text-gray-700 flex-shrink-0"
                      size={18}
                    />
                  </div>
                  <span>Message</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <div className="pr-2">
                    <PlusCircle
                      className="text-gray-700 flex-shrink-0"
                      size={18}
                    />
                  </div>
                  <span>More...</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            <div className="pr-2">
              <Plus className="text-gray-700 flex-shrink-0" size={18} />
            </div>
            <span>New Team</span>
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <div className="pr-2">
            <Github className="text-gray-700 flex-shrink-0" size={18} />
          </div>
          <span>GitHub</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="pr-2">
            <LifeBuoy className="text-gray-700 flex-shrink-0" size={18} />
          </div>
          <span>Support</span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <div className="pr-2">
            <Cloud className="text-gray-700 flex-shrink-0" size={18} />
          </div>
          <span>API</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <div className="pr-2">
            <LogOut className="text-gray-700 flex-shrink-0" size={18} />
          </div>
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarCard;
