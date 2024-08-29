let node, edge;
let inputStep = 0;
let nodes = {};
let currentNode = null;
let parentStack = [];
let buildStep = 'root';
let isFirstStart = true;
let rootNode;

// Ensure the iframe is ready
document.getElementById('log').contentDocument.body.innerHTML = '';

document.getElementById("run-js").addEventListener("click", function() {
    let jsCode = document.getElementById("js-code");
    let output = document.getElementById("log");
    let startButton = document.getElementById("run-js");
    let treeElement = document.querySelector('.tree');

    if (isFirstStart) {
        startButton.textContent = "Reset";
        isFirstStart = false;
    }

    jsCode.value = "Enter nodes: ";
    output.contentDocument.body.innerHTML = ""; // Clear the output
    treeElement.innerHTML = ""; // Clear the tree visualization
    document.getElementById("outputbox").value = ""; // Clear the postorder traversal output
    inputStep = 0;
    nodes = {};
    currentNode = null;
    parentStack = [];
    buildStep = 'root';
    rootNode = null;
    jsCode.focus();
});

document.getElementById("js-code").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        let jsCode = document.getElementById("js-code");
        let lines = jsCode.value.split('\n');
        let lastLine = lines[lines.length - 1];

        if (inputStep === 0 && lastLine.startsWith("Enter nodes: ")) {
            node = lastLine.replace("Enter nodes: ", "").trim();
            jsCode.value += "\nEnter edges: ";
            inputStep = 1;
        } else if (inputStep === 1 && lastLine.startsWith("Enter edges: ")) {
            edge = lastLine.replace("Enter edges: ", "").trim();
            displayInstructions();
            inputStep = 2;
        } else if (inputStep === 2) {
            handleTreeInput(lastLine);
        }

        jsCode.focus();
    }
});

function displayInstructions() {
    let jsCode = document.getElementById("js-code");
    jsCode.value += "\nNow let's build your tree. You will provide us the value of the nodes. And go crazy with the values: integers, characters, strings, anything and everything is possible, but no two nodes can share the same value." +
        " We will go left first for every node. So when you don't want any child node just input -1. " +
        "We will then move right. " +
        "\nAgain keep in mind that you CAN'T HAVE MORE THAN ONE NODE OF THE SAME VALUE in the tree." + "\n" +
        "\nEnter root node value: ";
}

function handleTreeInput(input) {
    let value = input.split(":")[1] ? input.split(":")[1].trim() : input.trim();
    let jsCode = document.getElementById("js-code");
    let output = document.getElementById("log");

    console.log(`Handling input: ${value}, Current node: ${currentNode}, Build step: ${buildStep}`);

    if (buildStep === 'root') {
        nodes[value] = { value: value, left: null, right: null };
        currentNode = value;
        rootNode = value;
        buildStep = 'left';
        jsCode.value += `\nEnter left child of ${value} (-1 for no child): `;
        output.contentDocument.body.innerHTML += `<p>Root node ${value} added. Enter left child:</p>`;
        console.log(`Root node ${value} added`);
    } else if (buildStep === 'left') {
        if (value === '-1') {
            buildStep = 'right';
            jsCode.value += `\nEnter right child of ${currentNode} (-1 for no child): `;
            output.contentDocument.body.innerHTML += `<p>No left child. Enter right child of ${currentNode}:</p>`;
            console.log(`No left child for ${currentNode}`);
        } else {
            nodes[value] = { value: value, left: null, right: null };
            nodes[currentNode].left = value;
            parentStack.push(currentNode);
            currentNode = value;
            jsCode.value += `\nEnter left child of ${value} (-1 for no child): `;
            output.contentDocument.body.innerHTML += `<p>Left child ${value} added. Enter its left child:</p>`;
            console.log(`Left child ${value} added to ${parentStack[parentStack.length-1]}`);
        }
    } else if (buildStep === 'right') {
        if (value === '-1') {
            if (parentStack.length > 0) {
                currentNode = parentStack.pop();
                buildStep = 'right';
                jsCode.value += `\nEnter right child of ${currentNode} (-1 for no child): `;
                output.contentDocument.body.innerHTML += `<p>No right child. Moving back to ${currentNode}. Enter right child:</p>`;
                console.log(`No right child, moving back to ${currentNode}`);
            } else {
                finishTreeConstruction();
                console.log('Tree construction complete');
            }
        } else {
            nodes[value] = { value: value, left: null, right: null };
            nodes[currentNode].right = value;
            currentNode = value;
            buildStep = 'left';
            jsCode.value += `\nEnter left child of ${value} (-1 for no child): `;
            output.contentDocument.body.innerHTML += `<p>Right child ${value} added. Enter its left child:</p>`;
            console.log(`Right child ${value} added to ${parentStack[parentStack.length-1] || rootNode}`);
        }
    }

    console.log('Current tree structure:', JSON.stringify(nodes, null, 2));
    updateVisualTree();
}

function postorderTraversal(rootNode) {
    let result = [];
    
    function traverse(nodeValue) {
        if (!nodeValue) return;
        
        let node = nodes[nodeValue];
        
        // Traverse left subtree
        traverse(node.left);

        // Traverse right subtree
        traverse(node.right);
        
        // Visit the current node
        result.push(nodeValue);    
        
    }
    
    console.log("Starting postorder traversal from root:", rootNode);
    traverse(rootNode);
    console.log("Finished postorder traversal, result:", result);
    return result;
}

function finishTreeConstruction() {
    let jsCode = document.getElementById("js-code");
    let output = document.getElementById("log");
    jsCode.value += `\nTree construction complete.`;
    console.log("Final tree structure:", JSON.stringify(nodes, null, 2));
    output.contentDocument.body.innerHTML += `<p>Tree construction complete. Here's the final tree structure:</p>
                                                     <pre>${JSON.stringify(nodes, null, 2)}</pre>`;
    
    // Perform postorder traversal
    console.log("Root node:", rootNode);
    let traversalResult = postorderTraversal(rootNode);
    let traversalString = traversalResult.join(' -> ');
    
    console.log("Traversal result:", traversalString);
    document.getElementById("outputbox").value = `Your Post Order Route Is: ${traversalString}`;

    // Render final visual representation
    updateVisualTree();

    // Reset the input step to allow for a new tree construction
    inputStep = 0;
    document.getElementById("run-js").textContent = "Reset";
}

function updateVisualTree() {
    const treeData = getTreeData();
    const treeElement = document.querySelector('.tree');
    if (treeElement) {
        treeElement.innerHTML = renderBinaryTree(treeData);
    } else {
        console.error("Tree element not found");
    }
}

function getTreeData() {
    function buildTreeObject(nodeValue) {
        if (!nodeValue || !nodes[nodeValue]) return null;

        let node = nodes[nodeValue];
        return {
            text: node.value,
            left: buildTreeObject(node.left),
            right: buildTreeObject(node.right)
        };
    }

    return buildTreeObject(rootNode);
}

function renderBinaryTree(node) {
    if (!node) return '';
    
    const { left, right, text } = node;
    const textElement = `<div class="node__element">${text}</div>`;
    return `
        ${textElement}
        ${
            left || right
                ? `
                    <div class="node__bottom-line"></div>
                    <div class="node__children">
                        ${
                            left
                                ? `
                                <div class="node node--left">
                                    ${renderBinaryTree(left)}
                                </div>
                                `
                                : ''
                        }
                        ${
                            right
                                ? `
                                <div class="node node--right">
                                    ${renderBinaryTree(right)}
                                </div>
                                `
                                : ''
                        }
                    </div>
                `
                : ''
        }
    `;
}