import { getTheme } from "@/lib/theme";
import Image from "next/image";
import Link from "next/link";

export default async function Footer() {
  const theme = await getTheme();
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="flex flex-col items-center justify-center gap-y-4">
      <div className="flex justify-center gap-x-4">
        <Link href={"https://github.com/raafy"}>
          {theme === "dark" ? (
            <Image
              src={"/icons/github-mark-white.svg"}
              alt="Github"
              width={24}
              height={24}
            />
          ) : (
            <Image
              src={"/icons/github-mark.svg"}
              alt="Github"
              width={24}
              height={24}
            />
          )}
        </Link>
        <Link href={"https://www.linkedin.com/in/raafyshiham"}>
          {theme === "dark" ? (
            <Image
              src={"/icons/linkedin.svg"}
              alt="LinkedIn"
              width={24}
              height={24}
            />
          ) : (
            <Image
              src={"/icons/LinkedIn_logo.svg"}
              alt="LinkedIn"
              width={24}
              height={24}
            />
          )}
        </Link>
      </div>
      <p className="text-xs opacity-40">
        &copy; {year} Raafy Shiham. All rights Reserved.
      </p>
    </footer>
  );
}
