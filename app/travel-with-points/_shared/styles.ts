export const travelGradientBackground =
  "min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-slate-100";

export const travelContentShell =
  "mx-auto flex max-w-4xl flex-col px-6 py-20 lg:py-28";

export function cx(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}
