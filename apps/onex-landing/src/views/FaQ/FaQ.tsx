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
                <span class="underline">{heading}</span>: {body}
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
    title: "What kind of challenges can I create?",
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

const howAreWeDifferent = (): AccordionItem => {
  const descriptions: { body: string }[] = [
    {
      body: "The fitness app market is flooded with options, most of which focus on tracking metrics like distance or providing rigid workout plans. While these are helpful for beginners or athletes, they don't address the real reasons people quit: lack of long-term engagement and community.",
    },
    {
      body: "oNex takes a different approach by making fitness fun, social, and connected. We use challenges, gamification, and community features to turn exercise into an exciting experience. You can join diverse communities, make new friends, plan events, enter friendly competitions, and celebrate progress together.",
    },
    {
      body: "oNex is about finding your community, wherever you are. It's a place to connect with others, be part of something bigger, and share your journey. With oNex, fitness is no longer isolating, it's about building friendships, accountability, and living a lifestyle you’ll love.",
    },
  ];

  return {
    title: "How are we different to the other 1000 fitness apps?",
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
    <Accordion
      items={[howItWorks(), challengeInfo(), ...faqItems, howAreWeDifferent()]}
    />
  );
};
