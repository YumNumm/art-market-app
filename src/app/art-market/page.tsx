"use client";
import { BackgroundNoise } from "@/components/backgroundNoise";
import { SiteHeader } from "@/components/site-header";
import { AnimatePresence, motion } from "framer-motion";
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
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

const isValidId = (id: string) => {
  if (id == "tekken_art_market_masterkey") {
    return true;
  }
  return isValidUUIDv4(id);
};

class ApiError extends Error {
  info: any;
  status: number;

  constructor(message: string, info: any, status: number) {
    super(message);
    this.info = info;
    this.status = status;
  }
}

const notFound = (
  <>
    <div className="flex h-screen items-center justify-center">
      <h1 className="text-4xl font-bold font-mono">404 Page Not Found</h1>
    </div>
  </>
);

const fetcher = async (url: string) => {
  const res = await fetch(url);

  // もしステータスコードが 200-299 の範囲内では無い場合、
  // レスポンスをパースして投げようとします。
  if (!res.ok) {
    const error = new ApiError(
      "An error occurred while fetching the data.",
      await res.json(),
      res.status
    );
    throw error;
  }

  return res.json();
};

export default function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  if (id == null || !isValidId(id)) {
    return (
      <>
        <div className="z-50">
          <SiteHeader />
        </div>
        {notFound}
      </>
    );
  } else {
    return (
      <>
        <div className="opacity-90">
          <BackgroundNoise />
        </div>
        <div className="z-50">
          <SiteHeader />
        </div>
        <Body id={id} />
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
  if (error) {
    return (
      <>
        <div className="flex h-screen items-center justify-center flex-col">
          <h1 className="text-4xl font-bold">
            データ取得中に例外が発生しました
          </h1>
          <p className="text-2xl font-bold font-mono">{error.message}</p>
          <p className="text-xl font-mono opacity-70">
            {JSON.stringify(error.info)}
          </p>
          <p className="text-xl font-mono opacity-70">Status: {error.status}</p>
        </div>
      </>
    );
  }
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin"></Loader2>
      </div>
    );
  }
  if (data?.result.objects.length === 0) {
    return notFound;
  }
  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,auto))] gap-2 p-4">
        {data?.result.objects.map((obj, index) => {
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
              <Card className="z-10 shadow-2xl">
                <CardHeader className="p-4">
                  <CardTitle>{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent className="p-3">
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
