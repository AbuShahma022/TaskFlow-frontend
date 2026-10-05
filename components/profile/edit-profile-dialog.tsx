"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useUpdateProfile } from "@/hooks/mutations/use-update-profile";

interface EditProfileDialogProps {
  name: string;
}

export function EditProfileDialog({
  name,
}: EditProfileDialogProps) {
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState(name);
  const [avatar, setAvatar] = useState<File | null>(null);

  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("name", userName);

    if (avatar) {
      formData.append("avatar", avatar);
    }

    updateProfile(formData, {
      onSuccess: (data) => {
        toast.success(data.message);
        setOpen(false);
        setAvatar(null);
      },
      onError: (error) => {
        toast.error(error.message || "Failed to update profile");
      },
    });
  };

  const handleAvatarChange = (
  event: React.ChangeEvent<HTMLInputElement>,
) => {
  const file = event.target.files?.[0];

  if (!file) {
    setAvatar(null);
    return;
  }

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  const maxSize = 5 * 1024 * 1024; // 5 MB

  if (!allowedTypes.includes(file.type)) {
    toast.error("Only JPG, PNG, and WebP images are allowed.");
    event.target.value = "";
    return;
  }

  if (file.size > maxSize) {
    toast.error("Image must be smaller than 5 MB.");
    event.target.value = "";
    return;
  }

  setAvatar(file);
};

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Pencil />
          Edit Profile
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>

            <Input
              id="name"
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="avatar" className="text-sm font-medium">
              Profile picture
            </label>

            <Input
              id="avatar"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleAvatarChange}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}