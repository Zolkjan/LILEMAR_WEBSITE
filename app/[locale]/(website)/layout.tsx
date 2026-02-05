import MainNavbar from "@/components/MainNavbar/MainNavbar";

const WebsiteLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <MainNavbar />
      {children}
    </div>
  );
};

export default WebsiteLayout;
