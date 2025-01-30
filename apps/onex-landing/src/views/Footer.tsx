const By = () => {
  return (
    <span>
      By&nbsp;
      <a href="https://maybelucas.com" target="_blank" class="mb-sm underline">
        Lucas
      </a>
      &nbsp;and&nbsp;
      <a href="mailto:jamie@onex.social" class="underline">
        Jamie
      </a>
    </span>
  );
};

export const Footer = () => {
  const date = new Date();
  return (
    <div class="mt-[33vh] flex">
      <div class="pb-md md:mr-md gap-sm mx-auto flex flex-row font-mono md:ml-auto">
        <By />
        <span>|</span>
        <span>oNex {date.getFullYear()}</span>
      </div>
    </div>
  );
};
