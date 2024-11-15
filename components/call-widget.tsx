import { Audio } from "@telnyx/react-client";
import { Call } from "@/hooks/use-phone";

export function CallWidget({ call }: { call: Call }) {
  return (
    <div
      className="bg-gray-700 p-2 rounded text-gray-300 flex flex-col items-start gap-2 w-full shadow-lg"
      key={call.id}
    >
      <div className="ml-1">
        {call.direction === "outbound"
          ? "Outbound call to +" + call.options.destinationNumber
          : "Inbound call from " + call.options.remoteCallerNumber}
      </div>

      <div className="flex items-end justify-between w-full">
        <div className="bg-gray-600 text-gray-300 px-2 mb-2 ml-1 rounded-lg">
          {call.state}
        </div>

        <div className="flex items-center gap-2">
          {(call.state === "active" || call.state === "held") && (
            <button
              className="bg-blue-500 text-white py-1 px-2 rounded  disabled:bg-gray-500"
              onClick={() => {
                console.log("Holding call", call.id, "on user request");
                if (call.state === "held") {
                  call?.unhold();
                } else {
                  call?.hold();
                }
              }}
            >
              {call.state === "held" ? "Resume" : "Hold"}
            </button>
          )}

          <button
            className="bg-red-500 text-white py-1 px-2 rounded disabled:bg-gray-500"
            disabled={call.state === "destroy"}
            onClick={() => {
              console.log("Hanging up call", call.id, "on user request");
              call?.hangup();
            }}
          >
            {call.state === "ringing" ? "Decline" : "Hangup"}
          </button>

          {call.state === "ringing" && (
            <button
              className="bg-green-500 text-white py-1 px-2 rounded disabled:bg-gray-500"
              onClick={() => {
                console.log("Hanging up call", call.id, "on user request");
                call?.answer();
              }}
            >
              Answer
            </button>
          )}
        </div>
      </div>
      <Audio stream={call.remoteStream} />
    </div>
  );
}
