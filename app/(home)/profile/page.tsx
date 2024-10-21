import { FileInput, FormInput, User } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col gap-8">
      <Link href="/form" className="group">
        <div className="flex gap-2 items-center text-muted-foreground group-hover:text-blue-400 transition-colors duration-200">
          <FileInput className="text-muted-foreground group-hover:text-blue-200 h-5 w-5" /> Prisma Form</div>
      </Link>
    </div>
  )
}
