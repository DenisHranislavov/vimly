"use client";
import React, { useState, useEffect } from "react";
import {
  deleteCategory,
  Category,
  createCategory,
  fetchCategories,
} from "@/lib/api";
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
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Swal from "sweetalert2";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newCategoryName, setNewCategoryName] = useState<string>("");

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data?.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    getCategories();
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
        await deleteCategory(id);
        setCategories(categories.filter((category) => category._id !== id));
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  const handleCreate = async () => {
    try {
      const newCategory = await createCategory({ title: newCategoryName });
      Swal.fire({ title: "Category created", icon: "success" });
      setCategories((prevCategories) => [...prevCategories, newCategory]);
    } catch (error) {
      console.error("Failed to create category:", error);
    }
  };

  return (
    <div className="max-w-[1240px] min-h-screen mx-auto pt-20">
      <h1 className="text-3xl font-bold text-center mb-10">Categories</h1>

      {loading ? (
        <div className="text-center">
          <p>Loading categories...</p>
        </div>
      ) : categories.length > 0 ? (
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
              {categories.map((category) => (
                <TableRow key={category._id}>
                  <TableCell className="px-4 py-2">{category._id}</TableCell>
                  <TableCell className="px-4 py-2">{category.title}</TableCell>
                  <TableCell className="px-4 py-2">
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(category._id)}
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
          <p>No categories found</p>
        </div>
      )}
      <div className="w-full flex justify-center mt-10">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="default">Open</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader className="mb-10">
              <SheetTitle>Create Category</SheetTitle>
            </SheetHeader>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="categoryName" className="text-right">
                Label
              </Label>
              <Input
                id="categoryName"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Category name"
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
