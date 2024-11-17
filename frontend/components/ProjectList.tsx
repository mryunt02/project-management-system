import { FlipHorizontal2, MoreHorizontal, Plus } from 'lucide-react';
import TaskCard from './TaskCard';
import { EventDialog } from './event-dialog';

interface ProjectListProps {
  key: string;
  title: string;
  events: { _id: string; title: string; description: string }[];
}

const ProjectList = ({ title, events }: ProjectListProps) => {
  return (
    <li className='flex-shrink-0'>
      <div className='bg-[#101204] rounded-xl w-[272px]'>
        <div className='flex items-center justify-between py-2 px-3 border-b border-gray-700/50'>
          <p className='font-medium text-[#b6c2cf]'>{title}</p>
          <div className='flex gap-2 text-gray-400'>
            <button className='p-1 hover:bg-white/10 rounded'>
              <MoreHorizontal size={18} />
            </button>
            <button className='p-1 hover:bg-white/10 rounded'>
              <FlipHorizontal2 size={18} />
            </button>
          </div>
        </div>

        <div className='p-2 flex flex-col gap-2'>
          {events.map((task, index) => (
            <EventDialog key={index} eventId={task._id} />
          ))}

          <button className='flex items-center gap-1 p-2 text-gray-400 hover:text-gray-300 hover:bg-white/5 rounded-lg text-sm'>
            <Plus size={16} />
            <span>Add Card</span>
          </button>
        </div>
      </div>
    </li>
  );
};

export default ProjectList;
