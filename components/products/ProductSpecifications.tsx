"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";

interface Specification {
  category: string;
  specs: {
    name: string;
    value: string;
  }[];
}

interface ProductSpecificationsProps {
  specifications: Specification[];
}

export function ProductSpecifications({
  specifications,
}: ProductSpecificationsProps) {
  return (
    <div className="space-y-8">
      {specifications.map((category) => (
        <Card key={category.category} className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  colSpan={2}
                  className="bg-muted/50 font-heading font-semibold"
                >
                  {category.category}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {category.specs.map((spec) => (
                <TableRow key={spec.name}>
                  <TableCell className="w-1/3 font-medium">{spec.name}</TableCell>
                  <TableCell>{spec.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      ))}

      {/* Certification Icons */}
      <div className="mt-8">
        <h3 className="font-heading font-semibold mb-4">Certifications</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 p-4 rounded-lg border bg-card">
            <div className="relative w-12 h-12">
              <img
                src="/icons/certifications/ul-certified.svg"
                alt="UL Certified"
                className="object-contain"
              />
            </div>
            <div>
              <p className="font-medium">UL Certified</p>
              <p className="text-sm text-muted-foreground">Safety Standard</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-lg border bg-card">
            <div className="relative w-12 h-12">
              <img
                src="/icons/certifications/csa-certified.svg"
                alt="CSA Certified"
                className="object-contain"
              />
            </div>
            <div>
              <p className="font-medium">CSA Certified</p>
              <p className="text-sm text-muted-foreground">Canadian Standard</p>
            </div>
          </div>
          {/* Add more certification badges as needed */}
        </div>
      </div>

      {/* Technical Drawing */}
      <div className="mt-8">
        <h3 className="font-heading font-semibold mb-4">Technical Drawing</h3>
        <Card className="p-6">
          <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
            <img
              src="/images/technical-drawing.svg"
              alt="Technical Drawing"
              className="object-contain w-full h-full"
            />
          </div>
          <p className="text-sm text-muted-foreground text-center mt-4">
            * All dimensions are in inches unless otherwise specified
          </p>
        </Card>
      </div>
    </div>
  );
} 