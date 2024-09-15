import axios from "axios";
import { useState } from "react";

function Message() {
  const [loading, setLoading] = useState(false);

  const sendMessage = async ({ name, tel }) => {
    setLoading(true);

    const token = "7389531994:AAE3VRO4wVMfCkUzx7JNQjyATf8h28ragjE";
    const chatId = -1002133487518;
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    try {
      await axios.post(url, {
        chat_id: chatId,
        text: `Name: ${name}\nTelephone: ${tel}\nProject: Ecommerce`,
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
}

export default Message;
