import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Overview} from "@/components/charts/overview";
import { unstable_getServerSession } from 'next-auth/next';
export default async function Dashboard() {
    const session = await unstable_getServerSession();
    console.log(session)
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 p-3">
            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                    <Overview />
                </CardContent>
            </Card>
            <Card className="col-span-3">
                <CardHeader>
                    <CardTitle>Recent Sales</CardTitle>
                    <CardDescription>
                        You made 265 sales this month.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {/*<RecentSales />*/}
                </CardContent>
            </Card>
        </div>
    )
}
