/**
 * @name NoConsoleSpam
 * @author Night 👻#4206
 * @description No Self-XSS warning spam when you open the console.
 * @version 1.0.2
 * @authorId 797208386076672020
 * @authorLink https://0g.vc/
 * @source https://raw.githubusercontent.com/9o3/BD-no-console-spam/main/NoConsoleSpam.plugin.js
 */
module.exports = class NoConsoleSpam {
    start() {
        const version = "1.0.2";
        var request = require('request');
        request.get('https://raw.githubusercontent.com/9o3/BD-no-console-spam/main/version.txt', async (err, _response, body) => {
            if (body.trim() != version && body.trim() != "Not Found") {
                BdApi.showConfirmationModal('Outdated version!', "The plugin NoConsoleSpam is outdated. Please click Update to update it.", {
                confirmText: 'Update',
                cancelText: 'Cancel',
                onConfirm: () => {
                    require('request').get('https://raw.githubusercontent.com/9o3/BD-no-console-spam/main/NoConsoleSpam.plugin.js', async (err, _response, body) => {
                        if (err) return request.shell.openExternal('https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/9o3/BD-no-console-spam/main/NoConsoleSpam.plugin.js');
                        await new Promise(r => require('fs').writeFile(require('path').join(BdApi.Plugins.folder, 'NoConsoleSpam.plugin.js'), body, r));
                    });
                }
                });
            }
        });
        var filter = t=>{
            let n = "";
            n = JSON.stringify(t);
            if(!n){
                n = t.toString();
            }
            if (!n.includes("DISCORD_DESC_SHORT")){
                return !1;
            }
            return !0;
        }
        BdApi.findModule(filter).default.Messages.XSSDefenses = {};
    }
    stop() {
        var filter = t=>{
            let n = "";
            n = JSON.stringify(t);
            if(!n){
                n = t.toString();
            }
            if (!n.includes("DISCORD_DESC_SHORT")){
                return !1;
            }
            return !0;
        }
        BdApi.findModule(filter).default.Messages.XSSDefenses = null;
    }
}
