import { Title } from "@universe/atoms";
import { Accordion } from "@universe/molecules";
import type { JSX } from "solid-js";

import faqItems from "./faq.json";

export const FaQ = (): JSX.Element => {
  return (
    <div>
      <Title>FaQ</Title>
      <Accordion items={faqItems} />
    </div>
  );
};
