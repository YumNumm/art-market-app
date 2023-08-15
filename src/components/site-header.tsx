import Link from "next/link";
import { Icons } from "./icons";

export function SiteHeader() {
  return (
    <nav className="top-0 w-full">
      <div className="flex z-10 w-full justify-between font-mono text-sm">
        <div className="left-0 top-0 flex w-full border-b align-baseline border-gray-300 bg-gradient-to-b from-zinc-200 p-6 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit">
          {/* title */}
          <Link href="/">
            <div className="flex items-center  transition hover:opacity-40">
              <Icons.gitHub className="w-8 h-8 mr-2" />
              <span className="font-bold text-lg">テッケン</span>
              <span className="text-xs ml-2 text-gray-500 dark:text-gray-400">
                東京藝術大学 テクノロジー研究会
              </span>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
