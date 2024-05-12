import AddButton from "@/components/resources/add-button";
import ResourceList from "@/components/resources/resource-list";

const ResourcesPage = () => {
  return (
    <div className="space-y-5">
      <div className="z-10 flex justify-between bg-background/30 ">
        <h3 className="text-xl font-bold md:text-2xl lg:text-3xl">Resources</h3>
        <AddButton />
      </div>
      <ResourceList />
      <div className="flex-col flex-1 mx-auto space-y-8 rounded-lg"></div>
    </div>
  );
};

export default ResourcesPage;
