import React from 'react';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Delete, Edit, MoreHorizontal } from 'lucide-react';

const ProjectDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className=' p-1 hover:bg-white/10 rounded'>
        <MoreHorizontal size={18} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>TO DO</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Edit /> Edit list
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Delete /> Delete list
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProjectDropdown;
