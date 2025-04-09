interface Props {
  onClick: () => void;
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export default ({ onClick, className, icon, children }: Props) => {
  return (
    <>
      <button className={`flex items-center space-x-2 bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer ${className}`} onClick={onClick}>
        {icon}
        <span className="text-sm">{children}</span>
      </button>
    </>
  )
}