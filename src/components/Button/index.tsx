interface Props {
  onClick?: () => void;
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  loading?: boolean;
}

export default ({ onClick, className, icon, children, loading }: Props) => {
  return (
    <>
      <button className={`flex items-center space-x-2 bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''} ${className}`} disabled={loading} onClick={onClick}>
        {loading ? <div className="w-4 h-4 border-t-2 border-b-2 border-white rounded-full animate-spin"></div> : icon}
        <span className="text-sm">{loading ? '加载中...' : children}</span>
      </button>
    </>
  )
}