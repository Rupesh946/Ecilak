"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@example.com",
    phone: "",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile updated successfully");
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Password updated successfully");
  };

  return (
    <div className="max-w-xl">
      <h2 className="font-serif text-2xl text-warm-gray-900 mb-6">
        Profile Settings
      </h2>

      {/* Personal Info */}
      <form onSubmit={handleSave} className="space-y-5 mb-10">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName" className="text-sm font-sans text-warm-gray-600">
              First Name
            </Label>
            <Input
              id="firstName"
              value={profile.firstName}
              onChange={(e) =>
                setProfile((p) => ({ ...p, firstName: e.target.value }))
              }
              className="mt-1 bg-white border-cream-300"
            />
          </div>
          <div>
            <Label htmlFor="lastName" className="text-sm font-sans text-warm-gray-600">
              Last Name
            </Label>
            <Input
              id="lastName"
              value={profile.lastName}
              onChange={(e) =>
                setProfile((p) => ({ ...p, lastName: e.target.value }))
              }
              className="mt-1 bg-white border-cream-300"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="profileEmail" className="text-sm font-sans text-warm-gray-600">
            Email
          </Label>
          <Input
            id="profileEmail"
            type="email"
            value={profile.email}
            onChange={(e) =>
              setProfile((p) => ({ ...p, email: e.target.value }))
            }
            className="mt-1 bg-white border-cream-300"
          />
        </div>

        <div>
          <Label htmlFor="profilePhone" className="text-sm font-sans text-warm-gray-600">
            Phone
          </Label>
          <Input
            id="profilePhone"
            type="tel"
            value={profile.phone}
            onChange={(e) =>
              setProfile((p) => ({ ...p, phone: e.target.value }))
            }
            className="mt-1 bg-white border-cream-300"
          />
        </div>

        <Button
          type="submit"
          className="bg-warm-gray-900 text-cream-50 hover:bg-terracotta-400 font-sans text-sm rounded-xl px-6"
        >
          Save Changes
        </Button>
      </form>

      <Separator className="bg-cream-300 mb-10" />

      {/* Change Password */}
      <h3 className="font-serif text-xl text-warm-gray-900 mb-5">
        Change Password
      </h3>

      <form onSubmit={handlePasswordChange} className="space-y-5">
        <div>
          <Label htmlFor="currentPassword" className="text-sm font-sans text-warm-gray-600">
            Current Password
          </Label>
          <Input
            id="currentPassword"
            type="password"
            className="mt-1 bg-white border-cream-300"
          />
        </div>
        <div>
          <Label htmlFor="newPassword" className="text-sm font-sans text-warm-gray-600">
            New Password
          </Label>
          <Input
            id="newPassword"
            type="password"
            className="mt-1 bg-white border-cream-300"
          />
        </div>
        <div>
          <Label htmlFor="confirmPassword" className="text-sm font-sans text-warm-gray-600">
            Confirm New Password
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            className="mt-1 bg-white border-cream-300"
          />
        </div>

        <Button
          type="submit"
          variant="outline"
          className="border-warm-gray-300 text-warm-gray-600 hover:border-terracotta-400 hover:text-terracotta-400 font-sans text-sm rounded-xl px-6"
        >
          Update Password
        </Button>
      </form>
    </div>
  );
}
