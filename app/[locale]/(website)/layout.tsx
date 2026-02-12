"use client";

import MainNavbar from "@/components/navbar/MainNavbar/MainNavbar";

const WebsiteLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="w-full h-full flex items-center flex-col">
      <MainNavbar />
      {children}
    </div>
  );
};

export default WebsiteLayout;
