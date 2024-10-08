"use client"
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { PostList } from './post-list';
import { ProspectList } from './prospect-list';


export function MonitorContent({prospects}) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Monitor</h1>
      <p className="text-sm text-gray-600">
        Track the latest post of your targeted users. {' '}
     
      </p>
      <Tabs defaultValue="posts">
        <TabsList>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="prospects">Prospects</TabsTrigger>
     
        </TabsList>
        <TabsContent value="posts">
          <PostList />
        </TabsContent>
        <TabsContent value="prospects">
          <ProspectList/>
        </TabsContent>
        
      </Tabs>
    </div>
  );
}