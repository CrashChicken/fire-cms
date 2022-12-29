import { firestore } from "../../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import ProjectCard from "../../components/ProjectCard";
import Layout from "../../layouts/Layout";
import { useEffect, useState } from "react";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Link } from "react-router-dom";
import { MdAdd } from "react-icons/Md";

type Project = {
  id: string;
  name: string;
  description: string;
  collaborators: string[];
};

const ProjectList = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  const q = query(
    collection(firestore, "projects"),
    where("owner", "==", "m3OcYdEgtRXi7swYVVOpZbCgzU62")
  );
  const [snapshot, loading, error] = useCollectionOnce(q);

  useEffect(() => {
    if (snapshot) {
      const projects: Project[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        const project: Project = {
          id: doc.id,
          name: data.name,
          description: data.description ?? "",
          collaborators: data.collaborators ?? [],
        };
        projects.push(project);
      });
      setProjects(projects);
    }
  }, [snapshot]);

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
      {loading && <LoadingSpinner />}
      {error && (
        <p className="mt-8 rounded-2xl bg-red-100 p-4">
          Error: {error.message}
        </p>
      )}
    </Layout>
  );
};

export default ProjectList;
