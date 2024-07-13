const getTreeData = () => {
  return {
    element: 'A',
    left: {
      element: 'B',
      left: {
        element: 'B1',
      },
      right: {
        element: 'B2',
      },
    },
    right: {
      element: 'C',
      left: {
        element: 'C1',
        left: {
          element: 'C11',
          left: {
            element: 'C12',
          },
        },
      },
      right: {
        element: 'C2',
        left: {
          element: 'C21',
        },
        right: {
          element: 'C22',
          left: {
            element: 'C221',
            left: {
              element: 'C2211',
            },
          },
          right: {
            element: 'C222',
            right: {
              element: 'C2221',
            },
          },
        },
      },
    },
  };
};

export const renderBinaryTree = (node) => {
  const { left, right, element} = node;
  return `
    <div class="node__element">${element}</div>
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