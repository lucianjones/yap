import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postChannel } from "../../store/channels";
import { getServers } from "../../store/servers";

function ChannelForm({ server_id, setShowModal }) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [channelName, setChannelName] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const submit = async (e) => {
    e.preventDefault();
    const data = await dispatch(postChannel(server_id, channelName, isPublic));
    if (data.errors) {
      setErrors(data.errors);
    }
	dispatch(getServers());
    setShowModal(false)
  };

  return (
    <>
      <form id='channel-form' onSubmit={submit}>
        <div>
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </div>
          <label htmlFor="channelName">Channel Name</label>
          <input
            id='channel-form-input'
            name="channelName"
            type="text"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
          />
        <div>
          <label htmlFor="public">Public</label>
          <input
            name="public"
            type="checkbox"
            value={isPublic}
            onChange={(e) => setIsPublic(e.target.value)}
          />
        </div>
        <button id='channel-submit' type="submit">Submit</button>
      </form>
    </>
  );
}

export default ChannelForm;
