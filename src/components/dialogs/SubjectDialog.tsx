import React, { FormEvent, useState } from "react";
import { Plus, Search, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Subject } from "@/interfaces/Subject";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useSubjectStore } from "@/store/subject/subject.store";

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  subjects: Subject[];
  teachingSubjects: string[]; // Changed to string[] since we're comparing IDs
  onSubjectAdd: (subjectId: string) => void; // Added specific type
  onSubjectRemove: (subjectId: string) => void; // Added specific type
  userId: string;
}

const SubjectDialog = ({
  isOpen,
  onOpenChange,
  subjects,
  teachingSubjects,
  onSubjectAdd,
  onSubjectRemove,
  userId,
}: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const searchSubjects = useSubjectStore(state => state.searchSubjects);

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    searchSubjects(searchTerm); 

  };

  const handleTeachingCreate = async (subjectId: string) => {
    try {
      const response = await fetch("/api/v1/teachings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          teacher_id: userId,
          subject_id: subjectId,
        }),
      });

      if (response.ok) {
        onSubjectAdd(subjectId);
      }
    } catch (error) {
      console.error("Error creating teaching:", error);
    }
  };

  const filteredSubjects =  searchTerm && subjects !== null ? subjects.filter(
        (subject) =>
          subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          subject.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : subjects;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Subjects</DialogTitle>
          <DialogDescription>
            Search and select the subjects you want to teach.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSearch}
          className="my-4 flex gap-2"
        >
          <Input
            placeholder="Search subjects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Button
            type="submit"
          >
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </form>

        <div className="grid max-h-[400px] gap-4 overflow-y-auto py-4">
          {filteredSubjects.map((subject: Subject) => (
            <div
              key={subject.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div>
                <h3 className="font-medium">{subject.name}</h3>
                <p className="text-sm text-gray-600">{subject.description}</p>
              </div>
              <Button
                variant={
                  teachingSubjects.includes(subject.id)
                    ? "destructive"
                    : "outline"
                }
                onClick={() => {
                  if (teachingSubjects.includes(subject.id)) {
                    onSubjectRemove(subject.id);
                  } else {
                    handleTeachingCreate(subject.id);
                  }
                }}
              >
                {teachingSubjects.includes(subject.id) ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
              </Button>
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Done</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubjectDialog;
