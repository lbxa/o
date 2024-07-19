import { Title } from "@universe/atoms";
import type { AccordionItem } from "@universe/molecules";
import { Accordion } from "@universe/molecules";
import type { JSX } from "solid-js";
import { For } from "solid-js";

import faqItems from "./faq.json";

const howItWorks = (): AccordionItem => {
  const descriptions: { heading: string; body: string }[] = [
    {
      heading: "Forge Your Community",
      body: "Create and invite members to your exclusive or public server.",
    },
    {
      heading: "Craft Your Challenge",
      body: "Design exciting challenges using our options.",
    },
    {
      heading: "Lead or Witness",
      body: "Take charge, join, or observe the action, whilst utilising insightful analytics and exploring our new features.",
    },
    {
      heading: "Stay Connected",
      body: "Engage, share updates, and spark conversations in your community.",
    },
  ];

  return {
    title: "How does oNex work?",
    body: (
      <div>
        {
          <For each={descriptions}>
            {({ heading, body }) => (
              <p class="mb-sm last:mb-0">
                <strong>{heading}</strong>: {body}
              </p>
            )}
          </For>
        }
      </div>
    ),
  };
};

const challengeInfo = (): AccordionItem => {
  const descriptions: { body: string }[] = [
    {
      body: "Create a team-based running challenge, e.g. 'The team that runs the most by the end of the week wins.'",
    },
    {
      body: "Set metrics like random teams, one-week duration, and distance-based competition.",
    },
    {
      body: "As a user you can check your team, track the leaderboard in real-time, and motivate teammates to run more.",
    },
    {
      body: "Engage with your team, communicate, and strive to win together.",
    },
  ];

  return {
    title: "What’s an example of a challenge I could offer?",
    body: (
      <div>
        {
          <For each={descriptions}>
            {({ body }) => <p class="mb-sm last:mb-0">{body}</p>}
          </For>
        }
      </div>
    ),
  };
};

export const FaQ = (): JSX.Element => {
  return (
    <div class="mb-xl">
      <Title>FaQ</Title>
      <Accordion items={[howItWorks(), challengeInfo(), ...faqItems]} />
    </div>
  );
};
