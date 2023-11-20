
function getExtension(file_name)
{
    if(!file_name)
        return;
        
    var length = file_name.length;
    var index;
    for(index = length; file_name[index] != '.';index--);
    var extension = file_name.slice(index+1, length);
    return extension;
}

function getMimetype(file_name)
{
    const images = ["png","jpg","bmp","jpeg"];
    const extension = getExtension(file_name);

    for(i in images){
        if(extension.toLowerCase() == i)
            return `image/${extension}`    
    }
}

module.exports = {
    getExtension,
    getMimetype
};