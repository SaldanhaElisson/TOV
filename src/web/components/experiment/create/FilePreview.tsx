import React from 'react';

interface FilePreviewProps {
  url: string;
  name: string;
  onRemove: () => void; 
}

const FilePreview: React.FC<FilePreviewProps> = ({ url, name, onRemove }) => {
    return(
        <div className="relative group overflow-hidden rounded-md border border-gray-700 h-24 w-full">
      
            <img 
                src={url} 
                alt={`Miniatura de ${name}`} 
                className="w-full h-full object-cover"
            />
          
            <div 
                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
                <button
                    type="button"
                    onClick={onRemove} 
                    className="text-white bg-red-600 hover:bg-red-700 p-1 rounded-full text-xs font-bold"
                    aria-label={`Remover ${name}`}
                >
                    &times;
                </button>
            </div>
        </div>
    );
}

export default FilePreview;