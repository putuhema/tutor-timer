import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function Page() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5 lg:gap-2">
        {
          [...Array(10)].map((color, index) => (
            <Link
              className={cn("text-xl",
                buttonVariants({
                  variant: "default",
                }),
                "py-6",
              )}
              href={`/programs/prisma/${index + 1}`} key={index}>
              Prisma Level
              <div className="p-2 text-2xl rounded-lg font-bold">{index + 1}</div>
            </Link>
          ))
        }
      </div>
    </div>
  )
}
