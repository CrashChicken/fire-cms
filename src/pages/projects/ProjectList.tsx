import ProjectCard from "../../components/ProjectCard";
import Layout from "../../layouts/Layout";
import { Link, useLoaderData } from "react-router-dom";
import { MdAdd } from "react-icons/Md";
import { Project } from "../../loaders/project";

const ProjectList = () => {
  const projects = useLoaderData() as Project[];

  return (
    <Layout title="Projects">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        <Link to="new">
          <div className="flex h-full flex-col items-center justify-center rounded-3xl border p-6">
            <div className="flex flex-col items-center">
              <MdAdd className="h-10 w-10" />
              <h2 className="mt-2 text-xl">Create new project</h2>
            </div>
          </div>
        </Link>
        {projects.length != 0 &&
          projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
      </div>
    </Layout>
  );
};

export default ProjectList;
