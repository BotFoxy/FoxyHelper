module.exports = async (client, message) => {
    const faq = require('../faq/faq.json')

    responseObject = faq;
    if(responseObject[message.content]){
        message.reply(responseObject[message.content])
    }


}