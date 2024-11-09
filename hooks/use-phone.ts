import { useEffect, useState } from "react";
import { TelnyxRTC, IClientOptions, INotification } from "@telnyx/webrtc";
import { Call } from "@telnyx/webrtc/lib/src/Modules/Verto/webrtc/Call";

export function usePhone({
  login_token = "",
  login,
  password,
}: IClientOptions) {
  const [client, setClient] = useState<TelnyxRTC>();
  const [calls, setCalls] = useState<Call[]>([]);

  useEffect(() => {
    if (!login_token && !login) {
      console.warn(
        "No login_token or login provided, skipping Telnyx client creation"
      );
      return;
    }

    console.log("Creating Telnyx client");

    const telnyxClient = new TelnyxRTC({
      login_token,
      login,
      password,
    });

    telnyxClient.on("telnyx.notification", (notification: INotification) => {
      const call = notification.call as Call;

      console.log("Notification", notification);

      if (call) {
        console.log(
          "Notification for call",
          call.id,
          call.prevState,
          "->",
          call.state
        );

        setCalls((calls) =>
          // If it's a new call, add it to the list of known calls
          calls.includes(call) ? calls : [...calls, call]
        );

        // If the state of a call changes, force a re-render
        if (call.state !== call.prevState) {
          console.log(
            "call state changed from",
            call.prevState,
            "to",
            call.state
          );

          setCalls((calls) => [...calls]);
        }
      }
    });

    telnyxClient.connect();

    setClient(telnyxClient);

    return () => {
      if (process.env.NODE_ENV === "development" && telnyxClient) {
        console.warn(
          "Existing Telnyx client will be disconnected and destroyed."
        );
      }
      telnyxClient.disconnect();

      telnyxClient.off("telnyx.ready");

      telnyxClient.off("telnyx.error");

      telnyxClient.off("telnyx.notification");

      telnyxClient.off("telnyx.socket.close");

      telnyxClient.off("telnyx.socket.error");
    };
  }, [login_token, login, password]);

  const createCall = (number: string) => {
    console.log("creating a new outbound call to", number);

    const newCall = client?.newCall({
      destinationNumber: number.trim().replace("+", ""),
      callerNumber: process.env.NEXT_PUBLIC_TELNYX_INBOUND_NUMBER,
    });

    console.log("New call has id:", newCall?.id);
  };

  return { calls, createCall, client };
}

export default usePhone;
