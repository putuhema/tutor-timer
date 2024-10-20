import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return <div className="grid grid-cols-3">

    <Link href="/programs/prisma">
      <div className="rounded-lg scroll-py-2 border border-blue-500  shadow-[0_5px_0_0] hover:shadow-[0_2px_0_0] transform  hover:translate-y-2 transition-all duration-200 shadow-blue-500">
        <Image className="w-full rounded-t-lg" src="/img/prisma.png" width={100} height={100} alt="prisma ilustration" />
        <div className="p-2">
          <p className="font-bold">Prisma</p>
          <p className="text-sm text-muted-foreground">Kalkulator Tangan</p>
        </div>
      </div>
    </Link>
  </div>
}