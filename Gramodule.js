cfg.Node, cfg.MUI, cfg.Dark;
ide.AddModule("request");
ide.AddModule("fs")

const uiComponents = require("Components.js");
const telegram = require("Telegram.js");
const client = "your_telegram_id"; // Client's telegram id
var mediaPath = null;

function OnStart()
{
    // Create window components
    const rootLay = app.CreateLayout("Linear", "Vertical, FillXY");
    const requestBtn = uiComponents.setupButton(0.3, "Send", on_request);
    const loadMediaBtn = uiComponents.setupButton(0.3, "Load Image", on_load_image);
    imagePathLbl = app.CreateText(`Media Path: ${mediaPath}`, 0.7);
    messageEdt = uiComponents.setupTextEdit(0.8, "Message", "Multiline");
    
    // Setup them
    loadMediaBtn.SetMargins(0, 0.05);
    requestBtn.SetMargins(0, 0.05);
    imagePathLbl.SetMargins(0, 0.01);
    imagePathLbl.SetEllipsize("end");    

    // Add to window
    rootLay.AddChild(messageEdt);
    rootLay.AddChild(loadMediaBtn);
    rootLay.AddChild(imagePathLbl);
    rootLay.AddChild(requestBtn);
    app.AddLayout(rootLay);
}

function on_load_image()
{    
    app.ChooseFile("Select Image", "image/*", function(selectedPath) {
        if (selectedPath) {
            mediaPath = app.Uri2Path(selectedPath);
            imagePathLbl.SetText(`Media Path: ${mediaPath}`);
        }
    });
}

function on_request()
{
    var message = messageEdt.GetText();
    if(!message.length && mediaPath == null)
    {
        app.ShowPopup("Message field can't be empty");
        return;
    }
    
    telegram.sendMessage(message, client);
    if(mediaPath != null)
        telegram.sendImage("image.png", mediaPath, client);
}
