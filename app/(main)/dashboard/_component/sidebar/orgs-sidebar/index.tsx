import NewButton from "./new-org-button";
import OrganizationList from "./org-list";

const OrganizationsSideBar = () => {
  return (
    <aside className="fixed z-[1] left-0 bg-secondary/50 h-full w-[60px] flex p-3 flex-col gap-y-4 text-white">
      <OrganizationList />
      <NewButton />
    </aside>
  );
};

export default OrganizationsSideBar;
