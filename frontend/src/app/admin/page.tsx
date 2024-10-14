"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

export default function DashboardPage() {
  const items = JSON.parse(localStorage.getItem("items") || "[]");

  const recentActivity = [
    { action: "Published a new video", date: "2024-10-10" },
    { action: "Updated article on React Hooks", date: "2024-10-09" },
    { action: "Created a new tool for developers", date: "2024-10-08" },
  ];

  const performanceMetrics = [
    { metric: "Average Video Views", value: "1500" },
    { metric: "Average Article Reads", value: "300" },
    { metric: "Tool Usage Rate", value: "80%" },
  ];

  return (
    <div className="p-6 h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <p className="mb-4 text-lg text-gray-600">
        Welcome to your dashboard! Here you can view an overview of your
        platform’s performance, manage content, and explore analytics.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Videos</CardTitle>
            <CardDescription>
              See the latest stats for your videos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{items.videos.length}</p>
            <p className="text-sm text-gray-500 mt-2">
              Published videos on the platform
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Articles</CardTitle>
            <CardDescription>Your article performance overview</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{items.articles.length}</p>
            <p className="text-sm text-gray-500 mt-2">
              Published articles on the platform
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Tools</CardTitle>
            <CardDescription>
              New helpful tools for the community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{items.tools.length}</p>
            <p className="text-sm text-gray-500 mt-2">
              Times tools have been utilized
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for more data */}
      <Tabs defaultValue="analytics">
        <TabsList>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="recent">Recent Activity</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics">
          <h2 className="text-xl font-bold mb-4">Platform Analytics</h2>
          <Progress value={70} className="mb-4" />
          <p>Growth in the last month: 70%</p>
          <p>Unique Users: 1,200</p>
          <p>Sessions: 3,500</p>
          <p>Engagement Rate: 65%</p>
        </TabsContent>

        <TabsContent value="recent">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          {recentActivity.length > 0 ? (
            <ul className="list-disc pl-5">
              {recentActivity.map((activity, index) => (
                <li key={index} className="mb-2">
                  {activity.action} -{" "}
                  <span className="text-gray-500">{activity.date}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No recent activities at this moment.</p>
          )}
        </TabsContent>

        <TabsContent value="performance">
          <h2 className="text-xl font-bold mb-4">Performance Metrics</h2>
          <ul className="list-disc pl-5">
            {performanceMetrics.map((metric, index) => (
              <li key={index} className="mb-2">
                <strong>{metric.metric}:</strong> {metric.value}
              </li>
            ))}
          </ul>
        </TabsContent>
      </Tabs>

      {/* Actions */}
      <div className="mt-6">
        <Link href="/admin/videos/create-video">
          <Button variant="default">Create New Video</Button>
        </Link>
        <Link href="/admin/articles/create-article">
          <Button variant="secondary" className="ml-4">
            Create New Article
          </Button>
        </Link>
      </div>

      {/* Additional Text */}
      <p className="mt-6 text-sm text-gray-500">
        Keep track of your platform’s success by regularly reviewing the
        analytics and performance metrics. Stay updated with the latest trends
        and make informed decisions.
      </p>
    </div>
  );
}
