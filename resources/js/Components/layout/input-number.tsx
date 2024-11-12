import {NumericFormat} from "react-number-format";
import { cn } from "@/lib/utils"

export default function InputNumber({value, className, onChangeValue}: {value: number, className?: string, onChangeValue: (val: number) => void}){

    return (
        <NumericFormat
            className={cn(
                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            value={value} thousandSeparator=","
            onValueChange={(v) => onChangeValue(v.floatValue ?? 0)} />
    )
}
