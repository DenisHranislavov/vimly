import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Testimonials() {
  return (
    <div className="max-w-[1240px] min-h-[60vh] mx-auto flex flex-col items-center py-10 gap-5 px-5 text-center">
      <Badge variant="outline" className="text-lg">
        What People Say
      </Badge>
      <h2 className="text-3xl md:text-5xl font-bold">
        Testimonials from our users
      </h2>
      <div className="flex flex-col md:flex-row gap-5 mt-5 justify-around w-full">
        {/* Testimonial Cards */}
        <Card className="w-full md:w-[30%]">
          <CardHeader>
            <CardTitle>Jane Doe</CardTitle>
            <CardContent>
              “Vimly has been a game-changer for me. The tools and resources
              available here help me stay ahead in my work and discover new
              things every day!”
            </CardContent>
          </CardHeader>
        </Card>

        <Card className="w-full md:w-[30%]">
          <CardHeader>
            <CardTitle>John Smith</CardTitle>
            <CardContent>
              “I’ve never had a platform that combines so many helpful features.
              From video uploads to detailed resources, Vimly keeps me updated
              and productive!”
            </CardContent>
          </CardHeader>
        </Card>

        <Card className="w-full md:w-[30%]">
          <CardHeader>
            <CardTitle>Emily Johnson</CardTitle>
            <CardContent>
              “Whether you’re looking for inspiration or a solution to a
              problem, Vimly is the place to be. It’s easy to use and always
              full of fresh content!”
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
