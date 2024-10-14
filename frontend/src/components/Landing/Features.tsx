import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { Badge } from "../ui/badge";

export default function Features() {
  return (
    <div className="max-w-[1240px]  mx-auto flex flex-col items-center py-10 gap-5 px-5 text-center">
      <Badge variant="outline" className="text-lg">
        Features of Vimly
      </Badge>
      <h2 className="text-3xl md:text-5xl font-bold">
        Upload Videos, Explore Articles, Stay Updated
      </h2>
      <div className="flex flex-col md:flex-row gap-5 mt-5 justify-around w-full">
        {/* Feature Cards */}
        <Card className="w-full md:w-[30%]">
          <CardHeader>
            <CardTitle>Upload Videos</CardTitle>
            <CardDescription>
              Share your knowledge and creativity with others by uploading
              videos.
            </CardDescription>
          </CardHeader>
          <CardContent>Video upload capabilities for creators.</CardContent>
        </Card>

        <Card className="w-full md:w-[30%]">
          <CardHeader>
            <CardTitle>Explore Themes</CardTitle>
            <CardDescription>
              Browse curated themes and resources to stay up to date.
            </CardDescription>
          </CardHeader>
          <CardContent>Discover the latest trends and topics.</CardContent>
        </Card>

        <Card className="w-full md:w-[30%]">
          <CardHeader>
            <CardTitle>Tools & Resources</CardTitle>
            <CardDescription>
              Access helpful tools and resources that boost productivity.
            </CardDescription>
          </CardHeader>
          <CardContent>Tools designed to make work easier.</CardContent>
        </Card>
      </div>
    </div>
  );
}
