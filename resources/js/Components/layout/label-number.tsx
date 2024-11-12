import {cn} from "@/lib/utils";
import {NumericFormat} from "react-number-format";

export default function LabelNumber({value, className} : {value: number, className?: string}){

    return (
        <NumericFormat
            className={cn(
                "text-right flex h-10 w-full bg-destructive-foreground rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            displayType="text"
            value={value} thousandSeparator="," />
    )
}
