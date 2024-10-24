"use client"
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Button } from "./ui/button";
import TimerForm from "./timer-form";
import { useDrawerStore } from "@/store/drawer";

export default function FormContainer() {
  const { isOpen, setIsOpen } = useDrawerStore()
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (!isDesktop) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent className="h-[80%]">
          <div className="p-8 space-y-4">
            <div>
              <DrawerTitle className="text-center">Add New Student</DrawerTitle>
              <DrawerDescription className="text-center">add student and study time.</DrawerDescription>
            </div>
            <TimerForm />
          </div>
        </DrawerContent>
      </Drawer>
    )
  }
  return <TimerForm />
}
