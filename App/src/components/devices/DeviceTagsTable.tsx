import React, { useState } from 'react';
import { Search, Edit, Filter } from 'lucide-react';

interface Tag {
  id: number;
  name: string;
  address: string;
  dataType: string;
  value: string;
  unit: string;
  access: string;
}

interface DeviceTagsTableProps {
  tags: Tag[];
}

const DeviceTagsTable: React.FC<DeviceTagsTableProps> = ({ tags }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTagId, setEditingTagId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');

  const filteredTags = tags.filter(tag => 
    tag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tag.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (tag: Tag) => {
    setEditingTagId(tag.id);
    setEditValue(tag.value);
  };

  const handleSaveEdit = () => {
    // In a real app, you would send this update to your backend
    console.log(`Updating tag ${editingTagId} with value ${editValue}`);
    setEditingTagId(null);
  };

  const handleCancelEdit = () => {
    setEditingTagId(null);
  };

  return (
    <div className="card">
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <h2 className="font-medium text-slate-900 dark:text-white">Device Tags</h2>
          
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              placeholder="Search tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="data-grid w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Data Type</th>
              <th>Value</th>
              <th>Access</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTags.length > 0 ? (
              filteredTags.map((tag) => (
                <tr key={tag.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/60">
                  <td className="font-medium text-slate-900 dark:text-white">
                    {tag.name}
                  </td>
                  <td className="font-mono text-xs text-slate-600 dark:text-slate-400">
                    {tag.address}
                  </td>
                  <td>
                    {tag.dataType}
                  </td>
                  <td>
                    {editingTagId === tag.id ? (
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="w-full px-2 py-1 border border-teal-500 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        autoFocus
                      />
                    ) : (
                      <span className="font-medium">
                        {tag.value} {tag.unit && <span className="text-slate-500 dark:text-slate-400 text-xs">{tag.unit}</span>}
                      </span>
                    )}
                  </td>
                  <td>
                    <span className={`text-xs font-medium py-1 px-2 rounded-full ${
                      tag.access === 'Read Only' 
                        ? 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300'
                        : 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300'
                    }`}>
                      {tag.access}
                    </span>
                  </td>
                  <td>
                    {editingTagId === tag.id ? (
                      <div className="flex space-x-2">
                        <button 
                          onClick={handleSaveEdit}
                          className="text-teal-600 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
                        >
                          Save
                        </button>
                        <button 
                          onClick={handleCancelEdit}
                          className="text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-300"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      tag.access !== 'Read Only' && (
                        <button 
                          onClick={() => handleEditClick(tag)}
                          className="text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400"
                          title="Edit value"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                      )
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4 text-slate-500 dark:text-slate-400">
                  No tags match your search criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-slate-200 dark:border-slate-700">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Showing {filteredTags.length} of {tags.length} tags
        </p>
      </div>
    </div>
  );
};

export default DeviceTagsTable;