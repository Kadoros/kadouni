interface TreeNode {
  id: string; // Keep as string as per your choice
  name: string;
  isFolder: boolean;
  items: TreeNode[];
}

const useTraverseTree = () => {
  function insertNode(
    tree: TreeNode,
    folderId: string,
    itemName: string,
    isFolder: boolean
  ): TreeNode {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime().toString(), // Ensure ID is a string
        name: itemName,
        isFolder,
        items: [],
      });
      return tree;
    }

    for (const obj of tree.items) {
      const res = insertNode(obj, folderId, itemName, isFolder);
      if (res) {
        return res;
      }
    }
    return tree; // Return the original tree if no node was modified
  }

  function deleteNode(tree: TreeNode, folderId: string): TreeNode {
    // Base case: found the node to be deleted
    if (tree.id === folderId) {
      // Node found, return null to remove it from the parent
      return { ...tree, items: [] }; // Return an empty items array to indicate deletion
    }

    if (tree.items && tree.items.length > 0) {
      // If the node has children, recursively process them
      tree.items = tree.items
        .map((child) => deleteNode(child, folderId))
        .filter(Boolean) as TreeNode[]; // Filter out null values
    }

    return { ...tree, items: tree.items.length > 0 ? tree.items : [] }; // Ensure items is an array
  }

  function updateNode(
    tree: TreeNode,
    folderId: string,
    itemName: string,
    isFolder?: boolean // isFolder is optional for update
  ): TreeNode {
    if (tree.id === folderId) {
      // Node found, update its properties
      return {
        ...tree,
        name: itemName,
        isFolder: isFolder !== undefined ? isFolder : tree.isFolder, // Update if provided
      };
    }

    if (tree.items && tree.items.length > 0) {
      tree.items = tree.items.map((child) =>
        updateNode(child, folderId, itemName, isFolder)
      );
    }

    return { ...tree };
  }

  return { insertNode, deleteNode, updateNode };
};

export default useTraverseTree;
