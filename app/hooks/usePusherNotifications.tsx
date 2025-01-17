"use client";

import { useState, useEffect } from "react";
import Pusher from "pusher-js";
import { AppointmentResponse } from "@/types";

// Configuration de Pusher
const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
});

const usePusherNotifications = () => {
  const [message, setMessage] = useState<AppointmentResponse | null>(null);

  useEffect(() => {
    const channel = pusher.subscribe("notifications");

    const handleNewMessage = ({ message }: AppointmentResponse) => {
      setMessage(message);
    };

    channel.bind("appointment", handleNewMessage);

    // Cleanup function to unsubscribe when the component unmounts
    return () => {
      channel.unbind("appointment", handleNewMessage);
      pusher.unsubscribe("notifications");
    };
  }, []);

  return message;
};

export default usePusherNotifications;
