'use client';

import { useState } from 'react';

import { Check, Clipboard } from 'lucide-react';

import { Category } from '@/interfaces/Category';

import AuthGuard from '../AuthGuard';
import { Button } from '../ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '../ui/table';

interface TableProps {
  categories: Category[];
}

export default function SubjectsCategoriesTable({ categories }: TableProps) {
  return (
    <div className="">
      <h2 className="text-xl font-bold">Categories</h2>
      <Table className="">
        <TableHeader>
          <TableRow>
            <TableCell className="">ID</TableCell>
            <TableCell className="">Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell className="">Copy ID</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories &&
            categories.map((c) => (
              <CategoryTableCard
                key={c.id}
                category={c}
              />
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

interface TableRowProps {
  category: Category;
}

function CategoryTableCard({ category }: TableRowProps) {
  const [copied, setCopied] = useState(false);

  return (
    <TableRow key={category.id}>
      <TableCell>
        <p className="w-[100px] overflow-clip overflow-ellipsis text-nowrap">
          {category.id}
        </p>
      </TableCell>
      <TableCell>{category.name}</TableCell>
      <TableCell>
        <p className="w-[400px] overflow-clip overflow-ellipsis text-nowrap">
          {category.description}
        </p>
      </TableCell>
      <TableCell className="cursor-pointer text-right">
        <Button variant="outline">Select</Button>
      </TableCell>
    </TableRow>
  );
}
