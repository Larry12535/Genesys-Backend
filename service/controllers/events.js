module.exports = function (workspaceApi, io, storage) {

  // Event when the agent state has changed (Ready, Not Ready..)
  workspaceApi.on('DnStateChanged', async msg => {
    io.emit('voice-update', msg);
  });

  // Event when the call state has changed (Ringing, Established..)
  workspaceApi.on('CallStateChanged', async msg => {
    io.emit('call-update', msg);
  });

}