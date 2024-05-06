import { createClient } from "@/utils/supabase/server"
import React from "react"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel"

export default async function PostedResources({ id }: { id: string }) {
  const supabase = createClient()

  const { data, error } = await supabase.from("upload").select("*").eq("userid", id)
  return (
    <div>
      <h1 className=" text-center text-xl mb-2">Media Resources Posted</h1>
      {/* {data?.map((item, index) => <ResourceCard key={index} item={item} />)} */}
      <Carousel className="max-w-4xl">
        <CarouselContent className="ml-3">
          {data?.map((item, index) => <ResourceCard key={index} item={item} />)}
        </CarouselContent>
        <CarouselPrevious className="ml-7" />
        <CarouselNext className="mr-7" />
      </Carousel>
    </div>
  )
}

interface item {
  id: number
  userid: string
  url: string
  name: string
  type: string
}

export function ResourceCard({ item }: { item: item }) {
  if (item.type == "video/mp4") {
    return (
      <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
        <div className="p-1">
          <Card className="w-[250px] h-[250px]">
            <CardContent className="flex aspect-square items-center justify-center p-1">
              <iframe src={item.url} width={240} height={240} allowFullScreen />
            </CardContent>
          </Card>
        </div>
      </CarouselItem>
    )
  }
  return (
    <div>
      <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
        <div className="p-1">
          <Card className="w-[250px] h-[250px]">
            <CardContent className="flex aspect-square items-center justify-center p-1">
              <div
                className="w-full h-full bg-cover bg-no-repeat bg-center"
                style={{ backgroundImage: `url(${item.url})` }}
              ></div>
            </CardContent>
          </Card>
        </div>
      </CarouselItem>
    </div>
  )
}

export async function PostedResourcesMobile({ id }: { id: string }) {
  const supabase = createClient()

  const { data } = await supabase.from("upload").select("*").eq("userid", id)

  return (
    <div>
      <h1 className=" text-center text-xl mb-2">Media Resources Posted</h1>
      {/* {data?.map((item, index) => <ResourceCard key={index} item={item} />)} */}
      <Carousel className="w-full max-w-md">
        <CarouselContent className="ml-24">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card className="w-[180px] h-[180px]">
                  <CardContent className="flex aspect-square items-center justify-center p-1">
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-12" />
        <CarouselNext className="mr-12" />
      </Carousel>
    </div>
  )
}
