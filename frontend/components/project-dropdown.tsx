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
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { updateListInProject } from '@/redux/reducers/projectReducer';
import { Dialog, DialogHeader, DialogTrigger } from './ui/dialog';
import { DialogContent, DialogDescription } from '@radix-ui/react-dialog';
import { Input } from './ui/input';
import ListDialog from './list-dialog';

const ProjectDropdown = ({ title }: { title: string }) => {
  const handleDeleteList = () => {
    console.log('Delete list');
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className=' p-1 hover:bg-white/10 rounded'>
          <MoreHorizontal size={18} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{title}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <ListDialog />
          <DropdownMenuItem onClick={handleDeleteList}>
            <Delete /> Delete list
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ProjectDropdown;
