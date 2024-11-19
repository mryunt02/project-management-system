import React, { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Delete, MoreHorizontal } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import ListDialog from './list-dialog';
import { deleteListFromProject } from '@/redux/reducers/projectReducer';

const ProjectDropdown = ({ title }: { title: string }) => {
  const [deleteList, setDeleteList] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { list, projectId } = useSelector((state: RootState) => {
    if (!state.projects.selectedProject) {
      return { list: null, projectId: null };
    }
    const projectId = state.projects.selectedProject._id;
    const list = state.projects.selectedProject.lists.find(
      (list) => list.name === title
    );

    return { list, projectId };
  });

  useEffect(() => {
    if (deleteList && projectId && list?._id) {
      dispatch(
        deleteListFromProject({ projectId: projectId, listId: list._id })
      ).then(() => {
        window.location.reload(); // Reload the page after deleting the list
      });
    }
  }, [deleteList, projectId, list, dispatch]);

  const handleDeleteList = () => {
    setDeleteList(true);
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
          <ListDialog title={title} />
          <DropdownMenuItem onClick={handleDeleteList}>
            <Delete /> Delete list
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ProjectDropdown;
