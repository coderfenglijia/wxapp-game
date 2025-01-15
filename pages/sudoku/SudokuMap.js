var Node = require("./Node.js");

/**
 * SudokuMap 类 - 代表一个数独地图（9x9），由多个 Node 对象组成。
 * 包含以下属性：
 * - nodeMap：一个二维数组，存储了 9x9 个 Node 对象，每个 Node 对应数独的一个格子。
 * - solvedNodesNum：已填充的格子的数量，初始为 0。
 */
function SudokuMap() {
  this.nodeMap = new Array();  // 用于存储 9x9 的 Node 数组
  for (var i = 0; i < 9; i++) {
    this.nodeMap[i] = new Array();  // 每行初始化一个数组
    for (var j = 0; j < 9; j++) {
      // 初始化每个格子为一个 Node 对象，初始值为 0，坐标为 (i, j)
      this.nodeMap[i][j] = new Node(0, i, j, null);
    }
  }
  this.solvedNodesNum = 0;  // 初始已解答的格子数量为 0
}

SudokuMap.prototype = {
  /**
   * 获取指定坐标的 Node 对象
   * @param {number} row - 行坐标
   * @param {number} col - 列坐标
   * @returns {Node} - 返回对应坐标的 Node 对象
   */
  getNode: function (row, col) {
    return this.nodeMap[row][col];
  },

  /**
   * 获取指定行的所有 Node 对象
   * @param {number} row - 行坐标
   * @returns {Array} - 返回一个包含指定行所有 Node 对象的数组
   */
  getRow: function (row) {
    var result = new Array();
    for (var i = 0; i < 9; i++) {
      result[i] = this.nodeMap[row][i];  // 将该行的每个 Node 加入结果数组
    }
    return result;
  },

  /**
   * 获取指定列的所有 Node 对象
   * @param {number} col - 列坐标
   * @returns {Array} - 返回一个包含指定列所有 Node 对象的数组
   */
  getCol: function (col) {
    var result = new Array();
    for (var i = 0; i < 9; i++) {
      result[i] = this.nodeMap[i][col];  // 将该列的每个 Node 加入结果数组
    }
    return result;
  },

  /**
   * 根据输入的 9x9 数组初始化 SudokuMap
   * @param {Array} input - 9x9 数组，每个元素是一个数字，表示初始值
   */
  init: function (input) {
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        // 使用输入的值创建新的 Node 对象，初始化数独格子
        this.nodeMap[i][j] = new Node(input[i][j], i, j);
      }
    }
    this.solvedNodesNum = 0;  // 初始化时，已解答的格子数量为 0
  },

  /**
   * 克隆当前的 SudokuMap，返回一个全新的对象
   * @returns {SudokuMap} - 返回当前 SudokuMap 的副本
   */
  clone: function() {
    var cloneObj = new SudokuMap();  // 创建一个新的 SudokuMap 对象
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        // 克隆每个 Node 对象
        cloneObj.nodeMap[i][j] = this.nodeMap[i][j].clone();
      }
    }
    cloneObj.solvedNodesNum = this.solvedNodesNum;  // 克隆已解答的格子数量
    return cloneObj;
  },

  /**
   * 增加已解答的格子数量
   * @returns {number} - 返回增加后的已解答格子数量
   */
  addByOne: function() {
    return ++this.solvedNodesNum;  // 每次调用增加已解答格子数量
  },

  /**
   * 获取当前 SudokuMap 中 9x9 的所有数值
   * @returns {Array} - 返回一个 9x9 的二维数组，包含当前所有格子的值
   */
  getResult: function() {
    var rnt = new Array();
    for (var i = 0; i < 9; i++) {
      rnt.push(new Array());  // 初始化二维数组
    }
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        // 填充结果数组，存储每个 Node 对象的值
        rnt[i][j] = this.nodeMap[i][j].value;
      }
    }
    return rnt;
  }
}

module.exports = SudokuMap;  // 导出 SudokuMap 类，供其他模块使用
