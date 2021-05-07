import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postChannel } from "../../store/channels";

function ChannelForm({ server_id }) {
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
  };

  return (
    <>
      <form onSubmit={submit}>
        <div>
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </div>
        <div>
          <label htmlFor="channelName">Channel Name</label>
          <input
            name="channelName"
            type="text"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="public">Public</label>
          <input
            name="public"
            type="checkbox"
            value={isPublic}
            onChange={(e) => setIsPublic(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default ChannelForm;
