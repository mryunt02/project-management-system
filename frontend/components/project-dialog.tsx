import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import CreateProject from '@/components/create-project';
import { Plus } from 'lucide-react';

export function ProjectDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className='group h-[120px] rounded-xl border-2 border-dashed border-gray-700 hover:border-blue-500 
            transition-all duration-300 flex flex-col items-center justify-center gap-2
            bg-gray-800/50 hover:bg-gray-800'
        >
          <div
            className='p-2 rounded-full bg-gray-700/50 group-hover:bg-blue-500/20 
            transition-colors duration-300'
          >
            <Plus className='w-6 h-6 text-gray-400 group-hover:text-blue-500' />
          </div>
          <span className='text-sm font-medium text-gray-400 group-hover:text-blue-500'>
            Create New Project
          </span>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
        </DialogHeader>
        <CreateProject />
      </DialogContent>
    </Dialog>
  );
}
