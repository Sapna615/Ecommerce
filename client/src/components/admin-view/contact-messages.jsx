import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchContactMessages,
  updateContactMessageStatus,
  replyToContactMessage,
} from "@/store/admin/contact-slice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

function StatusBadge({ status }) {
  const variant =
    status === "new" ? "destructive" : status === "read" ? "default" : "secondary";
  return <Badge variant={variant}>{status}</Badge>;
}

export default function AdminContactMessagesView() {
  const dispatch = useDispatch();
  const { messages, isLoading } = useSelector((s) => s.adminContact);
  const [replyDrafts, setReplyDrafts] = useState({});

  useEffect(() => {
    dispatch(fetchContactMessages());
  }, [dispatch]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Contact Messages</h1>
        <Button variant="outline" onClick={() => dispatch(fetchContactMessages())}>
          Refresh
        </Button>
      </div>

      {isLoading ? <div>Loading…</div> : null}

      <div className="grid gap-4">
        {messages?.length ? (
          messages.map((m) => (
            <Card key={m._id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-base font-semibold">
                  {m.subject}
                </CardTitle>
                <StatusBadge status={m.status} />
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-gray-600">
                  <div>
                    <span className="font-medium">From:</span> {m.name} ({m.email})
                  </div>
                  {m.phone ? (
                    <div>
                      <span className="font-medium">Phone:</span> {m.phone}
                    </div>
                  ) : null}
                  <div>
                    <span className="font-medium">Priority:</span> {m.priority}
                  </div>
                  <div>
                    <span className="font-medium">Received:</span>{" "}
                    {new Date(m.createdAt).toLocaleString()}
                  </div>
                </div>

                <div className="rounded border bg-muted/20 p-3 whitespace-pre-wrap">
                  {m.message}
                </div>

                {Array.isArray(m.replies) && m.replies.length > 0 ? (
                  <div className="space-y-2">
                    <div className="text-sm font-semibold">Replies</div>
                    <div className="space-y-2">
                      {m.replies.map((r, idx) => (
                        <div
                          key={`${m._id}-reply-${idx}`}
                          className="rounded border bg-white p-3"
                        >
                          <div className="text-xs text-gray-500 mb-1">
                            {r.sentAt ? new Date(r.sentAt).toLocaleString() : ""}
                          </div>
                          <div className="whitespace-pre-wrap text-sm">{r.message}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                <div className="space-y-2">
                  <div className="text-sm font-semibold">Reply to user</div>
                  <Textarea
                    rows={4}
                    value={replyDrafts[m._id] || ""}
                    onChange={(e) =>
                      setReplyDrafts((prev) => ({
                        ...prev,
                        [m._id]: e.target.value,
                      }))
                    }
                    placeholder="Type your reply… (this will be emailed to the user)"
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        const replyMessage = (replyDrafts[m._id] || "").trim();
                        if (!replyMessage) return;
                        dispatch(replyToContactMessage({ id: m._id, replyMessage })).then(
                          () => {
                            setReplyDrafts((prev) => ({ ...prev, [m._id]: "" }));
                          }
                        );
                      }}
                    >
                      Send Reply
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() =>
                        setReplyDrafts((prev) => ({ ...prev, [m._id]: "" }))
                      }
                    >
                      Clear
                    </Button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() =>
                      dispatch(updateContactMessageStatus({ id: m._id, status: "read" }))
                    }
                  >
                    Mark Read
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() =>
                      dispatch(
                        updateContactMessageStatus({ id: m._id, status: "resolved" })
                      )
                    }
                  >
                    Resolve
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-gray-600">No messages yet.</div>
        )}
      </div>
    </div>
  );
}

