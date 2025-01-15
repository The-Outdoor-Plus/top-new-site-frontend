// 'use client';

// import * as React from 'react';
// import * as RechartsPrimitive from 'recharts';

// import { cn } from '@/lib/utils';

// // Format: { THEME_NAME: CSS_SELECTOR }
// const THEMES = { light: '', dark: '.dark' } as const;

// export type ChartConfig = {
//   [k in string]: {
//     label?: React.ReactNode;
//     icon?: React.ComponentType;
//   } & (
//     | { color?: string; theme?: never }
//     | { color?: never; theme: Record<keyof typeof THEMES, string> }
//   );
// };

// type ChartContextProps = {
//   config: ChartConfig;
// };

// const ChartContext = React.createContext<ChartContextProps | null>(null);

// function useChart() {
//   const context = React.useContext(ChartContext);

//   if (!context) {
//     throw new Error('useChart must be used within a <ChartContainer />');
//   }

//   return context;
// }

// const ChartContainer = React.forwardRef<
//   HTMLDivElement,
//   React.ComponentProps<'div'> & {
//     config: ChartConfig;
//     children: React.ComponentProps<
//       typeof RechartsPrimitive.ResponsiveContainer
//     >['children'];
//   }
// >(({ id, className, children, config, ...props }, ref) => {
//   const uniqueId = React.useId();
//   const chartId = `chart-${id || uniqueId.replace(/:/g, '')}`;

//   return (
//     <ChartContext.Provider value={{ config }}>
//       <div
//         data-chart={chartId}
//         ref={ref}
//         className={cn(
//           "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.rechart...(line too long; chars omitted)
//           className
//         )}
//       >
//         {children}
//       </div>
//     </ChartContext.Provider>
//   );
// });
// ChartLegendContent.displayName = 'ChartLegend';

// // Helper to extract item config from a payload.
// function getPayloadConfigFromPayload(
//   config: ChartConfig,
//   payload: unknown,
//   key: string
// ) {
//   if (typeof payload !== 'object' || payload === null) {
//     return undefined;
//   }

//   const payloadPayload =
//     'payload' in payload &&
//     typeof payload.payload === 'object' &&
//     payload.payload !== null
//       ? payload.payload
//       : undefined;

//   let configLabelKey: string = key;

//   if (
//     key in payload &&
//     typeof payload[key as keyof typeof payload] === 'string'
//   ) {
//     configLabelKey = payload[key as keyof typeof payload] as string;
//   } else if (
//     payloadPayload &&
//     key in payloadPayload &&
//     typeof payloadPayload[key as keyof typeof payloadPayload] === 'string'
//   ) {
//     configLabelKey = payloadPayload[
//       key as keyof typeof payloadPayload
//     ] as string;
//   }

//   return configLabelKey in config
//     ? config[configLabelKey]
//     : config[key as keyof typeof config];
// }

// export {
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
//   ChartLegend,
//   ChartLegendContent,
//   ChartStyle,
// };
