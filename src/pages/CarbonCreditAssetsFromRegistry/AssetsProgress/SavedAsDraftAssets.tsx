import React from "react";
import { Chip } from "@heroui/react";
import useStore from "@/store/store";
import { useNavigate } from "react-router-dom";

interface ImpactTag {
  tag: string;
}

interface DraftAsset {
  id: string;
  registry: string;
  projectName: string;
  vintageYear: string;
  location: string;
  impactTags: ImpactTag[];
  quantity: number;
  status: string;
  type: string;
  project_developer: string;
  serial_number: string;
  transferable: boolean;
  verification_body: string;
  tokenSymbol: string;
  listingPrice: number;
  listingDuration: string;
  allowFactorization: string;
  fraction: number;
  files: unknown[];
}

interface SavedAsDraftAssetsProps {
  drafts?: DraftAsset[];
}

const SavedAsDraftAssets: React.FC<SavedAsDraftAssetsProps> = ({ drafts = [] }) => {
  const { getDraft } = useStore();
  const navigate = useNavigate();
  if (drafts.length === 0) {
    return (
      <div className="flex flex-col border rounded-md items-center justify-center py-12 text-center">
        <div className="text-4xl mb-4">📄</div>
        <h3 className="text-lg font-semibold">No Drafts Yet</h3>
        <p className="text-sm text-gray-500 max-w-md">
          You don’t have any drafted carbon credit assets at the moment. Start creating a draft to
          begin the tokenization process.
        </p>
      </div>
    );
  }
  const handleDraftClick = (draft: DraftAsset) => {
    getDraft(draft.id, navigate);
  };
  return (
    <div className="grid gap-4">
      {drafts.map((draft, index) => (
        <div
          key={index}
          className="border rounded-lg p-4 text-tbase shadow-sm bg-secondary hover:shadow transition cursor-pointer"
          onClick={() => handleDraftClick(draft)}
        >
          <div className="flex justify-between mb-2">
            <h3 className=" font-semibold">
              {draft.projectName} ({draft.vintageYear})
            </h3>
            <span
              className={`text-sm px-2 py-0.5 rounded ${
                draft.status === "RETIRED"
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {draft.status}
            </span>
          </div>

          <p className="text-sm text-tbase mb-3">
            {draft.location} • {draft.project_developer} • {draft.type}
          </p>

          <div className="grid grid-cols-2 text-tbase gap-y-2 gap-x-4 text-sm">
            <p>
              <strong>Quantity:</strong> {draft.quantity}
            </p>
            <p>
              <strong>Price:</strong> ${draft.listingPrice}
            </p>
            <p>
              <strong>Duration:</strong> {draft.listingDuration} days
            </p>
            <p>
              <strong>Factorization:</strong> {draft.allowFactorization}
            </p>
            <p>
              <strong>Token:</strong> {draft.tokenSymbol}
            </p>
            <p>
              <strong>Fraction:</strong> {draft.fraction}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {draft.impactTags.map((tag: ImpactTag, i: number) => (
              <Chip key={i} size="sm" variant="flat">
                {tag.tag}
              </Chip>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SavedAsDraftAssets;
