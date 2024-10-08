"use client";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import SimpleInput from "@/components/form-utils/simple-input";
import { useForm } from "react-hook-form";
import { PersonaSchema } from "@/schemas/main-schemas";
import { useState, useTransition } from "react";
import { FormError } from "@/components/form-utils/form-error";
import { zodResolver } from "@hookform/resolvers/zod";
import { personaAction } from "../action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export function PersonaForm({ action, item }) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter(); 

  const form = useForm({
    resolver: zodResolver(PersonaSchema),
    defaultValues: {
      job: item?.job || "",
      industry: item?.industry || "",
      niche: item?.niche || "",
      experience: item?.experience || "",
      expertise: item?.expertise || "",
    },
  });

  const onSubmit = (values) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      personaAction(values, action, item?._id).then((data) => {
        if (data?.error) {
          setError(data.error);
        } else {
          setSuccess(data?.success);
          toast.success("Persona updated successfully");
          router.push("/dashboard/prompts"); 
        }
      });
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">
          {action === "create" ? "Add a new Persona" : "Edit Persona"}
        </CardTitle>
        <CardDescription>
          Enter the details of the persona below
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <CardContent className="space-y-4">
            <SimpleInput
              control={form.control}
              disabled={isPending}
              name="job"
              label="Job Role"
              placeholder="e.g., Software Engineer"
            />
            <SimpleInput
              control={form.control}
              disabled={isPending}
              name="industry"
              label="Industry"
              placeholder="e.g., Technology"
            />
            <SimpleInput
              control={form.control}
              disabled={isPending}
              name="niche"
              label="Niche"
              placeholder="e.g., Web Development"
            />
            <SimpleInput
              control={form.control}
              disabled={isPending}
              name="experience"
              label="Years of Experience"
              placeholder="e.g., 5"
            />
            <SimpleInput
              control={form.control}
              disabled={isPending}
              name="expertise"
              label="Areas of Expertise"
              placeholder="e.g., React, Node.js, Express, MongoDB"
            />
            <FormError message={error} />
          </CardContent>
          <CardFooter>
            <Button
              disabled={isPending}
              type="submit"
              className="w-full sm:w-auto"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}