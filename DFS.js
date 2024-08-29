let inputStep = 0;
let numNodes = 0;
let currentNode = 1;
let nodes = [];
let edges = [];

document.getElementById("start-btn").addEventListener("click", function() {
    inputStep = 0;
    numNodes = 0;
    currentNode = 1;
    nodes = [];
    edges = [];
    document.getElementById("js-code").value = "Number of nodes: ";
    document.getElementById("log").contentDocument.body.innerHTML = "";
    document.getElementById("graph").innerHTML = "";
    document.getElementById("dfs-output").value = "";
    document.getElementById("adjacency-matrix").innerHTML = "";
});

document.getElementById("js-code").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        let jsCode = document.getElementById("js-code");
        let logFrame = document.getElementById("log");
        let lines = jsCode.value.split('\n');
        let lastLine = lines[lines.length - 1];

        if (inputStep === 0) {
            numNodes = parseInt(lastLine.replace("Number of nodes: ", "").trim());
            if (isNaN(numNodes) || numNodes <= 0) {
                logFrame.contentDocument.body.innerHTML += "<p>Please enter a valid positive number.</p>";
            } else {
                jsCode.value += `\nConnected nodes for Node ${currentNode} (separated by comma): `;
                inputStep = 1;
                logFrame.contentDocument.body.innerHTML += `<p>${numNodes} nodes will be created.</p>`;
            }
        } else if (inputStep === 1) {
            let connectedNodes = lastLine.replace(`Connected nodes for Node ${currentNode} (separated by comma): `, "").split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n) && n > 0 && n <= numNodes && n !== currentNode);
            
            if (!nodes.includes(currentNode)) {
                nodes.push(currentNode);
            }
            
            connectedNodes.forEach(node => {
                if (!nodes.includes(node)) {
                    nodes.push(node);
                }
                if (!edges.some(edge => (edge[0] === currentNode && edge[1] === node) || (edge[0] === node && edge[1] === currentNode))) {
                    edges.push([currentNode, node]);
                }
            });
            
            logFrame.contentDocument.body.innerHTML += `<p>Node ${currentNode} connected to: ${connectedNodes.join(', ')}</p>`;
            renderGraph();
            
            currentNode++;
            if (currentNode <= numNodes) {
                jsCode.value += `\nConnected nodes for Node ${currentNode} (separated by comma): `;
            } else {
                finishGraphConstruction();
            }
        }

        jsCode.focus();
    }
});

function finishGraphConstruction() {
    let jsCode = document.getElementById("js-code");
    let logFrame = document.getElementById("log");
    jsCode.value += "\nGraph construction complete.";
    logFrame.contentDocument.body.innerHTML += "<p>Graph construction complete. Here's the final graph structure:</p>";
    logFrame.contentDocument.body.innerHTML += `<p>Nodes: ${nodes.join(", ")}</p>`;
    logFrame.contentDocument.body.innerHTML += "<p>Edges:</p>";
    edges.forEach(edge => {
        logFrame.contentDocument.body.innerHTML += `<p>${edge[0]} - ${edge[1]}</p>`;
    });
    displayAdjacencyMatrix();
}

function renderGraph() {
    const graphElement = document.getElementById('graph');
    graphElement.innerHTML = '';

    const width = graphElement.clientWidth;
    const height = graphElement.clientHeight;
    const radius = Math.min(width, height) / 2 - 50;
    const nodeRadius = 20;

    const nodeElements = nodes.map((node, index) => {
        const angle = (index / nodes.length) * 2 * Math.PI;
        const x = width / 2 + radius * Math.cos(angle);
        const y = height / 2 + radius * Math.sin(angle);

        const nodeElement = document.createElement('div');
        nodeElement.className = 'node';
        nodeElement.textContent = node;
        nodeElement.style.left = `${x - nodeRadius}px`;
        nodeElement.style.top = `${y - nodeRadius}px`;
        graphElement.appendChild(nodeElement);

        return { element: nodeElement, x, y, angle };
    });

    edges.forEach(([from, to]) => {
        const fromNode = nodeElements[nodes.indexOf(from)];
        const toNode = nodeElements[nodes.indexOf(to)];

        const angle = Math.atan2(toNode.y - fromNode.y, toNode.x - fromNode.x);
        const startX = fromNode.x + nodeRadius * Math.cos(angle);
        const startY = fromNode.y + nodeRadius * Math.sin(angle);
        const endX = toNode.x - nodeRadius * Math.cos(angle);
        const endY = toNode.y - nodeRadius * Math.sin(angle);

        const edge = document.createElement('div');
        edge.className = 'edge';
        const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
        const edgeAngle = Math.atan2(endY - startY, endX - startX);
        
        edge.style.width = `${length}px`;
        edge.style.left = `${startX}px`;
        edge.style.top = `${startY}px`;
        edge.style.transform = `rotate(${edgeAngle}rad)`;
        
        graphElement.appendChild(edge);
    });

    displayAdjacencyMatrix();
}

function dfs(startNode) {
    const visited = new Set();
    const result = [];

    function dfsRecursive(node) {
        visited.add(node);
        result.push(node);

        for (const [from, to] of edges) {
            if (from === node && !visited.has(to)) {
                dfsRecursive(to);
            } else if (to === node && !visited.has(from)) {
                dfsRecursive(from);
            }
        }
    }

    dfsRecursive(startNode);
    return result;
}

document.getElementById("dfs-btn").addEventListener("click", function() {
    let startNode = parseInt(document.getElementById("start-node").value);
    if (isNaN(startNode) || !nodes.includes(startNode)) {
        alert("Please enter a valid starting node.");
        return;
    }
    const traversalResult = dfs(startNode);
    document.getElementById("dfs-output").value = `DFS traversal starting from node ${startNode} is: ${traversalResult.join(' -> ')}`;
});

function generateAdjacencyMatrix() {
    const matrix = Array(numNodes).fill().map(() => Array(numNodes).fill(0));
    edges.forEach(([from, to]) => {
        matrix[from - 1][to - 1] = 1;
        matrix[to - 1][from - 1] = 1;  // Assuming undirected graph
    });
    return matrix;
}

function displayAdjacencyMatrix() {
    const matrix = generateAdjacencyMatrix();
    const matrixElement = document.getElementById('adjacency-matrix');
    matrixElement.innerHTML = '';
    
    const table = document.createElement('table');
    
    // Create header row
    const headerRow = table.insertRow();
    headerRow.insertCell(); // Empty cell for top-left corner
    for (let i = 1; i <= numNodes; i++) {
        const th = document.createElement('th');
        th.textContent = i;
        headerRow.appendChild(th);
    }
    
    // Create matrix rows
    for (let i = 0; i < numNodes; i++) {
        const row = table.insertRow();
        const th = document.createElement('th');
        th.textContent = i + 1;
        row.appendChild(th);
        
        for (let j = 0; j < numNodes; j++) {
            const cell = row.insertCell();
            cell.textContent = matrix[i][j];
        }
    }
    
    matrixElement.appendChild(table);
}