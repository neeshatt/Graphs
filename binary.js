const getTreeData = () => {
    return {
        text: 'Philosophia Botanica',
        link: "trees.html",
      right: {
        text: 'Double Trouble',
        left: {
            text: 'In Order Traversal',
            link: "inorder.html",
        },
        right: {
            text: 'Level Order Traversal',
            link: "levelorder.html",
        },
      },
    };
  };
  
const renderBinaryTree = (node) => {
const { left, right, text, link } = node;
const textElement = link
    ? `<div class="node__element"><a href="#" onclick="window.location.href='${link}'; return false;" class=node__link>${text}</a></div>`
    : `<div class="node__element">${text}</div>`;
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
};

const main = () => {
const rootNode = getTreeData();
console.log('treeData', rootNode);
const treeDOMElement = document.querySelector('.tree');
treeDOMElement.innerHTML = renderBinaryTree(rootNode);
};

main();