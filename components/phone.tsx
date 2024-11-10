"use client";

import { usePhone } from "@/hooks";
import { CallWidget, DialPad } from "@/components";
import { credentials, number } from "@/settings";

export default function Phone() {
  const { calls, createCall } = usePhone(credentials);

  return (
    <>
      <h2 className="text-sm text-gray-600 text-center w-full">
        Call in on {number} or call out below:
      </h2>
      <DialPad createCall={createCall} />
      {calls.map((call) => (
        <CallWidget call={call} key={call.id} />
      ))}
    </>
  );
}
