"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

interface ContactFormData {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  inquiryType: string;
  message: string;
  files: File[];
}

export const ContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    inquiryType: "General Inquiry",
    message: "",
    files: [],
  });

  const inquiryTypeOptions = [
    "General Inquiry",
    "Get Technical Support",
    "Freight Damage",
    "Order Status Update",
    "Become a Dealer",
    "Register Your Product",
    "Schedule Training Session",
    "Locate a local Dealer",
    "Return a Product",
    "Exchange Product",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    
    // Check if the number of files exceeds 5
    if (selectedFiles.length + formData.files.length > 5) {
      alert("You can only upload a maximum of 5 files.");
      return;
    }

    // Check each file size
    for (const file of selectedFiles) {
      if (file.size > 25 * 1024 * 1024) {
        alert(`File ${file.name} exceeds the 25 MB limit.`);
        return;
      }
    }

    setFormData({ ...formData, files: [...formData.files, ...selectedFiles] });
  };

  const removeFile = (index: number) => {
    const updatedFiles = formData.files.filter((_, i) => i !== index);
    setFormData({ ...formData, files: updatedFiles });
  };

  const removeAllFiles = () => {
    setFormData({ ...formData, files: [] });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-8 px-4">
      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Full Name *</label>
          <Input
            required
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            className="h-12"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Company Name</label>
          <Input
            placeholder="Enter company name"
            value={formData.companyName}
            onChange={(e) =>
              setFormData({ ...formData, companyName: e.target.value })
            }
            className="h-12"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Email *</label>
          <Input
            required
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="h-12"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Phone *</label>
          <Input
            required
            type="tel"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="h-12"
          />
        </div>
      </div>

      {/* Additional Information */}
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Inquiry Type? *</label>
          <Select
            value={formData.inquiryType}
            onValueChange={(value) =>
              setFormData({ ...formData, inquiryType: value })
            }
          >
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {inquiryTypeOptions.map((option) => (
                <SelectItem key={option} value={option} className="cursor-pointer hover:bg-gray-100">
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Message *</label>
          <Textarea
            required
            placeholder="Enter your message"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            className="min-h-[150px] resize-none"
          />
        </div>

        {/* File Upload Section */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Attach files</label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="flex w-36 items-center justify-center h-8 px-4 text-sm bg-black text-white cursor-pointer hover:bg-gray-600 transition-colors duration-200 rounded-md"
          >
            Choose Files
          </label>
          <p className="text-sm text-gray-500">
            You can attach up to 5 files (max 25 MB each).
          </p>

          {/* Display selected files */}
          {formData.files.length > 0 && (
            <div className="mt-2">
              <h4 className="text-sm font-medium">Selected Files:</h4>
              <ul className="list-disc pl-5">
                {formData.files.map((file, index) => (
                  <li key={index} className="text-gray-700">
                    <div className="flex justify-between items-center">
<span>{file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)</span>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700 ml-4"
                    >
                      <X size={16} />
                    </button>
                    </div>
                    
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={removeAllFiles}
                className="mt-2 text-red-500 hover:text-red-700"
              >
                Remove All Files
              </button>
            </div>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="w-full md:w-auto px-6 py-2 bg-[#ec7d3c] text-white hover:bg-[#ec7d3c]/80 transition-colors duration-200 rounded-md"
      >
        SUBMIT
      </button>
    </form>
  );
};

export default ContactForm; 