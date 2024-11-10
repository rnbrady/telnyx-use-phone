import { useState } from "react";

const speedDials = [
  {
    name: "Telnyx",
    number: "+13129457420",
  },
];

export function DialPad({
  createCall,
}: {
  createCall: (number: string) => void;
}) {
  const [numberToDial, setNumberToDial] = useState("");

  return (
    <>
      <div className="flex items-center bg-gray-200 rounded p-2 w-full shadow">
        <input
          name="number"
          className="border border-gray-300 rounded p-1"
          placeholder="Enter a number"
          type="tel"
          value={numberToDial}
          onChange={(e) => setNumberToDial(e.target.value)}
        ></input>
        <button
          onClick={() => createCall(numberToDial)}
          className="bg-green-500 text-white rounded p-1 ml-2 px-4 shadow focus:ring-2 focus:ring-white outline-offset-2 outline-green-500"
        >
          Dial
        </button>
      </div>

      {speedDials.map((speedDial) => (
        <button
          key={speedDial.number}
          className="bg-green-500 text-white p-2 rounded w-full shadow-md focus:ring-2 focus:ring-white outline-offset-2 outline-green-500"
          onClick={() => createCall(speedDial.number)}
        >
          {speedDial.name} {speedDial.number}
        </button>
      ))}
    </>
  );
}
