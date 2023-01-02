import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { z } from "zod";
import { firestore } from "../firebase";

export type Project = {
  id: string;
  name: string;
  description: string;
  collaborators: string[];
};

export const getProjects = async (): Promise<Project[]> => {
  const q = query(
    collection(firestore, "projects"),
    where("owner", "==", "m3OcYdEgtRXi7swYVVOpZbCgzU62")
  );

  const snapshot = await getDocs(q);

  const projects: Project[] = [];

  snapshot.forEach((doc) => {
    const data = doc.data();
    projects.push({
      id: doc.id,
      name: data.name,
      description: data.description ?? "",
      collaborators: data.collaborators ?? [],
    });
  });

  return projects;
};

type Page = {
  id: string;
  title: string;
  category: string;
};

export type ProjectPages = {
  id: string;
  name: string;
  description: string;
  collaborators: string[];
  pages: Page[];
};

export const getProjectPages = async (
  projectId: string
): Promise<ProjectPages> => {
  const docRef = doc(firestore, "projects", projectId);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) throw new Error("No such document!");

  let project: Project;
  const data = snapshot.data();

  const q = query(collection(firestore, "projects", projectId, "pages"));
  const snapshotPages = await getDocs(q);

  const pages: Page[] = [];

  snapshotPages.forEach((doc) => {
    const data = doc.data();
  });

  return {
    id: snapshot.id,
    name: data.name,
    description: data.description ?? "",
    collaborators: data.collaborators ?? [],
    pages,
  };
};
