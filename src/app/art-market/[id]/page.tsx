"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { isValidUUIDv4 } from "@/util/is-valid-uuid";
import { R2Objects } from "@cloudflare/workers-types";
import { log } from "console";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import useSWR from "swr";
const isValidId = (id: string) => {
  return isValidUUIDv4(id);
};
const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  if (!isValidId(id)) {
    return (
      <>
        <div className="flex h-screen items-center justify-center">
          <h1 className="text-4xl font-bold">404 Not Found</h1>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Body id={id}></Body>
      </>
    );
  }
}

function Body({ id }: { id: string }) {
  // from env
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const { data, error, isLoading } = useSWR<{
    result: R2Objects;
  }>(baseUrl + "/list/" + id, fetcher);
  if (error) return <div>failed to load {JSON.stringify(error)}</div>;
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin"></Loader2>
      </div>
    );
  }
  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(400px,auto))] gap-2 ">
        {data?.result.objects.map((obj) => {
          return (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Card Title</CardTitle>
                  <CardDescription>Card Desc</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    src={
                      process.env.NEXT_PUBLIC_OBJECT_STORAGE_URL + "/" + obj.key
                    }
                    alt={obj.key}
                    height={1000}
                    width={1000}
                    priority={true}
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                    }}
                    className="rounded-sm backdrop-blur-md"
                  />
                </CardContent>
                <CardFooter></CardFooter>
              </Card>
            </>
          );
        })}
      </div>
    </>
  );
}
