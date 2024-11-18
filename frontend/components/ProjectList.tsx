import { FlipHorizontal2, MoreHorizontal, Plus } from 'lucide-react';
import { EventDialog } from './event-dialog';
import ProjectDropdown from './project-dropdown';

interface ProjectListProps {
  key: string;
  title: string;
  color: string;
  events: { _id: string; title: string; description: string }[];
}

const ProjectList = ({ title, events, color }: ProjectListProps) => {
  const getColorClass = (color: string): string => {
    switch (color) {
      case 'green':
        return 'bg-green-400';
      case 'red':
        return 'bg-red-400';
      case 'yellow':
        return 'bg-yellow-400';
      case 'blue':
        return 'bg-blue-400';
      default:
        return 'bg-[#101204]'; // Default color if none match
    }
  };
  return (
    <li className='flex-shrink-0'>
      <div className='rounded-xl w-[272px] bg-[#101204]'>
        <div
          className={`flex items-center justify-between py-2 px-3 border-b border-gray-700/50 ${getColorClass(
            color
          )} rounded-t-xl`}
        >
          <p className='font-medium text-white'>{title}</p>
          <div className='flex gap-2 text-white'>
            <ProjectDropdown title={title} />
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
