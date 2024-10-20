import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function Page() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-5 lg:gap-2">
      {
        [...Array(10)].map((_, index) => (
          <Link className={cn("text-xl", buttonVariants({ variant: "outline", className: "py-6" }))} href={`/programs/prisma/${index + 1}`} key={index}>
            Prisma Level <div className="p-2 rounded-lg border px-4 font-bold ml-2">{index + 1}</div>
          </Link>
        ))
      }
    </div>
  )
}
