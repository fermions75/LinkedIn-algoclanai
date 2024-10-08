"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { CheckCircle, Mail, User, AlertCircle, ExternalLink } from "lucide-react";
import Link from "next/link";

export function PricingStatus({ name, email, subscriptionStatus, subscriptionPlan }) {
  const currentPlan = subscriptionPlan === "free" ? "Free" : subscriptionPlan === "monthly" ? "Monthly" : "Yearly";
  const subscriptionIsActive = subscriptionStatus === "active";

  const customerPortalLink = `${process.env.NEXT_PUBLIC_STRIPE_BILLING}?prefilled_email=${email}`;

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Subscription Status</CardTitle>
        <CardDescription>Manage your plan and billing details</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex items-center space-x-4">
          {subscriptionIsActive ? (
            <CheckCircle className="h-8 w-8 text-green-500" />
          ) : (
            <AlertCircle className="h-8 w-8 text-yellow-500" />
          )}
          <div>
            <CardTitle className="text-lg">
              {subscriptionStatus.charAt(0).toUpperCase() + subscriptionStatus.slice(1)}
            </CardTitle>
            <CardDescription>
              {subscriptionIsActive
                ? "Your subscription is active."
                : `Your subscription is ${subscriptionStatus}.`}
            </CardDescription>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-center space-x-4">
            <User className="h-6 w-6 text-gray-500" />
            <div>
              <CardTitle className="text-base">{name}</CardTitle>
              <CardDescription>Account Owner</CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Mail className="h-6 w-6 text-gray-500" />
            <div>
              <CardTitle className="text-base">{email}</CardTitle>
              <CardDescription>Primary Email</CardDescription>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 rounded-lg p-4 dark:bg-gray-800">
          <div className="font-semibold text-lg mb-2">{currentPlan} Plan</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            {currentPlan === "Free"
              ? "Limited features. Upgrade for full access."
              : "Full access to all features"}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {!subscriptionIsActive && (
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Upgrade to Pro
          </Button>
        )}
        <Button variant="outline" asChild>
          <Link
            href={customerPortalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            Manage Billing <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}