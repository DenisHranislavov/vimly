import React from "react";
import { Button } from "./ui/button";
import { fetchItems } from "@/lib/getItems";

// This is a refresh button for getting the latest data from the server.
// It is used only for testing purposes.

export default function Refresh() {
  return (
    <div>
      <Button variant="default" onClick={() => fetchItems()}>
        Refresh
      </Button>
    </div>
  );
}
