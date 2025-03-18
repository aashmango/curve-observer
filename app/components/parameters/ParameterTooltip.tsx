import * as React from 'react'
import * as Tooltip from '@radix-ui/react-tooltip'

interface ParameterTooltipProps {
  label: string
  description: string
}

export function ParameterTooltip({ label, description }: ParameterTooltipProps) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <span className="cursor-help text-sm font-medium text-foreground underline decoration-dotted">
            {label}
          </span>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="max-w-xs rounded-md bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md"
            side="right"
            align="center"
          >
            {description}
            <Tooltip.Arrow className="fill-popover" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
} 