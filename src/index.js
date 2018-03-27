/*
TODO

*/

const { Bot } = require('@dlghq/dialog-bot-sdk');
const config = require('./config');

const bot = new Bot();

const adminGroup = {
  type: 'group',
  id: 162263878,
  key: 'g162263878',
};

const groupIDs = config.IDs;

function isGroupValid(id) {
  const res = groupIDs.find(e => id === e);
  if (res) {
    return res;
  }
  return false;
}

bot.onMessage(async (peer, message) => {
  if (isGroupValid(peer.id) && message.content.text.search(config.mention) !== -1) {
    try {
      const messenger = await bot.ready;

      const groupInfo = await messenger.getGroup(peer.id);
      await bot.sendTextMessage(adminGroup, `*${groupInfo.name}*`, {
        peer,
        type: 'forward',
        rids: [message.rid],
      });
    } catch (error) {
      console.log(error);
    }
  }
});
