type Props = {
  title: string;
  children?: React.ReactNode;
};

const Layout = ({ title, children }: Props) => (
  <div className="m-auto max-w-7xl p-8">
    <header className="mb-8">
      <h1 className="text-4xl font-bold">{title}</h1>
    </header>
    {children}
  </div>
);

export default Layout;
