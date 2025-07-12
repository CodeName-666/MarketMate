"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Download, FileCog } from "lucide-react";

export default function AdminPage() {
  const { toast } = useToast();

  const handleSaveSettings = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const articleLimit = formData.get("articleLimit");
    console.log("Saving new article limit:", articleLimit);
    toast({
      title: "Settings Saved",
      description: `Article limit has been updated to ${articleLimit}.`,
    });
  };

  const handleExport = () => {
    // Mock data for export
    const articles = [
      { sellerId: 101, articleId: 1, description: 'Vintage T-Shirt', price: 15.00 },
      { sellerId: 101, articleId: 2, description: 'Handmade Pottery', price: 25.50 },
      { sellerId: 102, articleId: 1, description: 'Antique Clock', price: 120.00 },
    ];
    
    const headers = "sellerId,articleId,description,price";
    const csvRows = articles.map(row => `${row.sellerId},${row.articleId},"${row.description}",${row.price}`);
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...csvRows].join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "cash_register_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Export Started",
      description: "Your data export has been downloaded.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Admin Control Panel</h1>
        <p className="text-muted-foreground">Manage application-wide settings and data.</p>
      </div>

      <Tabs defaultValue="settings">
        <TabsList>
          <TabsTrigger value="settings">
            <FileCog className="mr-2 h-4 w-4" />
            Settings
          </TabsTrigger>
          <TabsTrigger value="export">
            <Download className="mr-2 h-4 w-4" />
            Data Export
          </TabsTrigger>
        </TabsList>
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Article Limit Configuration</CardTitle>
              <CardDescription>
                Set the maximum number of articles a seller can list for sale at the flea market.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveSettings} className="flex flex-col sm:flex-row items-end gap-4">
                <div className="w-full sm:w-auto flex-grow space-y-2">
                  <Label htmlFor="articleLimit">Article Limit</Label>
                  <Input id="articleLimit" name="articleLimit" type="number" defaultValue="50" min="1" />
                </div>
                <Button type="submit">Save Changes</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="export">
          <Card>
            <CardHeader>
              <CardTitle>Cash Register Data Export</CardTitle>
              <CardDescription>
                Generate and download a CSV file containing all seller and article data for the cash register system.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-start gap-4">
                <p>Click the button below to download the complete dataset.</p>
                <Button onClick={handleExport}>
                    <Download className="mr-2 h-4 w-4" />
                    Export Seller Data (CSV)
                </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
