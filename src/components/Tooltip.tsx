import { ReactNode, useState } from 'react';

interface TooltipProps {
  content: string;
  children: ReactNode;
}

export function Tooltip({ content, children }: TooltipProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <div className="absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 transform">
          <div className="whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white">
            {content}
          </div>
          <div className="absolute left-1/2 top-full -translate-x-1/2 transform border-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );
}