"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Mail, Phone, UserCircle, Calendar } from "lucide-react";

const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "https://placehold.co/128x128.png",
    fallback: "JD"
};

const marketHistory = [
    { id: 1, name: 'Summer Flea Market', date: '2024-08-15', status: 'Running', role: 'Seller' },
    { id: 2, name: 'Winter Wonderland Market', date: '2023-12-05', status: 'Closed', role: 'Seller' },
    { id: 3, name: 'Spring Community Fair', date: '2023-05-20', status: 'Closed', role: 'Helper' },
    { id: 4, name: 'Autumn Harvest Festival', date: '2022-10-28', status: 'Closed', role: 'Seller' },
];

const statusVariantMap: Record<string, BadgeProps["variant"]> = {
    running: "default",
    closed: "secondary",
};

const getStatusVariant = (status: string): BadgeProps["variant"] => {
    return statusVariantMap[status.toLowerCase()] ?? "outline";
};

export default function ProfilePage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-headline">My Profile</h1>
                <p className="text-muted-foreground">Manage your personal information and view your market history.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                           <CardTitle>User Information</CardTitle>
                           <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Edit className="h-4 w-4" />
                           </Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-16 w-16">
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback>{user.fallback}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h2 className="text-xl font-semibold">{user.name}</h2>
                                    <p className="text-sm text-muted-foreground">Joined in 2022</p>
                                </div>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Mail className="h-4 w-4"/>
                                    <span>{user.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Phone className="h-4 w-4"/>
                                    <span>{user.phone}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Market History</CardTitle>
                            <CardDescription>An overview of all markets you have been a part of.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Market Name</TableHead>
                                        <TableHead><Calendar className="inline-block mr-1 h-4 w-4" />Date</TableHead>
                                        <TableHead><UserCircle className="inline-block mr-1 h-4 w-4" />Your Role</TableHead>
                                        <TableHead className="text-right">Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {marketHistory.map((market) => (
                                        <TableRow key={market.id}>
                                            <TableCell className="font-medium">{market.name}</TableCell>
                                            <TableCell>{market.date}</TableCell>
                                            <TableCell>
                                                <Badge variant={market.role === 'Seller' ? 'outline' : 'default'} className={market.role === 'Helper' ? 'bg-accent text-accent-foreground' : ''}>
                                                    {market.role}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                 <Badge variant={getStatusVariant(market.status)}>
                                                    {market.status}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
