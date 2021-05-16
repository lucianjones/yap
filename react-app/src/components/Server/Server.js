import React, { useState, useEffect } from "react";

import Channel from "../Channel";
import { socket } from "../../socket/socket";
import ChannelFormModal from "../ChannelFormModal";
import "./Server.css";

function Server({ server, channel_id, server_id }) {
  const [channels, setChannels] = useState(false);

  useEffect(() => {
    if (!channels && server.channels) {
      server.channels.forEach((channel) => {
        socket.emit("leave", { room: channel.id });
      });
    } else if (channels && server.channels) {
      server.channels.forEach((channel) => {
        socket.emit("join", { room: channel.id });
      });
    }
  }, [channels, server.channels]);

  return (
    <div id="channels">
      <button
        className="server-button"
        onClick={() => (channels ? setChannels(false) : setChannels(true))}
      >
        {server.server_name}
      </button>
      {channels && <ChannelFormModal server_id={server.id} />}
      {channels &&
        server.channels.map((channel) => (
          <Channel
            key={channel.id}
            sid={server.id}
            channel={channel}
            channel_id={channel_id}
            server_id={server_id}
          />
        ))}
    </div>
  );
}

export default Server;
