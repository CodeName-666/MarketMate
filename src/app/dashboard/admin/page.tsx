
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Download, Store, PlusCircle, Edit, Trash2, Building, Users, Mail, Award, Settings, Eye, UsersRound, Package, DollarSign } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
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
import { useSearchParams } from "next/navigation";
import * as React from "react";
import { Switch } from "@/components/ui/switch";
import type { Market, OrgMember } from "@/lib/types";
import { getMarkets, getOrgMembers } from "@/lib/data";


export default function AdminPage() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const org = searchParams.get('org') || 'My Organization';
  const [markets, setMarkets] = React.useState<Market[]>([]);
  const [orgMembers, setOrgMembers] = React.useState<OrgMember[]>([]);

  React.useEffect(() => {
    // Fetch data on component mount
    const fetchData = async () => {
        const marketsData = await getMarkets();
        setMarkets(marketsData);

        const orgMembersData = await getOrgMembers(org);
        setOrgMembers(orgMembersData);
    };
    fetchData();
  }, [org]);


  const formatName = (name: string) => name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  const handleSaveMarketSettings = (e: React.FormEvent<HTMLFormElement>, marketId: number) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const updatedMarket = {
        articleLimit: Number(formData.get("articleLimit")),
        sellerFee: Number(formData.get("sellerFee")),
        maxSellerNumbers: Number(formData.get("maxSellerNumbers")),
        maxSellerNumbersPerUser: Number(formData.get("maxSellerNumbersPerUser")),
        allowHelperRegistration: formData.get("allowHelperRegistration") === "on",
        isPublic: formData.get("isPublic") === "on",
    };
    
    setMarkets(markets.map(m => m.id === marketId ? { ...m, ...updatedMarket } : m));
    
    toast({
      title: "Market Settings Saved",
      description: `Settings for market ${marketId} have been updated.`,
    });
  };

  const handleExport = (marketName: string) => {
    const articles = [
      { sellerId: 101, articleId: 1, description: 'Vintage T-Shirt', price: 15.00 },
      { sellerId: 102, articleId: 1, description: 'Antique Clock', price: 120.00 },
    ];
    
    const headers = "sellerId,articleId,description,price";
    const csvRows = articles.map(row => `${row.sellerId},"${row.description}",${row.price}`);
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...csvRows].join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `cash_register_data_${marketName.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Export Started",
      description: `Data export for ${marketName} has been downloaded.`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Admin Control Panel</h1>
        <p className="text-muted-foreground">
            Managing <span className="font-semibold text-primary">{formatName(org)}</span>
        </p>
      </div>

      <Tabs defaultValue="markets">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="org-settings"><Building className="mr-2 h-4 w-4" />Organization</TabsTrigger>
          <TabsTrigger value="markets"><Store className="mr-2 h-4 w-4" />Market Management</TabsTrigger>
        </TabsList>
         <TabsContent value="org-settings">
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
             <div className="lg:col-span-1 space-y-6">
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Organization Info</CardTitle>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                         <div className="flex items-center gap-2 font-semibold text-base">
                            <Building className="h-5 w-5 text-primary"/>
                            <span>{formatName(org)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Mail className="h-4 w-4"/>
                            <span>contact@example.com</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Award className="h-4 w-4"/>
                            <span>Pro Subscription</span>
                        </div>
                    </CardContent>
                </Card>
             </div>
             <div className="lg:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Organization Members</CardTitle>
                        <CardDescription>Manage administrators and owners for your organization.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead className="text-right">Role</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orgMembers.map((member) => (
                                    <TableRow key={member.id}>
                                        <TableCell className="font-medium">{member.name}</TableCell>
                                        <TableCell>{member.email}</TableCell>
                                        <TableCell className="text-right">
                                             <Badge variant={member.role === 'Owner' ? 'default' : 'secondary'}>
                                                {member.role}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                         <div className="mt-6 flex justify-end">
                            <Button>
                                <PlusCircle className="mr-2 h-4 w-4" /> Add Member
                            </Button>
                        </div>
                    </CardContent>
                </Card>
             </div>
           </div>
        </TabsContent>
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
                        {markets.map((market) => (
                            <TableRow key={market.id}>
                                <TableCell className="font-medium">{market.name}</TableCell>
                                <TableCell>{market.date}</TableCell>
                                <TableCell>{market.status}</TableCell>
                                <TableCell className="text-right">
                                    <Dialog>
                                      <DialogTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8" title="Settings">
                                            <Settings className="h-4 w-4" />
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent className="sm:max-w-[480px]">
                                        <DialogHeader>
                                            <DialogTitle>Market Settings: {market.name}</DialogTitle>
                                            <DialogDescription>Manage all settings and limits for this specific market.</DialogDescription>
                                        </DialogHeader>
                                        <form id={`market-settings-form-${market.id}`} onSubmit={(e) => handleSaveMarketSettings(e, market.id)} className="grid grid-cols-2 gap-x-6 gap-y-4 pt-4">
                                            <div className="space-y-2">
                                              <Label htmlFor="articleLimit" className="flex items-center"><Package className="mr-2 h-4 w-4"/>Articles per Seller Number</Label>
                                              <Input id="articleLimit" name="articleLimit" type="number" defaultValue={market.articleLimit} min="1" />
                                            </div>
                                            <div className="space-y-2">
                                              <Label htmlFor="sellerFee" className="flex items-center"><DollarSign className="mr-2 h-4 w-4"/>Fee per Seller Number (€)</Label>
                                              <Input id="sellerFee" name="sellerFee" type="number" defaultValue={market.sellerFee} min="0" step="0.5" />
                                            </div>
                                            <div className="space-y-2">
                                              <Label htmlFor="maxSellerNumbers" className="flex items-center"><Store className="mr-2 h-4 w-4"/>Max Seller Numbers (Market)</Label>
                                              <Input id="maxSellerNumbers" name="maxSellerNumbers" type="number" defaultValue={market.maxSellerNumbers} min="1" />
                                            </div>
                                             <div className="space-y-2">
                                              <Label htmlFor="maxSellerNumbersPerUser" className="flex items-center"><Users className="mr-2 h-4 w-4"/>Max Seller Numbers (User)</Label>
                                              <Input id="maxSellerNumbersPerUser" name="maxSellerNumbersPerUser" type="number" defaultValue={market.maxSellerNumbersPerUser} min="1" />
                                            </div>

                                            <div className="col-span-2 border-t pt-4 flex flex-col gap-4">
                                                <div className="flex items-center justify-between space-x-2">
                                                    <Label htmlFor={`allowHelperRegistration-${market.id}`} className="flex items-center font-normal">
                                                        <UsersRound className="mr-2 h-4 w-4 text-muted-foreground"/>
                                                        <span>Allow Helper Registration</span>
                                                    </Label>
                                                    <Switch id={`allowHelperRegistration-${market.id}`} name="allowHelperRegistration" defaultChecked={market.allowHelperRegistration} />
                                                </div>
                                                <div className="flex items-center justify-between space-x-2">
                                                    <Label htmlFor={`isPublic-${market.id}`} className="flex items-center font-normal">
                                                        <Eye className="mr-2 h-4 w-4 text-muted-foreground"/>
                                                        <span>Make Market Publicly Visible</span>
                                                    </Label>
                                                    <Switch id={`isPublic-${market.id}`} name="isPublic" defaultChecked={market.isPublic} />
                                                </div>
                                            </div>
                                        </form>
                                        <DialogFooter>
                                            <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                                            <Button type="submit" form={`market-settings-form-${market.id}`}>Save Changes</Button>
                                        </DialogFooter>
                                      </DialogContent>
                                    </Dialog>

                                    <Button onClick={() => handleExport(market.name)} variant="ghost" size="icon" className="h-8 w-8" title="Export Data">
                                        <Download className="h-4 w-4" />
                                    </Button>

                                    <Button variant="ghost" size="icon" className="h-8 w-8" title="Edit Market">
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" title="Delete Market">
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
      </Tabs>
    </div>
  );
}
