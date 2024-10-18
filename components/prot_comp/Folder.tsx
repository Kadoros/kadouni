import { useState } from "react";
import {
  VscChevronRight,
  VscChevronDown,
  VscFolder,
  VscFile,
  VscNewFolder,
  VscNewFile,
  VscEdit,
  VscTrash,
} from "react-icons/vsc";

// Define the types for the explorer data
interface ExplorerData {
  id: string;
  name: string;
  isFolder: boolean;
  items: ExplorerData[];
}

// Define the props for the Folder component
interface FolderProps {
  handleInsertNode: (parentId: string, nodeName: string, isFolder: boolean) => void;
  handleDeleteNode: (id: string) => void;
  handleUpdateFolder: (id: string, newName: string, isFolder: boolean) => void;
  explorerData: ExplorerData;
}

const Folder: React.FC<FolderProps> = ({
  handleInsertNode,
  handleDeleteNode,
  handleUpdateFolder,
  explorerData,
}) => {
  const [nodeName, setNodeName] = useState<string>(explorerData?.name || "");
  const [expand, setExpand] = useState<boolean>(false);
  const [showInput, setShowInput] = useState<{
    visible: boolean;
    isFolder: boolean | null;
  }>({
    visible: false,
    isFolder: null,
  });
  const [updateInput, setUpdateInput] = useState<{
    visible: boolean;
    isFolder: boolean | null;
  }>({
    visible: false,
    isFolder: null,
  });

  const handleNewFolderButton = (e: React.MouseEvent<HTMLButtonElement>, isFolder: boolean) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  const handleUpdateFolderButton = (e: React.MouseEvent<HTMLButtonElement>, isFolder: boolean, nodeValue: string) => {
    setNodeName(nodeValue);
    e.stopPropagation();
    setUpdateInput({
      visible: true,
      isFolder,
    });
  };

  const handleDeleteFolder = (e: React.MouseEvent<HTMLButtonElement>, isFolder: boolean) => {
    e.stopPropagation();
    handleDeleteNode(explorerData.id);
  };

  const onAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value) {
      handleInsertNode(explorerData.id, e.currentTarget.value, showInput.isFolder as boolean);
      setShowInput({ ...showInput, visible: false });
    }
  };

  const onUpdate = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value) {
      handleUpdateFolder(explorerData.id, e.currentTarget.value, true);
      setUpdateInput({ ...updateInput, visible: false });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNodeName(event.target.value);
  };

  return (
    <div>
      <div
        className="bg-gray-800 flex items-center justify-between p-2 w-72 cursor-pointer hover:bg-gray-600"
        onClick={() => setExpand(!expand)}
      >
        <span className="text-white flex items-center">
          {expand ? <VscChevronDown /> : <VscChevronRight />} <VscFolder />
          {updateInput.visible ? (
            <input
              type="text"
              value={nodeName}
              onChange={handleChange}
              autoFocus
              onBlur={() => setUpdateInput({ ...updateInput, visible: false })}
              onKeyDown={onUpdate}
              className="ml-2 bg-gray-700 text-white"
            />
          ) : (
            <label className="ml-2">{explorerData.name}</label>
          )}
        </span>

        <div className="flex">
          <button onClick={(e) => handleDeleteFolder(e, true)} className="bg-transparent text-white p-1">
            <VscTrash />
          </button>
          <button
            onClick={(e) => handleUpdateFolderButton(e, true, explorerData.name)}
            className="bg-transparent text-white p-1"
          >
            <VscEdit />
          </button>
          <button onClick={(e) => handleNewFolderButton(e, true)} className="bg-transparent text-white p-1">
            <VscNewFolder />
          </button>
          <button onClick={(e) => handleNewFolderButton(e, false)} className="bg-transparent text-white p-1">
            <VscNewFile />
          </button>
        </div>
      </div>

      <div
        id="folderContainer"
        className={`${expand ? "block" : "hidden"} ml-5`}
      >
        {showInput.visible && (
          <div className="bg-gray-800 flex items-center p-2 w-72 relative">
            <span className="text-white pr-1">{showInput.isFolder ? <VscFolder /> : <VscFile />}</span>
            <input
              type="text"
              autoFocus
              onBlur={() => setShowInput({ ...showInput, visible: false })}
              onKeyDown={onAdd}
              className="bg-gray-700 text-white w-3/4 ml-1"
            />
          </div>
        )}
        {explorerData.items.map((item, index) => (
          <Folder
            handleDeleteNode={handleDeleteNode}
            handleInsertNode={handleInsertNode}
            handleUpdateFolder={handleUpdateFolder}
            explorerData={item}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Folder;
