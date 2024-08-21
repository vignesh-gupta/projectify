import { OrganizationProfile } from "@clerk/nextjs";

const AccountSettings = () => {
  return (
    <div className="flex justify-center items-center pt-5">
      <OrganizationProfile />
    </div>
  );
};

export default AccountSettings;
