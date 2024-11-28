interface TaskCardProps {
  title: string;
  description: string;
}

const TaskCard = ({ title, description }: TaskCardProps) => {
  return (
    <div className='bg-[#22272b] p-3 rounded-lg shadow-sm hover:bg-[#22272b]/80 cursor-pointer w-full text-start whitespace-normal'>
      <h3 className='text-[#b6c2cf] text-sm font-medium'>{title}</h3>
      <p className='text-gray-400 text-xs mt-1 break-words'>{description}</p>
    </div>
  );
};

export default TaskCard;
