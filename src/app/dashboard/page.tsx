"use client";

import * as React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { BarChart, ListOrdered, History, PlusCircle, Printer, Edit, Trash2 } from 'lucide-react';

interface Article {
  id: number;
  description: string;
  price: number;
}

const initialArticles: Article[] = [
  { id: 1, description: "Vintage Denim Jacket", price: 45.00 },
  { id: 2, description: "Hand-painted Ceramic Mug", price: 18.50 },
  { id: 3, description: "Leather Bound Journal", price: 22.00 },
];

const SELLER_NUMBER = 123;
const ARTICLE_LIMIT = 50;

export default function DashboardPage() {
  const [articles, setArticles] = React.useState<Article[]>(initialArticles);
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleAddArticle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (articles.length >= ARTICLE_LIMIT) {
        toast({
            variant: "destructive",
            title: "Article Limit Reached",
            description: "You cannot add more articles.",
        });
        return;
    }
    const formData = new FormData(e.currentTarget);
    const newArticle: Article = {
      id: Math.max(0, ...articles.map(a => a.id)) + 1,
      description: formData.get('description') as string,
      price: parseFloat(formData.get('price') as string),
    };
    setArticles([...articles, newArticle]);
    toast({
      title: "Article Added",
      description: `"${newArticle.description}" has been added to your list.`,
    });
    setDialogOpen(false);
  };

  const handleDeleteArticle = (articleId: number) => {
    setArticles(articles.filter(a => a.id !== articleId));
    toast({
      title: "Article Removed",
      description: "The selected article has been removed.",
    });
  }

  const handlePrint = () => {
    try {
      const dataToStore = { articles, sellerNumber: SELLER_NUMBER };
      localStorage.setItem('marketmate_print_data', JSON.stringify(dataToStore));
      router.push('/print');
    } catch (error) {
      console.error("Failed to save to localStorage", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not prepare data for printing.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Seller Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, here's your sales overview.</p>
      </div>
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3">
          <TabsTrigger value="overview"><BarChart className="mr-2 h-4 w-4" />Overview</TabsTrigger>
          <TabsTrigger value="articles"><ListOrdered className="mr-2 h-4 w-4" />My Articles</TabsTrigger>
          <TabsTrigger value="history"><History className="mr-2 h-4 w-4" />Purchase History</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Your Seller Number</CardTitle>
                <CardDescription>This number identifies you at the market.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-primary">#{SELLER_NUMBER}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Article Limit</CardTitle>
                <CardDescription>You can list up to {ARTICLE_LIMIT} items.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-2xl font-bold">{articles.length} / {ARTICLE_LIMIT} items listed</p>
                <Progress value={(articles.length / ARTICLE_LIMIT) * 100} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="articles">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Your Article List</CardTitle>
                <CardDescription>Manage the items you are selling.</CardDescription>
              </div>
              <div className="flex gap-2">
                  <Button onClick={handlePrint} variant="outline">
                      <Printer className="mr-2 h-4 w-4" /> Generate PDF
                  </Button>
                  <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Article
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add a New Article</DialogTitle>
                        <DialogDescription>
                          Enter the details for your new item.
                        </DialogDescription>
                      </DialogHeader>
                      <form id="add-article-form" onSubmit={handleAddArticle} className="space-y-4">
                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Input id="description" name="description" required />
                        </div>
                        <div>
                          <Label htmlFor="price">Price (€)</Label>
                          <Input id="price" name="price" type="number" step="0.01" required />
                        </div>
                      </form>
                       <DialogFooter>
                        <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                        <Button type="submit" form="add-article-form">Add Article</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {articles.length > 0 ? articles.map((article) => (
                    <TableRow key={article.id}>
                      <TableCell className="font-medium">{article.id}</TableCell>
                      <TableCell>{article.description}</TableCell>
                      <TableCell className="text-right">€{article.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                        </Button>
                        <Button onClick={() => handleDeleteArticle(article.id)} variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  )) : (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center h-24">No articles added yet.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history">
            <Card>
                <CardHeader>
                    <CardTitle>Purchase History</CardTitle>
                    <CardDescription>Your history of purchased seller numbers.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Seller Number</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>ORD-2024-001</TableCell>
                                <TableCell>#{SELLER_NUMBER}</TableCell>
                                <TableCell>{new Date().toLocaleDateString()}</TableCell>
                                <TableCell className="text-right">€10.00</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <div className="mt-6 flex justify-start">
                        <Button variant="secondary">Purchase New Number</Button>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
