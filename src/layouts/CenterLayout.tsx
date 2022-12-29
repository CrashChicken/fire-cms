type Props = {
  title: string;
  children?: React.ReactNode;
};

const CenterLayout = ({ title, children }: Props) => (
  <div className="m-auto flex h-screen max-w-3xl flex-col justify-center p-8">
    <header className="mb-8">
      <h1 className="text-4xl font-bold">{title}</h1>
    </header>
    {children}
  </div>
);

export default CenterLayout;
