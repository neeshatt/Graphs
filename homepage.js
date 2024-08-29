const getTreeData = () => {
  return {
      text: 'Point Zero',
      link: "pointzero.html",
    left: {
      text: 'Walk The Walk',
      link: "walkthewalk.html",
      left: {
        text: 'Learn Your Graphs!',
        link: "Graphs.html",
        left: {
          text: 'Graph Coloring',
          link: "coloring.html",
          left: {
            text: 'You Do It!',
            link: "graph_coloring.html",
          },
        },
      },
      right: {
        text: 'Know Your Neighbours',
        link: "adjacency.html",
        left: {
          text: 'LionHeart Euler',
          link: "euler.html",
          left: {
            text: 'Breadth First!',
            link: "BFS.html",
          },
          right: {
            text: 'Depth First!',
            link: "DFS.html",
          },
        },
        right: {
          text: 'Hamilton',
          link: "hamilton.html",
        },
      },
    },
    right: {
      text: 'Incidence And Degree',
      link: "degree.html",
      left: {
        text: 'Philosophia Botanica',
        link: "trees.html",
        left: {
          text: 'Spend Less with Spanning Trees',
          link: "spantree.html",
          left: {
            text: 'Pre Order Traversal',
            link: "preorder.html",
          },
          right: {
            text: 'PostOrder Traversal',
            link: "postorder.html",
          },
        },
        right: {
          text: 'Double Trouble',
          link: "binary.html",
          left: {
            text: 'In Order Traversal',
            link: "inorder.html",
          },
          right: {
            text: 'LevelOrder Traversal',
            link: "levelorder.html",
          },
        },
      },
      right: {
        text: 'Tree-mendous Theorems',
        link: "theorems.html",
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
