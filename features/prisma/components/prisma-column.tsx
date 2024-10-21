import { cn } from "@/lib/utils";
import PrismaItem from "./prisma-item";
import Image from "next/image";

interface PrismaItem {

  id: number;
  page: number;
  level: number;
  operators: string;
  numbers: string;
  operation: string;
  answer: number;
}

type Props = {
  data?: PrismaItem[] | undefined;
  itemsPerColumn?: number | undefined;
  className?: string | undefined
}

export default function PrismaColumn({
  data = [],
  itemsPerColumn = 10,
  className
}: Props) {
  if (!data.length) {
    return <div className="text-center text-muted-foreground">
      <p>no data ~nya.</p>
      <Image src="/img/cat-scare.png" width={500} height={500} alt="prisma ilustration" />
    </div>
  }

  const renderColumn = (items: PrismaItem[], align: "end" | "start", startIndex = 0) => {
    return (
      <div className="p-2 px-6 rounded-lg flex-1 space-y-4">
        {
          items.map((item, idx) => (
            <PrismaItem key={item.id} index={idx + startIndex + 1} data={item} align={align} />
          ))
        }
      </div>
    )
  }


  const firstColumn = data.slice(0, itemsPerColumn)
  const secondColumn = data.slice(itemsPerColumn, itemsPerColumn * 2)

  return (
    <div className={cn("flex w-full", className)}>
      {renderColumn(firstColumn, "start")}
      {renderColumn(secondColumn, "end", itemsPerColumn)}
    </div>
  )
}
