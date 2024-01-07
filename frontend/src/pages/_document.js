import { Html, Head, Main, NextScript } from "next/document";
import fs from "fs";
import path from "path";

export default function Document() {
  const manifestPath = path.join(process.cwd(), ".next", "build-manifest.json");
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
  const preloadChunks = manifest.pages["/"];
  return (
    <Html lang="en">
      <Head>
        {preloadChunks.map((chunk) => (
          <link
            key={chunk}
            rel="preload"
            href={`/_next/${chunk}`}
            as="script"
          />
        ))}
        <link rel="manifest" href="/manifest.json" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/apple-touch-icon.webp"
        />
        <link rel="icon" href="/assets/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
