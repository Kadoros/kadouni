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
  
  const AvatarCard = () => {
    return (
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" alt="@username" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
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
                        <MessageSquare className="text-gray-700 flex-shrink-0" size={18} />
                      </div>
                      <span>Message</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <div className="pr-2">
                        <PlusCircle className="text-gray-700 flex-shrink-0" size={18} />
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
      </div>
    );
  };
  
  export default AvatarCard;
  