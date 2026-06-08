import { getChannelApi } from "@/api/article";
import { useEffect, useState } from "react";

export function useChannel() {
  const [channels, setChannels] = useState([]);
  useEffect(() => {
    async function getChannelList() {
      const res = await getChannelApi();
      setChannels(res.data.channels);
    }
    getChannelList();
  }, []);
  return { channels };
}
