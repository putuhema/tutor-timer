import { useGetPrisma } from "@/features/prisma/api/use-get-prisma";
import { Loader2 } from "lucide-react";
import { formatNumber } from "@/lib/utils";

type Props = {

  page: number
  level: number
  selectedPage: number;
  selectPage: (page: number) => void
}

export const PrismaContent = ({ page, level, selectPage, selectedPage }: Props) => {
  const { data, isLoading } = useGetPrisma(level, page, selectedPage === page)

  if (isLoading) {
    return <div className="flex justify-center w-full">
      <Loader2 className="animated-spin text-muted-foreground w-4 h-4" />
    </div>
  }

  if (!data) {
    return <div className="text-center text-muted-foreground">no data</div>
  }

  return (
    <div className="flex w-full">
      <div className="w-full flex flex-col gap-4 items-start bg-accent rounded-l-lg p-2">
        {
          data.slice(0, 10).map((d, index) =>
            <PrismaItem key={index} index={index + 1} operation={d.operation} result={d.answer} />)
        }
      </div>
      <div className="w-full flex flex-col gap-4 items-start p-2">
        {
          data.slice(10, 20).map((d, index) =>
            <PrismaItem key={index} index={index + 1} operation={d.operation} result={d.answer} />)
        }
      </div>
    </div>
  )
}


type ItemProps = {
  index: number;
  operation: string;
  result: number;
}

function PrismaItem({ index, operation, result }: ItemProps) {
  return (
    <div className="flex items-center text-md gap-2 w-full" >
      <p className="min-w-8">{index}.</p>
      <p>{operation}</p>
      <p>=</p>
      <p className="font-bold text-lg">{formatNumber(result)}</p>
    </div>

  )

}