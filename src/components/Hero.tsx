import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <div>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
              <Image src="/professors.jpg" 
                className="rounded-3xl"
                width={800} height={800} 
                alt="professors"
              />
            </div>

            <div className="lg:py-24">
              <h2 className="text-3xl font-bold sm:text-4xl">
                Choose The Right <span className="text-primary">Tutor </span>For You!
              </h2>

              <p className="mt-4 text-gray-600">
                At Think Easy we have the best lecturers for 
                the class that you want to learn!
              </p>

              <Button asChild className="mt-10">
                <Link href="/meetings/createmeeting">
                  Reserve A Meeting!
                </Link>
                </Button>

            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
