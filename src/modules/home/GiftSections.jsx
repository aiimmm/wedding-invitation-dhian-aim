"use client";

import { WEDDING_DATA } from "@/commons/constants/wedding-data";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button variant="default" size="xs" onClick={handleCopy}>
      {copied ? (
        <CheckIcon className="mr-1 size-3" />
      ) : (
        <CopyIcon className="mr-1 size-3" />
      )}
      {copied ? "Copied!" : "Copy"}
    </Button>
  );
}

export default function GiftSections() {
  return (
    <section
      id="gift"
      className="bg-secondary/50 relative px-6 py-20 flex items-center justify-center overflow-hidden"
    >
      <div className="relative w-full flex flex-col items-center justify-center text-center">
        <BlurFade delay={0.1} inView direction="up">
          <p className="text-muted-foreground text-base md:text-lg tracking-widest uppercase">
            Wedding
          </p>
        </BlurFade>
        <BlurFade delay={0.2} inView direction="up">
          <h2 className="text-5xl md:text-6xl font-semibold font-caligraphy mb-6">
            Gift
          </h2>
        </BlurFade>
        <BlurFade delay={0.3} inView direction="up">
          <p className="max-w-xl text-base md:text-lg text-muted-foreground">
            Dengan hormat, bagi Anda yang ingin memberikan tanda kasih kepada
            kami, dapat melalui:
          </p>
        </BlurFade>
        {WEDDING_DATA.weddingGifts.some((item) => item.type === "bank") && (
          <div className="max-w-4xl w-full flex flex-col sm:flex-row gap-4 mt-6 mb-4">
            {WEDDING_DATA.weddingGifts
              .filter((item) => item.type === "bank")
              .map((item, index) => (
                <BlurFade
                  key={index}
                  delay={0.4 + index * 0.1}
                  inView
                  direction="up"
                  className="w-full"
                >
                  <Card className="w-full">
                    <CardContent className="text-left">
                      <h3 className="text-lg md:text-xl font-bold mb-4">
                        {item.bankName}
                      </h3>
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <p className="text-sm font-mono tracking-wide text-muted-foreground">
                            {item.accountNumber}
                          </p>
                          <p className="text-sm sm:text-base text-muted-foreground">
                            {item.accountHolder}
                          </p>
                        </div>
                        <CopyButton text={item.accountNumber} />
                      </div>
                    </CardContent>
                  </Card>
                </BlurFade>
              ))}
          </div>
        )}

        {WEDDING_DATA.weddingGifts.some((item) => item.type === "physical") && (
          <div className="max-w-xl w-full">
            {WEDDING_DATA.weddingGifts
              .filter((item) => item.type === "physical")
              .map((item, index) => (
                <BlurFade
                  key={index}
                  delay={0.6 + index * 0.1}
                  inView
                  direction="up"
                  className="w-full"
                >
                  <Card className="w-full">
                    <CardContent>
                      <h3 className="text-lg md:text-xl font-bold mb-4">
                        {item.label}
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground mb-4">
                        {item.address}
                      </p>
                      <CopyButton text={item.address} />
                    </CardContent>
                  </Card>
                </BlurFade>
              ))}
          </div>
        )}
      </div>
    </section>
  );
}
