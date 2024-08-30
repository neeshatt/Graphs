const getTreeData = () => {
    return {
        text: 'LionHeart Euler',
        link: "euler.html",
      left: {
        text: 'Breadth First!',
      },
      right: {
        text: 'Depth First!',
        link: "DFS.html",
      },
    };
  };
  
  const renderBinaryTree = (node2) => {
    const { left, right, text, link } = node2;
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
                  <div class="node2 node--left">
                    ${renderBinaryTree(left)}
                  </div>
                  `
                  : ''
              }
              ${
                right
                  ? `
                  <div class="node2 node--right">
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