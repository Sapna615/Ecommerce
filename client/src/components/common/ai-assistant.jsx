import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { api } from "@/api";
import { MessageCircle, X } from "lucide-react";

const STORAGE_KEY = "ai_assistant_messages_v1";

function safeParse(json, fallback) {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [isSending, setIsSending] = useState(false);

  const [messages, setMessages] = useState(() =>
    safeParse(localStorage.getItem(STORAGE_KEY) || "[]", [])
  );

  const bottomRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (!open) return;
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [open, messages.length]);

  const canSend = useMemo(() => text.trim().length > 0 && !isSending, [text, isSending]);

  async function send() {
    const content = text.trim();
    if (!content) return;

    setText("");
    setIsSending(true);
    setMessages((prev) => [...prev, { role: "user", content, ts: Date.now() }]);

    try {
      const res = await api.post("/ai/chat", { message: content });
      const reply = res?.data?.reply || "Sorry, I couldn’t answer that.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply, ts: Date.now() }]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry—AI assistant is unavailable right now. Please try again.",
          ts: Date.now(),
        },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open ? (
        <Card className="w-[360px] shadow-xl border">
          <CardHeader className="py-3 px-4 flex flex-row items-center justify-between">
            <CardTitle className="text-base">AI Assistant</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)} type="button">
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="h-[320px] overflow-y-auto rounded border bg-white p-3 space-y-3">
              {messages.length === 0 ? (
                <div className="text-sm text-gray-600">
                  Ask about products, sizes, colors, price, stock, cart, wishlist, or orders.
                </div>
              ) : null}

              {messages.map((m, idx) => (
                <div
                  key={`${m.ts}-${idx}`}
                  className={`text-sm whitespace-pre-wrap ${
                    m.role === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <span
                    className={`inline-block max-w-[90%] rounded-lg px-3 py-2 ${
                      m.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {m.content}
                  </span>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            <div className="mt-3 flex gap-2">
              <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Ask about a product…"
                onKeyDown={(e) => {
                  if (e.key === "Enter") send();
                }}
              />
              <Button onClick={send} disabled={!canSend} type="button">
                Send
              </Button>
            </div>

            <div className="mt-2 flex justify-between">
              <Button
                variant="ghost"
                size="sm"
                type="button"
                onClick={() => setMessages([])}
              >
                Clear
              </Button>
              <div className="text-xs text-gray-500 self-center">
                Product-aware assistant
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Button
          className="rounded-full shadow-lg h-12 w-12 p-0"
          onClick={() => setOpen(true)}
          type="button"
        >
          <MessageCircle className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
}

