const getTreeData = () => {
  return {
      text: 'Point Zero',
      link: "problemset.html",
    left: {
      text: 'test12',
      left: {
        text: 'test122',
      },
      right: {
        text: 'test123',
      },
    },
    right: {
      text: 'test13',
      left: {
        text: 'test132',
        left: {
          text: 'test1321',
          left: {
            text: 'test13211',
          },
        },
      },
      right: {
        text: 'test133',
        left: {
          text: 'test1332',
        },
        right: {
          text: 'test1333',
          left: {
            text: 'test1321',
            left: {
              text: 'test13211',
            },
          },
          right: {
            text: 'test1321',
            right: {
              text: 'test13211',
            },
          },
        },
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
