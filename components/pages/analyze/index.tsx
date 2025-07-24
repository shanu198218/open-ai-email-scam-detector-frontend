import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle } from "lucide-react";

export default function Analyze() {
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
              placeholder="Paste the full email content or subject here..."
              rows={40}
              className="resize-none h-56 mt-2"
            />
            <div className="md:flex md:justify-between md:items-center grid mt-2">
              <p className="text-sm text-muted-foreground">
                character (minimum 20 required)
              </p>
              <div className="flex gap-4 md:mt-auto mt-2">
                <Button variant="outline" size="sm">
                  <i className="ri-file-text-line text-black text-2xl"></i> Load
                  Example{" "}
                </Button>

                <Button variant="outline" size="sm">
                  <i className="ri-delete-bin-line text-2xl text-red-600"></i>
                  <span className="text-red-600">Clear</span>
                </Button>
              </div>
            </div>
          </div>

          <Button className="w-full bg-blue-500 hover:bg-blue-200">
            Check mail
          </Button>
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
