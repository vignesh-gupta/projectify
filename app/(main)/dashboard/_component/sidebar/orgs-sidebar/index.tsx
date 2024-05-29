import NewButton from "./new-org-button";
import OrganizationList from "./org-list";

const OrganizationsSideBar = () => {
  return (
    <aside className="fixed z-[1] left-0 bg-gray-800/70 h-full w-12 sm:w-16 md:flex p-2 sm:p-3 flex-col gap-y-4 text-white hidden">
      <OrganizationList />
      <NewButton />
    </aside>
  );
};

export default OrganizationsSideBar;
