import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function Page() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5 lg:gap-2">
        {
          [1, 2, 21, 3, 4, 5, 6, 7, 8, 9, 10].map((level, index) => (
            <Link
              className={cn("text-xl",
                buttonVariants({
                  variant: "default",
                }),
                "py-6",
              )}
              href={`/programs/prisma/${level}`} key={`prisma-level-${level}`}>
              Prisma Level
              <div className="p-2 text-2xl rounded-lg font-bold">{level <= 10 ? level : '2+'}</div>
            </Link>
          ))
        }
      </div>
    </div>
  )
}
