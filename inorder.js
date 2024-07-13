class Node {
    constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
    }
  }
  
  function buildNode(root) {
    console.log("Enter data: ");
    let data = parseInt(prompt());
    root = new Node(data);
  
    if (data === -1) {
      return null;
    }
  
    console.log("Left of " + data + " ");
    root.left = buildNode(root.left);
    console.log("Right of " + data + " ");
    root.right = buildNode(root.right);
  
    return root;
  }
  
  function inOrder(root) {
    if (root === null) {
      return;
    }
    inOrder(root.left);
    console.log(root.data + " ");
    inOrder(root.right);
  }
  
  function main() {
    let root;
    root = buildNode(root);
    inOrder(root);
    console.log();
  }
  
  main();
  
  