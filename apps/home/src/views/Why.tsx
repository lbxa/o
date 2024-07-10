import { Title } from "@universe/atoms";
import type { WhyCardProps } from "@universe/molecules";
import { WhyCard } from "@universe/molecules";
import { Index } from "solid-js";

import {
  AppIconsSvg,
  BoltSvg,
  ChartSvg,
  DumbbellSvg,
  GroupSvg,
  RankingsSvg,
  Svg,
} from "../icons";

export const Why = () => {
  const items: () => WhyCardProps[] = () => [
    {
      title: "Customisable challenges",
      body: "We provide the tools to tailor fitness challenges catering to your community's unique needs.",
      icon: <Svg src={DumbbellSvg} />,
      blurred: true,
    },
    {
      title: "Highly interactive",
      body: "Seamless interactions between members and staff in and outside of the gym through our social channels.",
      icon: <Svg src={AppIconsSvg} />,
    },
    {
      title: "Data data data",
      body: "Utilise our analytic tools to gain valuable insights into member preferences and behaviours, enhancing gym management and member satisfaction.",
      icon: <Svg src={ChartSvg} />,
      blurred: true,
    },
    {
      title: "Gamification",
      body: "Immersive challenges, goal milestones, dynamic progress checking and rewarding achievements.",
      icon: <Svg src={RankingsSvg} />,
    },
    {
      title: "Community",
      body: "A supportive environment where members connect and progress together!",
      icon: <Svg src={GroupSvg} />,
      blurred: true,
    },
    {
      title: "Speed",
      body: "oNex is just getting started. New features are rolling out every week.",
      icon: <Svg src={BoltSvg} class="w-md" />,
      blurred: true,
    },
  ];

  return (
    <div class="mb-xl">
      <Title>Why oNex?</Title>
      <Index each={items()}>{(item) => <WhyCard {...item()} />}</Index>
    </div>
  );
};
