import { auth } from "@/auth";
import { getUser } from "@/lib/data/user-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  User,
  Calendar,
  MessageSquare,
  Users,
  RefreshCw,
  CreditCard,
  AlertTriangle,
  CheckCircle,
  XCircle,
  XIcon,
  UserCircle,
} from "lucide-react"

const DashboardPage = async () => {
  const session = await auth();

  if (!session || !session.user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              User not authenticated
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Please log in to access the dashboard.
            </p>
            <Link href="/login">
              <Button className="mt-4 w-full">Log In</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const user = await getUser(session?.user?.email);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const subscriptionStatusColor = {
    active: "bg-green-100 text-green-800",
    trialing: "bg-blue-100 text-blue-800",
    canceled: "bg-red-100 text-red-800",
    past_due: "bg-yellow-100 text-yellow-800",
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">
              Welcome, {user?.name}
            </CardTitle>
            <Badge
              variant="outline"
              className={`text-sm font-medium ${
                subscriptionStatusColor[user?.subscriptionStatus]
              }`}
            >
              {user?.subscriptionPlan.charAt(0).toUpperCase() +
                user?.subscriptionPlan.slice(1)}{" "}
              Plan
            </Badge>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              {user?.subscriptionStatus === "active"
                ? "Your subscription is active. Enjoy all the features!"
                : "Upgrade your plan to unlock more features."}
            </p>
          </CardContent>
        </Card>

        <DashboardCard
          icon={<MessageSquare className="h-6 w-6 text-indigo-600" />}
          title="Available AI Comments"
          value={user?.availableRequest}
        />
        <DashboardCard
          icon={<Users className="h-6 w-6 text-green-600" />}
          title="Available Prospects"
          value={user?.maxMonitors}
        />
        <DashboardCard
          icon={<RefreshCw className="h-6 w-6 text-blue-600" />}
          title="LinkedIn Post Scraping Limit"
          value={user?.linkedinApiCalls}
        />
        <DashboardCard
          icon={<User className="h-6 w-6 text-purple-600" />}
          title="Persona Count"
          value={user?.personaCount}
        />
        <DashboardCard
          icon={<Calendar className="h-6 w-6 text-orange-600" />}
          title="Account Created"
          value={formatDate(user?.createdAt)}
        />
        {user?.subscriptionEndDate && (
          <DashboardCard
            icon={<CreditCard className="h-6 w-6 text-red-600" />}
            title="Subscription End Date"
            value={formatDate(user?.subscriptionEndDate)}
          />
        )}
        
        {user?.num_twitter_req && (
          <DashboardCard
            icon={<XIcon className="h-6 w-6 text-blue-400" />}
            title="Twitter Requests"
            value={user?.num_twitter_req}
          />
        )}
      </div>

      <div className="mt-8 space-y-4">
  {user?.subscriptionStatus === "trialing" && (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Subscription Status</CardTitle>
      </CardHeader>
      <CardContent>
        <SubscriptionMessage
          icon={<AlertTriangle className="h-6 w-6 text-yellow-500" />}
          message="You are currently on a trial account. Upgrade to unlock more features!"
          buttonText="Subscribe to a Plan"
          buttonLink="/dashboard/subscription"
        />
      </CardContent>
    </Card>
  )}

  {user?.subscriptionStatus === "active" && (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Subscription Status</CardTitle>
      </CardHeader>
      <CardContent>
        <SubscriptionMessage
          icon={<CheckCircle className="h-6 w-6 text-green-500" />}
          message="Your subscription is active. Enjoy all the features!"
          buttonText="Manage Subscription"
          buttonLink="/dashboard/subscription"
        />
      </CardContent>
    </Card>
  )}

  {(user?.subscriptionStatus === "canceled" ||
    user?.subscriptionStatus === "past_due") && (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Subscription Status</CardTitle>
      </CardHeader>
      <CardContent>
        <SubscriptionMessage
          icon={<XCircle className="h-6 w-6 text-red-500" />}
          message="Your subscription has ended. Renew to access premium features!"
          buttonText="Renew Subscription"
          buttonLink="/dashboard/subscription"
        />
      </CardContent>
    </Card>
  )}

  {user?.subscriptionPlan === "free" && (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Subscription Status</CardTitle>
      </CardHeader>
      <CardContent>
        <SubscriptionMessage
          icon={<AlertTriangle className="h-6 w-6 text-blue-500" />}
          message="Upgrade to a paid plan for more AI comments and features!"
          buttonText="Compare Plans"
          buttonLink="/dashboard/subscription"
        />
      </CardContent>
    </Card>
  )}

  {user?.subscriptionStatus === "active" && (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Current Plan Benefits</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">
            Current Plan Benefits:
          </h3>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>{user?.availableRequest} AI generated comments</li>
            <li>{user?.linkedinApiCalls} LinkedIn post scrapes</li>
            <li>{user?.maxMonitors} monitored prospects</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )}
</div>

    </div>
  );
};
const DashboardCard = ({ icon, title, value }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-gray-500">
        {title}
      </CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
    </CardContent>
  </Card>
);
const SubscriptionMessage = ({ icon, message, buttonText, buttonLink }) => (
  <div className="flex items-start space-x-4">
    {icon}
    <div>
      <p className="text-gray-700 mb-4">{message}</p>
      <Link href={buttonLink}>
        <Button className="w-full sm:w-auto">{buttonText}</Button>
      </Link>
    </div>
  </div>
);
export default DashboardPage;
