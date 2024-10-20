import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

type Props = {
  link: string
  title: string;
}

export default function BackButton({ link, title }: Props) {
  return (
    <Link href={link} className={cn(buttonVariants({ variant: "outline" }))}>
      <ArrowLeft className="mr-2 h-4 w-4" />
      {title}
    </Link>
  )
}
