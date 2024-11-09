"use client";

import { usePhone } from "@/hooks/use-phone";
import CallWidget from "@/components/call-widget";
import DialPad from "@/components/dialpad";

export default function Phone() {
  const { calls, createCall } = usePhone({
    login: process.env.NEXT_PUBLIC_TELNYX_LOGIN,
    password: process.env.NEXT_PUBLIC_TELNYX_PASSWORD,
  });

  return (
    <div className="flex flex-col gap-4 items-start w-full">
      <h2 className="text-sm text-gray-600 text-center w-full">
        Call in on {process.env.NEXT_PUBLIC_TELNYX_INBOUND_NUMBER} or call out
        below:
      </h2>
      <DialPad createCall={createCall} />
      {calls.map((call) => (
        <CallWidget call={call} key={call.id} />
      ))}
    </div>
  );
}
