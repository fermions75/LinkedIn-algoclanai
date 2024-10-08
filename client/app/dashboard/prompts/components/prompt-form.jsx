// /app/dashboard/prompts/components/prompt-form.jsx
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
import { PromptSchema } from "@/schemas/main-schemas";
import { useState, useTransition } from "react";
import { FormError } from "@/components/form-utils/form-error";
import { zodResolver } from "@hookform/resolvers/zod";
import { promptAction } from "../action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export function PromptForm({ action, item }) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  
  const form = useForm({
    resolver: zodResolver(PromptSchema),
    defaultValues: {
      name: item?.name || "",
      text: item?.text || "",
    },
  });

  const onSubmit = (values) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      promptAction(values, action, item?._id).then((data) => {
        if (data?.error) {
          setError(data.error);
        } else {
          setSuccess(data?.success);
          toast.success("Prompt updated successfully");
          router.push("/dashboard/prompts");
        }
      });
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">
          {action === "create" ? "Add a new Prompt" : "Edit Prompt"}
        </CardTitle>
        <CardDescription>
          Enter the details of the prompt below
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <CardContent className="space-y-4">
            <SimpleInput
              control={form.control}
              disabled={isPending}
              name="name"
              label="Prompt Name"
              placeholder="e.g., Question"
            />
            <SimpleInput
              control={form.control}
              disabled={isPending}
              name="text"
              label="Prompt Text"
              placeholder="e.g., Make the tone like asking a question"
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