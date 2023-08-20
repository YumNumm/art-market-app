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
import { Loader2 } from "lucide-react";
import Image from "next/image";
import useSWR from "swr";

export const runtime = "edge";

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
      <div className="grid grid-cols-[repeat(auto-fit, max(auto))] gap-2 ">
        {data?.result.objects.map((obj) => {
          let title = "";
          let description = "";
          /*
            AA_L_1.png（かわいくピース AAver）
            AA_L_2.png（うさみみポーズ AAver）
            AA_L_3.png（おまかせポーズ AAver）
            comp_L_1.png（かわいくピース クロマキーver）
            comp_L_2.png（うさみみポーズ クロマキーver）
            comp_L_3.png（おまかせ クロマキーver）
            ※comp_L_1~3はアルファチャンネル付きです
          */
          const filename = obj.key.split("/")[1];

          if (filename.endsWith("_1.png")) {
            title = "かわいくピース";
          } else if (filename.endsWith("_2.png")) {
            title = "うさみみポーズ";
          } else if (filename.endsWith("_3.png")) {
            title = "おまかせポーズ";
          }
          if (filename.startsWith("AA")) {
            description = "アスキーアートver";
          } else if (filename.startsWith("comp")) {
            description = "クロマキーver";
          }
          return (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
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
