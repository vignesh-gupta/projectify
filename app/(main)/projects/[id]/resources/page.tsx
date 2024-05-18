import ResourceList from "@/components/resources/resource-list";

const ResourcesPage = () => {
  return (
    <div className="space-y-5">
      <h3 className="text-xl font-bold md:text-2xl lg:text-3xl">Resources</h3>
      <ResourceList />
      <div className="flex-col flex-1 mx-auto space-y-8 rounded-lg"></div>
    </div>
  );
};

export default ResourcesPage;
