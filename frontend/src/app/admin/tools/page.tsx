"use client";
import React, { useState, useEffect } from "react";
import { fetchTools, createTool, deleteTool, Tool, Tools } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Swal from "sweetalert2";

export default function ToolsPage() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newToolName, setNewToolName] = useState<string>("");
  const [newToolLink, setNewToolLink] = useState<string>("");
  const [newToolDescription, setNewToolDescription] = useState<string>("");

  useEffect(() => {
    const getTools = async () => {
      try {
        const data: Tools = await fetchTools();
        setTools(data.tools);
      } catch (error) {
        console.error("Error fetching tools:", error);
      } finally {
        setLoading(false);
      }
    };

    getTools();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await deleteTool(id);
        setTools((prevTools) => prevTools.filter((tool) => tool._id !== id));
        Swal.fire({
          title: "Deleted!",
          text: "The tool has been deleted.",
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error deleting tool:", error);
    }
  };

  const handleCreate = async () => {
    try {
      const newTool = {
        title: newToolName,
        link: newToolLink,
        description: newToolDescription,
      };

      const createdTool = await createTool(newTool);
      setTools((prevTools) => [...prevTools, createdTool]);
      Swal.fire({ title: "Tool created", icon: "success" });

      // Reset the form
      setNewToolName("");
      setNewToolLink("");
      setNewToolDescription("");
    } catch (error) {
      console.error("Failed to create tool:", error);
    }
  };

  return (
    <div className="max-w-[1240px] min-h-screen mx-auto pt-20">
      <h1 className="text-3xl font-bold text-center mb-10">Tools</h1>

      {loading ? (
        <div className="text-center">
          <p>Loading tools...</p>
        </div>
      ) : tools.length > 0 ? (
        <Card className="overflow-x-auto p-4">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="px-4 py-2 text-left">ID</TableHead>
                <TableHead className="px-4 py-2 text-left">Name</TableHead>
                <TableHead className="px-4 py-2 text-left">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tools.map((tool) => (
                <TableRow key={tool._id}>
                  <TableCell className="px-4 py-2">{tool._id}</TableCell>
                  <TableCell className="px-4 py-2">{tool.title}</TableCell>
                  <TableCell className="px-4 py-2">
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(tool._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      ) : (
        <div className="text-center">
          <p>No tools found</p>
        </div>
      )}

      <div className="w-full flex justify-center mt-10">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="default">Add Tool</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader className="mb-10">
              <SheetTitle>Create Tool</SheetTitle>
            </SheetHeader>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="toolName" className="text-right">
                Tool Name
              </Label>
              <Input
                id="toolName"
                value={newToolName}
                onChange={(e) => setNewToolName(e.target.value)}
                placeholder="Tool name"
                className="col-span-3"
              />
              <Label htmlFor="toolLink" className="text-right">
                Tool Link
              </Label>
              <Input
                id="toolLink"
                value={newToolLink}
                onChange={(e) => setNewToolLink(e.target.value)}
                placeholder="Tool link"
                className="col-span-3"
              />
              <Label htmlFor="toolDescription" className="text-right">
                Description
              </Label>
              <Input
                id="toolDescription"
                value={newToolDescription}
                onChange={(e) => setNewToolDescription(e.target.value)}
                placeholder="Tool description"
                className="col-span-3"
              />
            </div>
            <SheetFooter className="mt-5 w-full text-center">
              <SheetClose asChild>
                <Button type="button" onClick={handleCreate}>
                  Save changes
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
