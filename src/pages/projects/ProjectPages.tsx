import { Link, useLoaderData, useParams } from "react-router-dom";
import Layout from "../../layouts/Layout";
import { z } from "zod";
import { useEffect, useState } from "react";
import { collection, query, where } from "firebase/firestore";
import { firestore } from "../../firebase";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { Project } from "../../loaders/project";

type PageDetailsProps = {
  id: string;
  title: string;
};

type CategoryDetailsProps = {
  category: string;
  pages: PageDetailsProps[];
};

const PageDetails = ({ id, title }: PageDetailsProps) => {
  return <Link to={id}>{title}</Link>;
};

const CategoryDetails = ({ category, pages }: CategoryDetailsProps) => {
  return (
    <div className="rounded-3xl border px-8 py-4">
      <h2 className="mb-2 text-xl">{category}</h2>
      {pages.map((page) => (
        <div key={Math.random()}>
          <hr />
          <div className="py-2">
            <PageDetails {...page} />
          </div>
        </div>
      ))}
    </div>
  );
};

const ProjectDetails = () => {
  const categories: CategoryDetailsProps[] = [
    {
      category: "Project details",
      pages: [
        { id: "1", title: "Project details" },
        { id: "2", title: "Project details" },
        { id: "3", title: "Project details" },
      ],
    },
    {
      category: "Project details",
      pages: [
        { id: "1", title: "Project details" },
        { id: "2", title: "Project details" },
        { id: "3", title: "Project details" },
      ],
    },
  ];

  const project = useLoaderData() as Project;

  return (
    <Layout title="Project details">
      <h1 className="text-3xl">Project details {project.name}</h1>
      <div className="flex flex-col gap-8">
        {categories.map((page) => (
          <CategoryDetails key={Math.random()} {...page} />
        ))}
      </div>
    </Layout>
  );
};

export default ProjectDetails;
