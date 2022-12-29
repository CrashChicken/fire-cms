import { Link } from "react-router-dom";

type Props = {
  id: string;
  name: string;
  description: string;
  collaborators: string[];
};

const MAX_TITLE_LENGTH = 30;
const MAX_DESCRIPTION_LENGTH = 100;
const MAX_COLLABORATORS = 4;

function initialsFromName(name: string) {
  if (name === "") return "X";

  const names = name.split(" ");
  if (names.length === 1) {
    return names[0].charAt(0);
  } else {
    return names[0].charAt(0) + names[1].charAt(0);
  }
}

const ProjectCard = ({ id, name, description, collaborators }: Props) => {
  let trimmedName = name.slice(0, MAX_TITLE_LENGTH);
  let trimmedDescription = description.slice(0, MAX_DESCRIPTION_LENGTH);
  const trimmedCollaborators = collaborators.slice(0, MAX_COLLABORATORS);

  if (name.length > MAX_TITLE_LENGTH) trimmedName = trimmedName.trim() + "...";
  if (description.length > MAX_DESCRIPTION_LENGTH)
    trimmedDescription = trimmedDescription.trim() + "...";

  return (
    <Link to={id}>
      <div className="flex h-full flex-col justify-between rounded-3xl border p-6">
        <h2 className="mb-2 text-xl font-bold">{trimmedName}</h2>
        <p className="mb-6 text-gray-600">{trimmedDescription}</p>
        <div className="flex gap-1">
          {trimmedCollaborators.map((collaborator) => (
            <div
              key={initialsFromName(collaborator) + Math.random()}
              className="flex aspect-square w-9 items-center justify-center rounded-full bg-purple-500"
            >
              <p className="text-sm text-white">
                {initialsFromName(collaborator)}
              </p>
            </div>
          ))}
          {collaborators.length > MAX_COLLABORATORS && (
            <div className="flex aspect-square w-9 items-center justify-center rounded-full bg-gray-500">
              <p className="text-sm text-white">
                +{collaborators.length - MAX_COLLABORATORS}
              </p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
