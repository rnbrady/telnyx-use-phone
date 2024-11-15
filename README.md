# usePhone: a React Hook for Telnyx

The `usePhone` React hook provides management of inbound and outbound telephone calls via Telnyx. Inspired by [`useSWR`](https://swr.vercel.app/), it manages state and re-rendering so you don't have to. The hook is shared here with a Next.js demo app, but can be copied and pasted into your own React project.

<img width="1486" alt="usePhone" src="https://github.com/user-attachments/assets/9ec99ba0-6cbf-41d6-868b-c1612c078470">


## Usage 

Calling the hook is simple:

```typescript
  const { calls, createCall } = usePhone(credentials);
```

The returned property `calls` is an array of calls which can be hooked up directly to the UI. Re-renders will be triggered when a new inbound or outbound call is created or when the status of an existing call changes. See the codebase for usage.

## Installation

1. You'll need a Telnyx account and API key.

2. In the portal, purchase a phone number.

3. Also in the portal, create a SIP connection linked to an outbound voice profile and associate the above number with it.

4. Put these details in a `.env` file in the root of the project folder. It should look like this:

```
TELNYX_API_KEY="KEY01234567890123456789012345678901234567890"
NEXT_PUBLIC_TELNYX_LOGIN="sip_connection_username"
NEXT_PUBLIC_TELNYX_PASSWORD="sip_connection_password"
NEXT_PUBLIC_TELNYX_INBOUND_NUMBER="+13412250009"
```

