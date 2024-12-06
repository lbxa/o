const pills = {
  pill1: fields.type ?? undefined,
  pill2: fields.goal ?? undefined,
  pill3: fields.target
    ? [fields.target, fields.unit !== "None" ? fields.unit : ""]
        .filter(Boolean)
        .join(" ")
    : undefined
}; 