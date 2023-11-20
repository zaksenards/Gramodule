const botToken = "you_bot_token" // Telegram bot token
const request = require("request");
const utils = require("Utils");
const fs = require("fs");

function _requestCallback(err, resp, body)
{
    try
    {
        var status = err["statusCode"];
        if(status != 200)
        {
            console.log(resp);
        }    
    }catch(err)
    {

    }
}

function sendMessage(text, to_client)
{
    const apiUrl = `https://api.telegram.org/${botToken}/sendMessage`
    var url = `${apiUrl}?chat_id=${to_client}&text=${text}`;
    request.get(url).on('response', _requestCallback);
}

async function sendImage(file_name, file_path, to_client)
{    
    try
    {
        const image = fs.readFileSync(file_path);
          
        const apiUrl = `https://api.telegram.org/${botToken}/sendPhoto`
    
        const requestOptions = {
            method: 'POST',
            url: apiUrl,
            formData: {
            chat_id: to_client,
            photo: {
                value: image,
                options: {
                    filename: file_name, // You can change the filename if needed
                    contentType: utils.getMimetype(file_path), // Adjust the content type based on your image type
              },
            },
          },
        };
        
        request(requestOptions, _requestCallback);
        
  }catch(error)
    {
        console.log(`Error: ${error}\nPath: ${file_path}`);
        app.ShowPopup("Can't send image error\n");
    }
}

async function sendVideo(file_name, file_path, to_client)
{

}

module.exports = {
  sendMessage,
  sendImage,
};
