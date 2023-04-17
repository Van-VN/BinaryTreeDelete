class TreeNode<T> {
  data: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
  constructor(data: T) {
    this.left = null;
    this.right = null;
    this.data = data;
  }
}

class BinaryTree<T> {
  root: TreeNode<T> | null;
  totalNode: number;

  constructor() {
    this.root = null;
    this.totalNode = 0;
  }

  getSize() {
    return this.totalNode;
  }

  insert(data: T) {
    let node = new TreeNode(data);
    if (!this.root) {
      this.root = node;
      this.totalNode++;
      return this.root;
    } else {
      let currentNode = this.root;
      while (currentNode) {
        if (data < currentNode.data) {
          if (!currentNode.left) {
            currentNode.left = node;
            break;
          }
          currentNode = currentNode.left;
        } else if (data > currentNode.data) {
          if (!currentNode.right) {
            currentNode.right = node;
            break;
          }
          currentNode = currentNode.right;
        } else if (data === currentNode.data) {
          return `ERROR!`;
        }
      }
      this.totalNode++;
      return currentNode;
    }
  }

  find(data: T) {
    let currentNode = this.root;
    while (currentNode) {
      if (data === currentNode.data) {
        return currentNode;
      } else if (data < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }  
    }
    return null;
  }

  deleteNode(key: T) {
    function deleteNodeHelper(root: TreeNode<T> | null, key: T) {
      if (!root) return null;
      if (root.data === key) {
        if (!root.left && !root.right) return null;
        if (!root.left) return root.right;
        if (!root.right) return root.left;
        let rightSmallest = root.right;
        while (rightSmallest.left) rightSmallest = rightSmallest.left;
        rightSmallest.left = root.left;
        return root.right;
      }
      if (root.data < key) root.right = deleteNodeHelper(root.right, key);
      else root.left = deleteNodeHelper(root.left, key);
      return root;
    }
    this.root = deleteNodeHelper(this.root, key);
  }
}

let bTree = new BinaryTree();
bTree.insert(10);
bTree.insert(12);
bTree.insert(15);
bTree.insert(11);
bTree.insert(6);
bTree.insert(4);
bTree.insert(8);
console.log(bTree);
bTree.deleteNode(11);
bTree.deleteNode(15);
console.log(bTree);
