"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Download, FileCog, Store, PlusCircle, Edit, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

const initialMarkets = [
    { id: 1, name: 'Summer Flea Market', date: '2024-08-15', status: 'Active' },
    { id: 2, name: 'Winter Wonderland Market', date: '2024-12-05', status: 'Planning' },
];

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

      <Tabs defaultValue="markets">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="markets"><Store className="mr-2 h-4 w-4" />Market Management</TabsTrigger>
          <TabsTrigger value="settings">
            <FileCog className="mr-2 h-4 w-4" />
            Global Settings
          </TabsTrigger>
          <TabsTrigger value="export">
            <Download className="mr-2 h-4 w-4" />
            Data Export
          </TabsTrigger>
        </TabsList>
        <TabsContent value="markets">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Market Management</CardTitle>
                    <CardDescription>
                        Create, configure, and manage all your markets from one place.
                    </CardDescription>
                </div>
                 <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <PlusCircle className="mr-2 h-4 w-4" /> Create Market
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create a New Market</DialogTitle>
                        <DialogDescription>
                          Enter the details for the new market event.
                        </DialogDescription>
                      </DialogHeader>
                      <form id="create-market-form" className="space-y-4">
                        <div>
                          <Label htmlFor="marketName">Market Name</Label>
                          <Input id="marketName" name="marketName" placeholder="e.g., Spring Community Fair" required />
                        </div>
                        <div>
                          <Label htmlFor="marketDate">Market Date</Label>
                          <Input id="marketDate" name="marketDate" type="date" required />
                        </div>
                      </form>
                       <DialogFooter>
                        <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                        <Button type="submit" form="create-market-form">Create Market</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Market Name</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {initialMarkets.map((market) => (
                            <TableRow key={market.id}>
                                <TableCell className="font-medium">{market.name}</TableCell>
                                <TableCell>{market.date}</TableCell>
                                <TableCell>{market.status}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
          </Card>
        </TabsContent>
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
