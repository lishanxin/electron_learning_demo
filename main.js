const { app, BrowserWindow, ipcMain } = require('electron/main')
const { dialog } = require('electron');
const fs = require('fs');
const path = require('node:path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

console.log("error, sdlfjkakdjf")

app.whenReady().then(() => {
  ipcMain.handle('ping', () => 'pong')
  createWindow()
  exportDbFileToDesktop()
  app.on('activate', () => {
    
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('electron_song.db');

db.serialize(function() {
    db.run("CREATE TABLE  IF NOT EXISTS lorem (info TEXT)");

    var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
    for (var i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i);
    }

    stmt.finalize();
});

db.close();

function exportDbFileToDesktop() {
  // 获取数据库文件路径
  const dbFilePath = path.join(__dirname, 'electron_song.db');

  // 弹出保存文件对话框
  dialog.showSaveDialog({
    title: 'Save Database File',
    defaultPath: path.join(app.getPath('desktop'), 'your_db_file.db'), // 默认文件名和桌面路径
    buttonLabel: 'Save', // 保存按钮的标签
    filters: [
      { name: 'Database Files', extensions: ['db'] } // 可保存的文件类型和扩展名
    ]
  }).then(result => {
    if (!result.canceled) {
      // result.filePath 包含用户选择的文件路径
      const filePath = result.filePath;

      // 复制数据库文件到用户选择的路径
      fs.copyFile(dbFilePath, filePath, (err) => {
        if (err) {
          console.error('Failed to export the database file:', err);
        } else {
          console.log('Database file exported successfully');
        }
      });
    }
  }).catch(err => {
    console.error('Error while exporting the database file:', err);
  });
}