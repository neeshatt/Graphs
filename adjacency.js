const getTreeData = () => {
    return {
        text: 'Walk The Walk',
        link: "walkthewalk.html",
      right: {
        text: 'Know Your Neighbours',
        right: {
            text: 'Hamilton',
            link: "hamilton.html",
          },
        left: {
            text: 'LionHeart Euler',
            link: "euler.html",
          },
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