import React from 'react'
import { Switch } from "@/components/ui/switch";
export interface SwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
}
function OrderStatusSwitcherComponent({checked, onChange}:SwitchProps) {

  return (
    <Switch
    checked={checked}
    onCheckedChange={() => onChange(checked)}
  />
  )
}

export const  OrderStatusSwitcher = React.memo(OrderStatusSwitcherComponent) as typeof OrderStatusSwitcherComponent