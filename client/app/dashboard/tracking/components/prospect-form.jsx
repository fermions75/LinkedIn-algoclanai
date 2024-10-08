"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { addProspect } from '@/lib/data/tracking-data';
import { toast } from "sonner";

export function ProspectForm() {
  const router = useRouter();
  const [linkedinUsername, setLinkedinUsername] = useState('');
  const [type, setType] = useState('');

  const mutation = useMutation({
    mutationFn: addProspect,
    onSuccess: () => {
      toast.success("Persona updated successfully");
      router.push('/dashboard/tracking'); // Adjust this path as needed
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleGoBack = () => {
    router.back();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ linkedinUsername, type });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center space-x-4">
        <Button type="button" variant="ghost" onClick={handleGoBack}>
          <ArrowLeft />
          Back
        </Button>
        <h2 className="text-xl font-semibold">Add necessary details about your prospect</h2>
      </div>
      <Select value={type} onValueChange={setType}>
        <SelectTrigger>
          <SelectValue placeholder="Choose profile type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="user">User</SelectItem>
          <SelectItem value="company">Company</SelectItem>
        </SelectContent>
      </Select>
      <Input 
        placeholder="LinkedIn Username" 
        value={linkedinUsername}
        onChange={(e) => setLinkedinUsername(e.target.value)}
      />
      <div className="flex space-x-2">
        <Button type="submit" variant="secondary" disabled={mutation.isLoading}>
          {mutation.isLoading ? 'Saving...' : 'Save'}
        </Button>
        <Button type="button" variant="outline" onClick={handleGoBack}>Cancel</Button>
      </div>
    </form>
  );
}