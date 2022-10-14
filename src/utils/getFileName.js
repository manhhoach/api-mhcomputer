const getFileName=(filename)=>{
    let i=filename.lastIndexOf('.');
    return filename.slice(0,i);
}
module.exports = {
    getFileName
}