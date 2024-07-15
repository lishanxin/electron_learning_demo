

// const { ipcRenderer } = require('electron');
const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${window.versions.chrome()}), Node.js (v${window.versions.node()}), and Electron (v${window.versions.electron()})`


const func = async () => {
    const response = await window.versions.ping()
    alert(response);
}
  
// func()


// 调用主进程的导入和读取文件函数
async function importFile() {
    const response = await window.fileOpt.import()
    alert(JSON.stringify(response));
}
// 例如，可以在按钮点击事件中调用该函数
document.getElementById('importFileBtn').addEventListener('click', importFile);
