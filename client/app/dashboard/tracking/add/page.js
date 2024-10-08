import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { PostList } from '../components/post-list';
import { ProspectForm } from '../components/prospect-form';


export default function AddProspectPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Monitor</h1>
      <p className="text-sm text-gray-600">
        Create targeted prospect for relationship building.{' '}
        <a href="#" className="text-blue-600 hover:underline">
          See documentation
        </a>
      </p>
      <Tabs defaultValue="prospects">
        <TabsList>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="prospects">Prospects</TabsTrigger>

        </TabsList>
        <TabsContent value="posts">
          <PostList />
        </TabsContent>
        <TabsContent value="prospects">
          <div className="space-y-6">
            
            <ProspectForm />
          </div>
        </TabsContent>
      
      </Tabs>
    </div>
  );
}