import { useState } from "preact/hooks";


export default function Greeting({messages}) {

  const randomMessage = () => messages[(Math.floor(Math.random() * messages.length))];

  const [greeting, setGreeting] = useState(messages[0]);

  return (
    <section>
      <h3>{greeting}! Thank you for visiting!</h3>
      <button type="button" onClick={() => setGreeting(randomMessage())}>
        New Greeting
      </button>
    </section>
  )
}