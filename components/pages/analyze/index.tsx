"use client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { exampleScamEmail } from "@/lib/data";
import { analyzeScamEmail } from "@/services/analyze";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";

export default function Analyze() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const CHARACTER_LIMIT = 200;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= CHARACTER_LIMIT) {
      setText(e.target.value);
    } else {
      toast({
        title: "Limit reached",
        description: `You can only enter up to the ${CHARACTER_LIMIT} characters`,
        variant: "success",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(false);

    try {
      const output = await analyzeScamEmail(text);
      setResult(output);

      toast({
        title: "successfully scan",
        variant: "success",
      });
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const resetButton = () => {
    setText("");
  };
  return (
    <div className="min-h-screen  items-center justify-center bg-white px-10 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center  mb-8">
          <h1 className="font-bold md:text-4xl text-3xl">
            Scam Email Detector
          </h1>
          <p className="text-gray-500 mt-2 text-base">
            AI power analysis to help identify potentially fraudulent emails
          </p>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl">Email Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb 2">
              Paste suspicious email text below:
            </label>
            <Textarea
              id="email-input"
              value={text}
              onChange={handleChange}
              placeholder="Paste the full email content or subject here..."
              rows={40}
              className="resize-none h-56 mt-2"
            />
            <div className="md:flex md:justify-between md:items-center grid mt-2">
              <p className="text-sm text-muted-foreground">
                {text.length} / {CHARACTER_LIMIT} character (minimum 200
                required)
              </p>
              <div className="flex gap-4 md:mt-auto mt-2">
                <Button
                  onClick={() => setText(exampleScamEmail)}
                  variant="outline"
                  size="sm"
                >
                  <i className="ri-file-text-line text-black text-2xl"></i> Load
                  Example{" "}
                </Button>

                <Button onClick={resetButton} variant="outline" size="sm">
                  <i className="ri-delete-bin-line text-2xl text-red-600"></i>
                  <span className="text-red-600">Clear</span>
                </Button>
              </div>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full bg-blue-500 hover:bg-blue-200"
          >
            {loading ? "Scanning..." : "Scan Email"}
          </Button>
          {result && (
            <Card className="mt-4 border p-4 rounded">
              <h2
                className={`font-bold ${
                  result.risk === "Safe" ? "text-blue-600" : "text-red-600"
                }`}
              >
                Risk: {result.risk}
              </h2>
              <p>
                <strong>Reason:</strong> {result.reason}
              </p>
              <p>
                <strong>Action:</strong> {result.action}
              </p>
            </Card>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-sm text-muted-foreground italic">
              <strong>Disclaimer</strong> This tool uses AI to estimate risk
              based on email text only. It is NOT a guaranteed scam detector.
              Always verify supicious emails
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
