import { addDoc, collection, FirestoreError } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import { firestore } from "../../firebase";
import CenterLayout from "../../layouts/CenterLayout";

type Project = {
  id: string;
  name: string;
  description: string;
  collaborators: string[];
};

const ProjectList = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const createNewProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.projectName.value.trim();
    const description = form.projectDescription.value.trim();
    const owner = "m3OcYdEgtRXi7swYVVOpZbCgzU62";

    const newProject = {
      name,
      description,
      owner,
    };

    setLoading(true);
    const coll = collection(firestore, "projects");

    addDoc(coll, newProject)
      .then(async (doc) => {
        navigate("/projects/" + doc.id);
      })
      .catch((err: FirestoreError) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <CenterLayout title="Create a new project">
      <form onSubmit={createNewProject}>
        <label htmlFor="projectName" className="mb-4 block text-3xl">
          Project name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter your project name here"
          autoComplete="off"
          name="projectName"
          id="projectName"
          className="mb-10 block w-full border-b border-gray-500 text-2xl"
          minLength={3}
          maxLength={50}
          required
        />

        <label htmlFor="projectName" className="mb-4 block text-3xl">
          Project description
        </label>
        <textarea
          placeholder="Enter your project description here"
          autoComplete="off"
          name="projectDescription"
          id="projectDescription"
          className="mb-10 block w-full resize-none border-b border-gray-500 text-2xl"
          rows={4}
          maxLength={200}
        />

        <button
          type="submit"
          className="border px-8 py-4 text-2xl"
          disabled={loading}
        >
          Create
        </button>
      </form>
      {loading && <LoadingSpinner />}
      {error && <p className="mt-10 rounded-2xl bg-red-100 p-4">{error}</p>}
    </CenterLayout>
  );
};

export default ProjectList;
