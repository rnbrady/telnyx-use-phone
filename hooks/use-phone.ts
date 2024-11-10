import { useEffect, useState } from "react";
import { TelnyxRTC, IClientOptions, INotification } from "@telnyx/webrtc";
import { type Call } from "@telnyx/webrtc/lib/src/Modules/Verto/webrtc/Call";

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

    const addListenerToTelnyxClient = (event: string) => {
      telnyxClient.on(event, (notification: INotification) => {
        const call = notification?.call as Call;

        console.log("Event callback telnyx.notification:", notification);

        if (call) {
          console.log(
            "Notification for call",
            call.id,
            call.prevState,
            "->",
            call.state
          );

          setCalls((calls) =>
            // If it's a new call, add it to the list, otherwise just trigger a
            // re - render as the call state has probably been updated
            calls.includes(call) ? [...calls] : [call, ...calls]
          );
        }
      });
    };

    addListenerToTelnyxClient("telnyx.notification");

    addListenerToTelnyxClient("telnyx.ready");

    addListenerToTelnyxClient("telnyx.error");

    addListenerToTelnyxClient("telnyx.socket.close");

    addListenerToTelnyxClient("telnyx.socket.error");

    telnyxClient.connect();

    setClient(telnyxClient);

    return () => {
      if (telnyxClient) {
        console.log(
          "Existing Telnyx client will be disconnected and destroyed."
        );

        telnyxClient.disconnect();

        telnyxClient.off("telnyx.notification");

        telnyxClient.off("telnyx.ready");

        telnyxClient.off("telnyx.error");

        telnyxClient.off("telnyx.socket.close");

        telnyxClient.off("telnyx.socket.error");
      }
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

export { type Call };
